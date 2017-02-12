# Trafiksäker app

## Installation
Requires npm (node.js) and an up-to-date version of ruby. 

1. `npm install -g cordova ionic`
1. `cordova requirements`
	1. Most likely needed:
		1. `brew cask install java`
		1. `brew install android-sdk`
		1. `brew install cocoapods`
1. Add platforms: 
	1. `ionic add platform ios`
	1. `ionic add platform browser`

## Run in browser

Will not work with sqllite.

`ionic serve`

## Build or emulate

Run with cordova plugins: `ionic run ios`

Emulate: `cordova emulate ios`

Build: `cordova build ios`

`
