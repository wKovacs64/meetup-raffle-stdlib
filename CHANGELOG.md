# Change Log

## Version 3.0.1 *(2017-11-07)*

* Internal maintenance

## Version 3.0.0 *(2017-08-06)*

* Updated HTTP endpoint links to use new lib.id domain
* Added new `count` option to draw multiple winners at once, per
  `meetup-randomizer@3.0.0`

##### Breaking Changes:

* Modified the schema of the returned object to contain a `winners` array of
  strings representing the names of the winners in order to support the new
  `count` option

## Version 2.0.1 *(2017-05-25)*

* Updated `meetup-randomizer` for better error handling

## Version 2.0.0 *(2017-05-21)*

* Updated to be [FaaSlang](https://github.com/faaslang/faaslang) compliant
* Improved error handling for unexpected data

##### Breaking Changes:

* Removed the `winner` function, moving functionality to the default function
  (which most of the documentation has always referenced anyway)

## Version 1.0.3 *(2017-02-14)*

* Updated usage documentation to show `winner` is the default function
* Mocked all unexpected API requests in test to prevent actual network traffic
* Restructured `winner` test file to match the corresponding source

## Version 1.0.2 *(2017-02-14)*

* Fixed minor typos in documentation

## Version 1.0.1 *(2017-02-13)*

* Refactored for readability and testability
* Added tests

## Version 1.0.0 *(2017-02-11)*

* Initial release
