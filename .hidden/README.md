# Welcome To Where the **Magic** Happens

This directory contains all the files needed to make everything happen behind the scenes including:
- Module data
- UI data
- Front and back end javascript
- Helping scripts

## Commands
Training mods has a command line utility to help with managing commands which can be run with  `npm run tm -- [args]`. Here is an overview of the options.

- `npm run tm -- --new [folder name]` create a new module which will be available in */.hidden/modules/[folder name]*. After creating and/or editing the module's index.html you can run 'Wipe' from the browser UI to see it.
- `npm run tm -- --delete [module number]` delete a module, this is by number
- `npm run tm -- --mods` print out all modules
- `npm run tm -- --reset` resets the config file which is useful for testing
- `npm run tm -- --help` gets the full info about the tm utility.

Yarn is also supported, just run `yarn tm [args]` to access the utility.

###Additional commands:
- `npm run publish [message]` will reset the project and commit for you with the message supplied. Then just run `git push`

## Important

The server (`npm start`) **needs** to be shut off when making a new module or else the config file will get overwritten without it. 

## Layout

The main runner is *webpack.config.js* in the root folder, it runs the dev server.

- */config.js* basically the database
- */backjs* contains *interact.js* which runs custom server code for webpack, and *helper.js* which runs the npm commands
- */frontjs* which only has *front.js*, that is used to inject the UI into the *index.html* being server
- */html* which has *home.html*, the homepage which is loaded by default, and *ui.html* which is injected into the module
- */public* has files dumped into it when testing

### */modules*

Contains *index.html*, *save.html*, and *template.json* to be used as templates for a new module

Also has all the individual modules in their respective folders.

## Overview

On the first level webpack hot reloads index.html. Webpack also injects a script into the html, which allows for the UI.

That script gets custom urls on the server which triggers back-end events. Those events swap out various files to make the module management streamlined.

There is also a homepage which lists all the modules, which is done through [dot.js](http://olado.github.io/doT/index.html).
When a module is clicked on a POST (not a GET like all other requests) sends the number of the module back to the server so it know which to load.
It also goes to the base url, */* when something is clicked.

This project comes with glitch support and uses *hyper-start.js* and *glitch-sync.js* to do so
