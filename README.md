# meetup-raffle-stdlib

_An [StdLib][stdlib] microservice for selecting a raffle winner at a
[Meetup][meetup] event._

[![Build Status][travis-image]][travis-url]
[![Code Coverage][coverage-image]][coverage-url]

### The default (and only) function:

##### Description

Selects some random attendees from those who RSVP'd "yes" for the event. Event
hosts are excluded.

##### Parameters

* `meetup`: the name of the Meetup group _(**required**)_
* `specificEventId`: the ID of a particular event _(optional, default: soonest
  upcoming/in-progress event)_
* `meetupApiKey`: your private Meetup API key _(optional, default: none)_
* `count`: the number of winners to draw _(optional, default: 1)_

##### Data Returned

Returns a JSON object containing a `winners` array of attendee objects (the
raffle winners), or an StdLib error message in the event of a failure. Each
attendee object includes the `name`, `photoURL`, and `profileURL` properties as
strings (forwarded on from the [`meetup-randomizer`][meetup-randomizer]
library).

```json
{
  "winners": [
    {
      "name": "Tiny Rick",
      "photoURL": "https://i.imgur.com/rgDv1wB.jpg",
      "profileURL": "http://rickandmorty.wikia.com/wiki/Tiny_Rick"
    }
  ]
}
```

##### Usage

###### Command-line:

Select a raffle winner from the soonest upcoming or currently in-progress event:

```bash
$ lib wKovacs64.meetup-raffle --meetup your-group-name
```

Optionally specify a particular event by ID:

```bash
$ lib wKovacs64.meetup-raffle --meetup your-group-name --event 123456789
```

Or, shorthand for the same request:

```bash
$ lib wKovacs64.meetup-raffle your-group-name 123456789
```

Draw multiple winners at once:

```bash
$ lib wKovacs64.meetup-raffle --meetup your-group-name --count 3
```

To authenticate requests (which retrieves full names rather than abbreviated
last names), provide your own private Meetup API key:

```bash
$ lib wKovacs64.meetup-raffle your-group-name --meetupApiKey XXXXXXXXXXX
```

###### HTTP:

```http
https://wkovacs64.lib.id/meetup-raffle/?meetup=your-group-name
```

Or, perform an authenticated request:

```http
https://wkovacs64.lib.id/meetup-raffle/?meetup=your-group-name&meetupApiKey=XXXXXXXXXXX
```

###### Web and Node.js:

```js
const lib = require('lib');

lib.wKovacs64['meetup-raffle']({ meetup: 'your-group-name' })
  .then(data => {
    // handle data
  })
  .catch(err => {
    // handle error
  });
```

## Limitations

* Event hosts are excluded from winning.

  **Reason:** This choice is made for us in the
  [`meetup-randomizer`][meetup-randomizer] dependency.

* Successful results are only possible for completely public events.

  **Reason:** This is a Meetup API restriction.

[meetup]: https://www.meetup.com
[stdlib]: https://stdlib.com
[travis-image]: https://img.shields.io/travis/wKovacs64/meetup-raffle-stdlib.svg?style=flat-square
[travis-url]: https://travis-ci.org/wKovacs64/meetup-raffle-stdlib
[coverage-image]: https://img.shields.io/coveralls/wKovacs64/meetup-raffle-stdlib.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/wKovacs64/meetup-raffle-stdlib
[meetup-randomizer]: https://github.com/durancristhian/meetup-randomizer
