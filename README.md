# LD34

[![Build Status](https://travis-ci.org/DanjoeGames/ld34.svg)](https://travis-ci.org/DanjoeGames/ld34)

## Structure
* Everything in the `static` folder will be copied into `build`.
* Code in `src/` will be compiled into `build/bundle.js`.

This means that the `npm run clean` task can remove the build folder with no risk. We can also deploy that folder directly for publishing.

## Development
Running `npm start` kicks off an npm task which does two main things.

### Server (BrowserSync)
Starts a static file server using browser sync. When a file in the `build/` dir changes, the page will reload. This script also tries to open the page in your browser.

### Watchers
* Starts `watchify` which recompiles scripts when they change.
* Starts `watch-cli` for copying `static/` to `build/`

