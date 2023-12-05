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
identity="Developer ID Installer: Zurcher Hochschule der Kunste (D95XR8PG48)"

# path to your app
path="../distribution/OSX/packed"

# your app
apppath="${path}/TelemersiveGateway.pkg"

# your signed app
signedapp="${path}/TelemersiveGateway_signed.pkg"


# Sign the actual package
echo "Codesigning package: ${apppath}"
productsign --sign "$identity" "${apppath}" "${signedapp}"

# remove the unsigned package
echo "remove package: ${apppath}"
rm "${apppath}"


