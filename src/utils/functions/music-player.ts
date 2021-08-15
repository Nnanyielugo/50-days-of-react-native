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
    '#ECD7D7',
    '#ECDDD7',
    '#ECEBD7',
    '#ECE3D7',
    '#ECE8D7',
    '#ECEAD7',
    '#EBECD7',
    '#E9ECD7',
    '#E6ECD7',
    '#E1ECD7',
    '#DBECD7',
    '#D7ECDD',
    '#D7ECE3',
    '#D7ECE9',
    '#D7EAEC',
    '#D7E7EC',
    '#D7E3EC',
    '#D7DEEC',
    '#D7DAEC',
    '#DBD7EC',
    '#E1D7EC',
    '#E5D7EC',
    '#EBD7EC',
    '#ECD7E7',
  ];
  const RandomBackgroundIndex = Math.floor(
    Math.random() * BackgroundColors.length,
  );
  return BackgroundColors[RandomBackgroundIndex];
}
