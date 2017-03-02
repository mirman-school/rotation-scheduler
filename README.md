# Rotation Scheduler
This tool is designed for schools which:

* Use G Suite for calendaring
* Have a non-weekly schedule (e.g. a 6 or 7-day timetable)

## Installation
### Docker
A pre-made Docker image, ready for deployment (after customizing configuration) lives [here](https://hub.docker.com/r/mirmanmtaggart/rotation-scheduler/).

Then, `sudo docker run -i -t -p <port>:<port> --name <name> rotation-scheduler`

### Not-Docker
1. Clone this repo onto a server that has [Node](https://nodejs.org) installed.
2. Fire up the app with `node ./` in the directory.
3. Optionally route the port through a webserver, or run it naked (**NOT** Recommended).

## Configuration
In `src/config.js`, there are several options that need to be configured for the app to run. Remember that this uses Google's APIs, so the Calendar and Google+ APIs will have to be enabled in the [Developer Console](https://console.developers.google.com).

### `site`
* `name`: The name you want for your app
* `schoolName`: The name of your school
* `teacherDomain`: Domain for teacher email addresses.
* `studentDomain`: Domain for student email addresses. (Can be the same as `teacherDomain`)
* `cycleDays`: An array of strings used to define labels for cycle days. These will have to match events on `rotationCalendar`.
* `timeZone`: One of [these](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

### `googleApi`
* `clientId`: Your Google API App Client ID
* `clientSecret`: API App Secret
* `scopes`: Should stay `"calendar"` unless you want to extend the functionality
* `rotationCalendar`: The ID of the Google Calendar that contains the cycle days.

A quick note about `rotationCalendar`. **NOTHING BUT CYCLE DAYS MATCHING `cycleDays` SHOULD EXIST ON THIS CALENDAR**.
