run-your-command-via-web-ui
===========================================

[![Dependency Status](https://david-dm.org/shrkw/run-your-command-via-web-ui.png)]

**Important notice**

*This application expects to work for internal network and faithful guys only.*
*You must not provide this for internet and unnkown guys. If you don't accept this alert, your server may make trouble to not only your server but also other network.*

This is simple one page web application for calling any commands from your browser.

![screen image](https://r4jsig.blu.livefilestore.com/y2mLlEDXtbb65QNrX9JHZoNDIM2qiUCdTRNUttdDd-sjKf0nYceLyiA2UiTzrBycmK1iLQZjOMC8ObWcjmEehMCTASThI9e4Ln9zKh8NKIooBlo-mdKFqZ668V00hNRbz4F/image.png?psid=1 "screen image")

# Install

## Setup your environment

Install nodebrew and Node.js

    curl -L git.io/nodebrew | perl - setup
    export PATH=$HOME/.nodebrew/current/bin:$PATH
    nodebrew install stable
    nodebrew use stable

Intall bower::

    npm install -g bower

## Resolve project dependencies

    npm install
    bower install

# Run

    node app.js
