export function padZero(time: number): string {
  return time < 10 ? '0' + time : '' + time;
}

export function format(timeElapsed: number): string {
  const time = new Date(timeElapsed);
  let minutes = padZero(time.getMinutes());
  let seconds = padZero(time.getSeconds());
  let milliseconds = padZero((time.getMilliseconds() / 10) | 0);

  return `${minutes} : ${seconds} : ${milliseconds}`;
}
