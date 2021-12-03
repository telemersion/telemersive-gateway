#!/bin/zsh
echo "Linking Development Package to this app"
cd $0:a:h
npm unlink --no-save telemersive-bus
rm package.json
mv package.json.bkup package.json
echo "...complete"
