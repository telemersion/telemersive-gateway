#!/bin/bash
#
# This is a helper script to codesign the TelemersiveGateway.app
# You may tweak some parameters before you run the script.
# The script doesn't take any command-line arguments
# and expects all parameters to be specified in file.
#
# How to check the signature of your app?
# Run:
#    codesign --verify --verbose /Path/to/your/TelemersiveGateway.app
#
# How to check the entitlements granted to your app?
# Run:
#    codesign --display --entitlements ":-" /Path/to/your/TelemersiveGateway.app
#
#
# Written by Roman Haefeli, 2023

# '-' means ad-hoc signing without Developer Certificate
# Specifiy the name of your certificate if you have one
identity="Mac Developer: Martin Fröhlich (9XFUJ78J3P)"

# path to your app
apppath="/Volumes/Ddrive/04_projects/Telematics/01_telemersion/telemersive-gateway_app/Telemersivegateway_803/TelemersiveGateway.app"

entitlements_file="${0}.entitlements"

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
    "iasnet"
    "jit.gl.syphonclient"
    "syscmd"
    "zero.browse"
)

apps=(
    "TelemersiveGateway Helper (GPU)"
    "TelemersiveGateway Helper (Plugin)"
    "TelemersiveGateway Helper (Renderer)"
    "TelemersiveGateway Helper"
)

# Grant your app some capabilities like camera or microphone access
entitlements='
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>com.apple.security.device.microphone</key>
        <true/>
        <key>com.apple.security.device.audio-input</key>
        <true/>
        <key>com.apple.security.device.camera</key>
        <true/>
</dict>
</plist>
'

# Write entitlements file
echo "$entitlements" > "${entitlements_file}"

# Sign frameworks
for fw in "${frameworks[@]}"
do
    echo "Codesigning Framework: ${fw}"
    codesign --force --sign "$identity" --entitlements "${entitlements_file}" "${apppath}/Contents/Frameworks/${fw}.framework"
done

for ex in "${externals[@]}"
do
    echo "Codesigning Externals: ${ex}"
    codesign --force --sign "$identity" --entitlements "${entitlements_file}" "${apppath}/Contents/Resources/C74/externals/${ex}.mxo"
done

# Sign dynamic libraries
for lib in "${libs[@]}"
do
    echo "Codesigning Library: ${lib}"
    codesign --force --sign "$identity" --entitlements "${entitlements_file}" "${apppath}/Contents/Frameworks/${lib}.dylib"
done

# Sign included apps
for app in "${apps[@]}"
do
    echo "Codesigning Library: ${app}"
    codesign --force --sign "$identity" --entitlements "${entitlements_file}" "${apppath}/Contents/Frameworks/${app}.app"
done

# Sign the actual app
echo "Now codesigning app: ${apppath}"
codesign --force --sign "$identity" --entitlements "${entitlements_file}" "${apppath}"

# Clean up
rm "${entitlements_file}"
