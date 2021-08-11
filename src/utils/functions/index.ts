import type { Current, Daily, Hourly } from '../interfaces';

export function composeWeatherResults(data: any) {
  const current: Current = {
    date: data.current.dt,
    temp: data.current.temp,
    feels_like: data.current.feels_like,
    sunrise: data.current.sunrise,
    sunset: data.current.sunset,
    desc: data.current.weather[0].description,
    icon: data.current.weather[0].main,
  };

  const hours: Hourly[] = [];

  const days: Daily[] = [];

  // data.hourly.map((hour) => {
  //   if (hours.length === 5) return;
  //   if (current.date > hour.dt) continue
  // })
  for (let hour of data.hourly) {
    if (current.date > hour.dt) continue;
    const hourly: Hourly = {
      date: hour.dt,
      temp: hour.temp,
      pop: hour.pop,
      desc: hour.weather[0].description,
      icon: hour.weather[0].main,
    };

    hours.push(hourly);
  }

  for (let day of data.daily) {
    if (days.length === 7) break;
    const daily: Daily = {
      date: day.dt,
      day: day.temp.day,
      night: day.temp.night,
      desc: day.weather[0].description,
      icon: day.weather[0].main,
      pop: day.pop,
    };

    days.push(daily);
  }

  return { current, hours, days };
}

export function getDisplayIcon(name: string): string {
  const formattedName = name.replace(/\W/, '-');
  switch (formattedName) {
    case 'clear-sky':
      return 'sunny-outline';
    case '':
      return 'cloudy-night-outline';
    case '':
      return 'moon-outline';
    case 'few-clouds':
      return 'partly-sunny-outline';
    case '':
      return 'thunderstorm-outline';
    case 'moderate-rain':
      return 'thunderstorm-outline';
    case 'light-rain':
      return 'rainy-outline';
    default:
      return 'cloud-outline';
  }
}

/**
 * overcast-clouds
 * broken-clouds
 * clear-sky
 * scattered-clouds
 * few-clouds
 */

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
