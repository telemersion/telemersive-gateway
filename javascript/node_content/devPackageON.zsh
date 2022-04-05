#!/bin/zsh
echo "Linking Development Package to this app"
cd $0:a:h
cp package.json package.json.bkup
npm link --no-save telemersive-bus
echo "...complete"
