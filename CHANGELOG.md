# Change Log

## Version 4.0.0 _(2017-12-29)_

* Renamed the project to `meetup-raffle-stdlib` for logistical reasons (but left
  it as `meetup-raffle` on [StdLib][stdlib])

##### Breaking Changes:

* Changed the `winners` array in the response from an array of strings (names)
  to an array of objects which includes the full attendee information from
  upstream (`name`, `photoURL`, and `profileURL` strings)

## Version 3.0.4 _(2017-12-26)_

* Bumped supported node version from 7 to 8
* Updated documentation URL to reflect StdLib changes
* Improved tests with Jest 22

## Version 3.0.3 _(2017-11-08)_

* Internal maintenance

## Version 3.0.2 _(2017-11-07)_

* Internal maintenance

## Version 3.0.1 _(2017-11-07)_

* Internal maintenance

## Version 3.0.0 _(2017-08-06)_

* Updated HTTP endpoint links to use new lib.id domain
* Added new `count` option to draw multiple winners at once, per
  `meetup-randomizer@3.0.0`

##### Breaking Changes:

* Modified the schema of the returned object to contain a `winners` array of
  strings representing the names of the winners in order to support the new
  `count` option

## Version 2.0.1 _(2017-05-25)_

* Updated `meetup-randomizer` for better error handling

## Version 2.0.0 _(2017-05-21)_

* Updated to be [FaaSlang][faaslang] compliant
* Improved error handling for unexpected data

##### Breaking Changes:

* Removed the `winner` function, moving functionality to the default function
  (which most of the documentation has always referenced anyway)

## Version 1.0.3 _(2017-02-14)_

* Updated usage documentation to show `winner` is the default function
* Mocked all unexpected API requests in test to prevent actual network traffic
* Restructured `winner` test file to match the corresponding source

## Version 1.0.2 _(2017-02-14)_

* Fixed minor typos in documentation

## Version 1.0.1 _(2017-02-13)_

* Refactored for readability and testability
* Added tests

## Version 1.0.0 _(2017-02-11)_

* Initial release

[stdlib]: https://stdlib.com/@wKovacs64/lib/meetup-raffle
[faaslang]: https://github.com/faaslang/faaslang
