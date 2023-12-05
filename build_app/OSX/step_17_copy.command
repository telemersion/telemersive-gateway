#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "$BASEDIR"

SHELL_VAR=`osascript -e 'set T to text returned of (display dialog "Set Package Extention:" buttons {"Cancel", "OK"} default button "OK" default answer "")'`

# path to signed app
zippath="../distribution/OSX/packed/TelemersiveGateway_signed.pkg"

echo "Copy Package: ${zippath}"

cp "$zippath" "TelemersiveGateway_$SHELL_VAR.pkg"
