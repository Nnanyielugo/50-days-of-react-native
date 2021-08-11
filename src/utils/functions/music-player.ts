export function formatTrackDuration(duration: number): string {
  let minutes: number | string = Math.floor(duration / 60);
  let seconds: number | string = Math.floor(duration - minutes * 60);
  seconds = seconds.toFixed(0) as string;
  minutes = minutes.toFixed(0) as string;

  if (parseInt(seconds) < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
