#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "$BASEDIR"

# path to your app
keychain="Telemersive-Notarization"
zippath="../distribution/OSX/packed/TelemersiveGateway_signed.pkg"

echo "Notarizing Package: ${zippath}"

xcrun notarytool submit "${zippath}" --keychain-profile "${keychain}" --wait
