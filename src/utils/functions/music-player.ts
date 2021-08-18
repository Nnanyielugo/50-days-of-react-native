import type { BackgroundColor } from '../interfaces/music-player';
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

export function setRandomBackgroundColor(): BackgroundColor {
  const colors: BackgroundColor[] = [
    { light: '#ECD7D7', dark: '#EDC1C1' },
    { light: '#ECDDD7', dark: '#EECFC2' },
    { light: '#ECEBD7', dark: '#EDEBC2' },
    { light: '#ECE3D7', dark: '#ECDBC3' },
    { light: '#ECE8D7', dark: '#EDE5C4' },
    { light: '#ECEAD7', dark: '#EEEAC3' },
    { light: '#EBECD7', dark: '#ECEEC1' },
    { light: '#E9ECD7', dark: '#E7EEC2' },
    { light: '#E6ECD7', dark: '#E0EDC1' },
    { light: '#E1ECD7', dark: '#D7EDC2' },
    { light: '#DBECD7', dark: '#CBEEC2' },
    { light: '#D7ECDD', dark: '#C2EFCF' },
    { light: '#D7ECE3', dark: '#C1EEDA' },
    { light: '#D7ECE9', dark: '#C2EEE7' },
    { light: '#D7EAEC', dark: '#C1E9ED' },
    { light: '#D7E7EC', dark: '#C3E3EE' },
    { light: '#D7E3EC', dark: '#C2DAED' },
    { light: '#D7DEEC', dark: '#C1D0ED' },
    { light: '#D7DAEC', dark: '#C2C8EC' },
    { light: '#DBD7EC', dark: '#CAC2ED' },
    { light: '#E1D7EC', dark: '#D6C2ED' },
    { light: '#E5D7EC', dark: '#DFC2ED' },
    { light: '#EBD7EC', dark: '#EDC3EF' },
    { light: '#ECD7E7', dark: '#EFC1E4' },
  ];

  const RandomBackgroundIndex = Math.floor(Math.random() * colors.length);
  return colors[RandomBackgroundIndex];
}
