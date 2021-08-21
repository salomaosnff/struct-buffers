import { inspect, InspectOptionsStylized } from "util";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const normalize = (n: number, f: boolean) => (f ? n : Math.floor(n));

export class Time {
  public __ms: number;

  constructor({ hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {}) {
    this.__ms =
      hours * HOUR + minutes * MINUTE + seconds * SECOND + milliseconds;
  }

  static parse(inMilliseconds: number) {
    const time = new Time();

    time.__ms = inMilliseconds;

    return time;
  }

  inMilliseconds() {
    return this.__ms;
  }

  inHours(fractional = false) {
    return normalize(this.inMilliseconds() / HOUR, fractional);
  }

  inMinutes(fractional = false) {
    return normalize(this.inMilliseconds() / MINUTE, fractional);
  }

  inSeconds(fractional = false) {
    return normalize(this.inMilliseconds() / SECOND, fractional);
  }

  inDays(fractional = false) {
    return normalize(this.inMilliseconds() / DAY, fractional);
  }

  milliseconds(fractional = false) {
    return normalize(this.inMilliseconds() % 1000, fractional);
  }

  seconds(fractional = false) {
    return this.inSeconds(fractional) % 60;
  }

  minutes(fractional = false) {
    return this.inMinutes(fractional) % 60;
  }

  hours(fractional = false) {
    return this.inHours(fractional) % DAY;
  }

  days(fractional = false) {
    return this.inDays(fractional);
  }

  toDate() {
    const date = new Date();

    date.setHours(this.inHours());
    date.setMinutes(this.inMinutes());
    date.setSeconds(this.inSeconds());
    date.setMilliseconds(this.milliseconds());
  }

  toString() {
    const pad = (n: number, p = 2) => n.toString().padStart(p, "0");
    const hh = pad(this.hours());
    const mm = pad(this.minutes());
    const ss = this.seconds(true).toFixed(3);

    return `${hh}:${mm}:${ss}`;
  }

  toJSON() {
    return `PTH${this.hours()}M${this.minutes()}S${this.seconds(true).toFixed(
      3
    )}`;
  }

  [inspect.custom](depth: number, opts: InspectOptionsStylized) {
    return opts.stylize(this.toString(), "special");
  }

  valueOf() {
    return this.inMilliseconds();
  }

  [Symbol.toPrimitive]() {
    return this.valueOf();
  }
}
