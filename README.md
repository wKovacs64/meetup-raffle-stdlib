# meetup-raffle

*A [StdLib][stdlib] microservice for selecting a raffle winner at a
[Meetup][meetup] event.*

Functions:

* [winner](#winner)

## winner

##### Description

Selects a random attendee from those who RSVP'd "yes" for the event. Event
hosts are excluded.

##### Parameters

* `meetup`: the name of the Meetup group (***required***)
* `event`: the ID of a particular event (*optional*, default: soonest
  upcoming/in-progress event)
* `meetup-api-key`: your private Meetup API key (*optional*, default: none)

##### Data Returned

Returns a JSON object containing a `winner` key, or a plain text error message
in the event of a failure.

```json
{
    "winner": "Tiny Rick"
}
```

##### Usage

###### Command-line:

Select a raffle winner from the soonest upcoming or currently in-progress event:

```bash
$ lib wKovacs64.meetup-raffle.winner --meetup frontend-devs
```

Optionally specify a particular event by ID:

```bash
$ lib wKovacs64.meetup-raffle.winner --meetup frontend-devs --event 236136797
```

Or, shorthand for the same request:

```bash
$ lib wKovacs64.meetup-raffle.winner frontend-devs 236136797
```

To authenticate requests (which retrieves full names rather than abbreviated
last names), provide your own private Meetup API key:

```bash
$ lib wKovacs64.meetup-raffle.winner frontend-devs --meetup-api-key XXXXXXXXXXX
```

###### HTTP:

```http
https://wkovacs64.stdlib.com/meetup-raffle/winner?meetup=frontend-devs
```

Or, perform an authenticated request:

```http
https://wkovacs64.stdlib.com/meetup-raffle/winner?meetup=frontend-devs&meetup-api-key=XXXXXXXXXXX
```

###### Web and Node.js:

```js
const lib = require('lib');
const { winner } = lib.wKovacs64['meetup-raffle'];

winner({ meetup: 'frontend-devs' }, (err, data) => {
  // handle error or data
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
[meetup-randomizer]: https://github.com/durancristhian/meetup-randomizer
