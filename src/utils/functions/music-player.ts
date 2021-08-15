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

export function setRandomBackgroundColor(): string {
  const BackgroundColors: string[] = [
    '#E3ECD7',
    '#ECE1D7',
    '#ECE9D7',
    '#E8ECD7',
    '#DBECD7',
    '#D7ECE1',
    '#D7ECE9',
    '#D7E9EC',
    '#D7E2EC',
    '#D7D8EC',
    '#E0D7EC',
    '#E9D7EC',
    '#ECD7E7',
  ];
  const RandomBackgroundIndex = Math.floor(
    Math.random() * BackgroundColors.length,
  );
  return BackgroundColors[RandomBackgroundIndex];
}
