# Release history

## v0.2.3
* Fix an issue with renaming files which could make Component trying to read a non-existing file.
Showing the following error: `ENOENT, open '/folder/component-name/styles.css'`

## v0.2.1
* Pinpointing LESS version to 1.7.4 due to some problem with 1.7.5 and NPM

## v0.2.0
* Updated dependencies
    - *async* to ~0.6.2
    - *less* to ~1.7.0

## v0.1.5
* Adding filename for better error reporting

## v0.1.4
* Stylesheets with the same name, but in different dirs get clobbered

## v0.1.3
* Allowing @import of paths relative to each stylesheet

## v0.1.2
* Make parser context new for each less file

## v0.1.1
First version
