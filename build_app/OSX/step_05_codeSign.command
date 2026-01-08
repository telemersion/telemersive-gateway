#!/usr/bin/env bash
#
# Enhanced codesigning script for TelemersiveGateway.app
# with comprehensive signing and verification
#
# Written by Roman Haefeli, 2023
# Adapted by Martin Froehlich, 2023
# Enhanced 2025

set -e  # Exit on any error

BASEDIR=$(dirname "$0")
cd "$BASEDIR"

# Configuration
identity="Developer ID Application: Zurcher Hochschule der Kunste (D95XR8PG48)"
apppath="../distribution/OSX/TelemersiveGateway/TelemersiveGateway.app"
entitlements_file="TelemersiveGateway.entitlement"

# Color output for better readability
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Arrays of known components
frameworks=(
    "Chromium Embedded Framework"
    "JitterAPI"
    "JitterAPIImpl"
    "MaxAPI"
    "MaxAPIImpl"
    "MaxAudioAPI"
    "MaxAudioAPIImpl"
    "MaxLua"
    "MaxLuaImpl"
)

libs=(
    "libmozjs185"
    "libmozjs185_impl"
)

externals=(
    "jit.gl.syphonclient"
    "zero.browse"
    "shell"
    "iasnet"
    "syscmd"
)

apps=(
    "TelemersiveGateway Helper (GPU)"
    "TelemersiveGateway Helper (Plugin)"
    "TelemersiveGateway Helper (Renderer)"
    "TelemersiveGateway Helper"
)

# Function to sign with error checking
sign_component() {
    local component="$1"
    local description="$2"
    
    if [ ! -e "$component" ]; then
        echo -e "${YELLOW}⚠ Skipping (not found): ${description}${NC}"
        return 0
    fi
    
    echo -e "${GREEN}→ Signing: ${description}${NC}"
    if codesign --force --sign "$identity" --timestamp -o runtime --entitlements "${entitlements_file}" "$component" 2>&1; then
        echo -e "${GREEN}  ✓ Success${NC}"
        return 0
    else
        echo -e "${RED}  ✗ Failed to sign: ${component}${NC}"
        return 1
    fi
}

# Function to verify signature
verify_signature() {
    local component="$1"
    local description="$2"
    
    echo -e "${YELLOW}Verifying: ${description}${NC}"
    if codesign --verify --deep --strict --verbose=2 "$component" 2>&1; then
        echo -e "${GREEN}✓ Verification successful${NC}"
        return 0
    else
        echo -e "${RED}✗ Verification failed${NC}"
        return 1
    fi
}

echo "=========================================="
echo "TelemersiveGateway Codesigning Script"
echo "=========================================="
echo "Identity: $identity"
echo "App path: $apppath"
echo "Entitlements: $entitlements_file"
echo "=========================================="
echo ""

# Verify prerequisites
if [ ! -d "$apppath" ]; then
    echo -e "${RED}Error: App not found at ${apppath}${NC}"
    exit 1
fi

if [ ! -f "$entitlements_file" ]; then
    echo -e "${RED}Error: Entitlements file not found: ${entitlements_file}${NC}"
    exit 1
fi

# Check if identity exists
if ! security find-identity -v -p codesigning | grep -q "$identity"; then
    echo -e "${RED}Error: Signing identity not found in keychain${NC}"
    echo "Available identities:"
    security find-identity -v -p codesigning
    exit 1
fi

echo -e "${GREEN}Step 1: Signing Frameworks${NC}"
echo "=========================================="
for fw in "${frameworks[@]}"
do
    fw_path="${apppath}/Contents/Frameworks/${fw}.framework"
    
    # Sign any nested dylibs first
    if [ -d "${fw_path}/Versions/A" ]; then
        find "${fw_path}/Versions/A" -type f -name "*.dylib" 2>/dev/null | while read dylib; do
            sign_component "$dylib" "Framework dylib: $(basename $dylib)"
        done
    fi
    
    # Sign the framework
    sign_component "$fw_path" "Framework: ${fw}"
done
echo ""

echo -e "${GREEN}Step 2: Signing Externals${NC}"
echo "=========================================="
for ex in "${externals[@]}"
do
    ex_path="${apppath}/Contents/Resources/C74/externals/${ex}.mxo"
    
    # Sign any nested executables or dylibs first
    if [ -d "$ex_path" ]; then
        find "$ex_path" -type f \( -name "*.dylib" -o -perm +111 \) 2>/dev/null | while read lib; do
            sign_component "$lib" "External component: $(basename $lib)"
        done
    fi
    
    sign_component "$ex_path" "External: ${ex}"
done
echo ""

echo -e "${GREEN}Step 3: Signing Dynamic Libraries${NC}"
echo "=========================================="
for lib in "${libs[@]}"
do
    sign_component "${apppath}/Contents/Frameworks/${lib}.dylib" "Library: ${lib}"
done

# Sign ALL other dylibs not in the list
echo -e "${YELLOW}Signing any additional dynamic libraries...${NC}"
find "${apppath}" -type f -name "*.dylib" 2>/dev/null | while read dylib; do
    # Check if already signed
    if codesign --verify "$dylib" 2>/dev/null; then
        echo -e "${GREEN}  ✓ Already signed: $(basename $dylib)${NC}"
    else
        sign_component "$dylib" "Additional dylib: $(basename $dylib)"
    fi
done
echo ""

echo -e "${GREEN}Step 4: Signing Helper Applications${NC}"
echo "=========================================="
for app in "${apps[@]}"
do
    app_path="${apppath}/Contents/Frameworks/${app}.app"
    
    if [ ! -d "$app_path" ]; then
        echo -e "${YELLOW}⚠ Helper app not found: ${app}${NC}"
        continue
    fi
    
    # Sign executables inside helper app first
    if [ -d "${app_path}/Contents/MacOS" ]; then
        find "${app_path}/Contents/MacOS" -type f -perm +111 2>/dev/null | while read exec; do
            sign_component "$exec" "Helper executable: $(basename $exec)"
        done
    fi
    
    # Sign any frameworks in the helper app
    if [ -d "${app_path}/Contents/Frameworks" ]; then
        find "${app_path}/Contents/Frameworks" -type d -name "*.framework" -depth 1 2>/dev/null | while read fw; do
            sign_component "$fw" "Helper framework: $(basename $fw)"
        done
    fi
    
    # Sign the helper app bundle itself
    sign_component "$app_path" "Helper App: ${app}"
done
echo ""

echo -e "${GREEN}Step 5: Signing Additional Executables${NC}"
echo "=========================================="
# Find and sign any remaining executables in MacOS directory
if [ -d "${apppath}/Contents/MacOS" ]; then
    find "${apppath}/Contents/MacOS" -type f -perm +111 2>/dev/null | while read exec; do
        # Skip if it's the main executable (we'll sign it last)
        if [ "$(basename $exec)" != "TelemersiveGateway" ]; then
            if codesign --verify "$exec" 2>/dev/null; then
                echo -e "${GREEN}  ✓ Already signed: $(basename $exec)${NC}"
            else
                sign_component "$exec" "Executable: $(basename $exec)"
            fi
        fi
    done
fi
echo ""

echo -e "${GREEN}Step 6: Signing Main Application${NC}"
echo "=========================================="
sign_component "${apppath}" "Main Application: TelemersiveGateway.app"
echo ""

echo -e "${GREEN}Step 7: Verification${NC}"
echo "=========================================="

# Verify the main executable specifically
echo "Verifying main executable signature..."
if codesign --verify --verbose=4 "${apppath}/Contents/MacOS/TelemersiveGateway" 2>&1; then
    echo -e "${GREEN}✓ Main executable signature valid${NC}"
else
    echo -e "${RED}✗ Main executable signature invalid${NC}"
    exit 1
fi

# Verify the entire app bundle
verify_signature "${apppath}" "Complete Application Bundle"

# Display signing information
echo ""
echo -e "${GREEN}Step 8: Signature Information${NC}"
echo "=========================================="
codesign --display --verbose=4 "${apppath}"
echo ""
echo "Entitlements granted:"
codesign --display --entitlements ":-" "${apppath}"

echo ""
echo "=========================================="
echo -e "${GREEN}✓ Codesigning completed successfully!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Create your installer package"
echo "2. Sign the package:"
echo "   productsign --sign \"Developer ID Installer: Your Name\" unsigned.pkg signed.pkg"
echo "3. Submit for notarization:"
echo "   xcrun notarytool submit signed.pkg --keychain-profile \"notarization-profile\" --wait"
echo "4. Staple the notarization ticket:"
echo "   xcrun stapler staple signed.pkg"

exit 0