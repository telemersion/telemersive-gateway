#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "$BASEDIR"

# path to your app
apppath="../distribution/OSX/TelemersiveGateway/TelemersiveGateway.app"
zippath="../distribution/OSX/TelemersiveGateway_Notarize.zip"

echo "Zipping APP: ${apppath}"
/usr/bin/ditto -c -k --keepParent "${apppath}" "${zippath}"
