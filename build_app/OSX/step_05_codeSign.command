#!/usr/bin/env bash
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
# adapted by Martin Froehlich, 2023

BASEDIR=$(dirname "$0")
cd "$BASEDIR"

# '-' means ad-hoc signing without Developer Certificate
# Specifiy the name of your certificate if you have one
identity="Developer ID Application: Zurcher Hochschule der Kunste (D95XR8PG48)"

# path to your app
apppath="../distribution/OSX/TelemersiveGateway/TelemersiveGateway.app"

entitlements_file="TelemersiveGateway.entitlement"

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

# Sign frameworks
for fw in "${frameworks[@]}"
do
    echo "Codesigning Framework: ${fw}"
    codesign --force --sign "$identity" --timestamp -o runtime --entitlements "${entitlements_file}" "${apppath}/Contents/Frameworks/${fw}.framework"
done

for ex in "${externals[@]}"
do
    echo "Codesigning Externals: ${ex}"
    codesign --force --sign "$identity" --timestamp -o runtime --entitlements "${entitlements_file}" "${apppath}/Contents/Resources/C74/externals/${ex}.mxo"
done

# Sign dynamic libraries
for lib in "${libs[@]}"
do
    echo "Codesigning Library: ${lib}"
    codesign --force --sign "$identity" --timestamp -o runtime --entitlements "${entitlements_file}" "${apppath}/Contents/Frameworks/${lib}.dylib"
done

# Sign included apps
for app in "${apps[@]}"
do
    echo "Codesigning Library: ${app}"
    codesign --force --sign "$identity" --timestamp -o runtime --entitlements "${entitlements_file}" "${apppath}/Contents/Frameworks/${app}.app"
done

# Sign the actual app
echo "Now codesigning app: ${apppath}"
codesign --force --sign "$identity" --timestamp -o runtime --entitlements "${entitlements_file}" "${apppath}"
