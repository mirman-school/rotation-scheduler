import config from "../config";
import moment from "moment";

export function generateDate(data,current,key) {
  const timeKey = key + "Time";
  let hours = 0;
  let minutes = 0;
  if (data[timeKey] !== "") {
    // Pulling from a "HH:MM" string
    hours = parseInt(data[timeKey].substr(0,2));
    minutes = parseInt(data[timeKey].substr(3,5));
  }
  const tz = config().site.timeZone;
  const m = moment(current, tz);
  m.hour(hours);
  m.minute(minutes);
  return m;
}

export function generateDateResource(data,current,key) {
  const tz = config().site.tz;
  if (data.allDay) {
    return {
      date: current
    }
  } else {
    const d = generateDate(data,current.format("YYYY-MM-DD"),key);
    return {
      dateTime: d.toISOString(),
      timeZone: tz
    }
  }
}
