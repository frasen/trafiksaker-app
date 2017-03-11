# Trafiksäker-appen

## Installation
Requires npm (node.js) and an up-to-date version of ruby. 

1. `npm install -g cordova ionic`
1. `npm install`
1. Add platform	`ionic platform add ios`
1. Maybe needed: `cordova requirements`
1. Most likely needed:
	1. `npm install -g ios-deploy`
	1. `brew cask install java`
	1. `brew install android-sdk`
	1. `brew install cocoapods`

## Run


Emulate
`ionic emulate ios --livereload --consolelogs --serverlogs`

Run in browser
`ionic serve`

## Build

Build: `ionic build ios`

