#!/bin/bash

if ! hash electron-packager 2>/dev/null; then
  RED='\033[0;31m'
  NC='\033[0m'
  echo "${RED}Error${NC}: you need to npm install electron-packager. Aborting."
  exit 1
fi

if [ "$#" -ne 2 ]; then
  echo -e "Usage: ./build.sh <platform> <arch>"
  echo -e "	platform:	darwin, linux, win32"
  echo -e "	arch:		ia32, x64"
  exit 1
fi

PLATFORM=$1
ARCH=$2

echo "Start packaging for $PLATFORM $ARCH."

if [ $PLATFORM = "linux" ]; then
    APP_NAME="electronic-feishu"
else
    APP_NAME="Electronic FeiShu"
fi

ignore_list="dist|scripts|\.idea|.*\.md|.*\.yml|node_modules/nodejieba"

electron-packager . "${APP_NAME}" --platform=$PLATFORM --arch=$ARCH --electronVersion=7.2.1 --app-version=1.0.0 --asar --icon=assets/icon.ico --overwrite --out=./dist --ignore=${ignore_list}

if [ $PLATFORM = "linux" ]; then
    cp assets/icon.ico dist/electronic-feishu-linux-x64/
fi

if [ $? -eq 0 ]; then
  echo -e "$(tput setaf 2)Packaging for $PLATFORM $ARCH succeeded.$(tput sgr0)\n"
fi

#if [ $PLATFORM = "darwin" ]; then
#    ditto -rsrcFork ./dist/Electronic\ FeiShu-darwin-x64/Electronic\ FeiShu.app /Applications/Electronic\ FeiShu.app
#    echo "$(tput setaf 3)App copied to /Applications. You can open Electronic WeChat there or from Spotlight.$(tput sgr0)"
#fi


