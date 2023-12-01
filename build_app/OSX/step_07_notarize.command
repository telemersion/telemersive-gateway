#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "$BASEDIR"

# path to your app
keychain="Telemersive-Notarization"
zippath="../distribution/OSX/TelemersiveGateway_Notarize.zip"

echo "Notarizing APP: ${zippath}"

xcrun notarytool submit "${zippath}" --keychain-profile "${keychain}" --wait
