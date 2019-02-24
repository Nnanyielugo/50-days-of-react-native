export const padZero = (time) => {
  return time < 10 ? '0' + time : '' + time;
}

export default function format(timeElapsed) {


	const time = new Date(timeElapsed)
	let minutes = padZero(time.getMinutes());
	let seconds = padZero(time.getSeconds());
	let milliseconds = padZero(time.getMilliseconds() / 10 | 0);

	return `${minutes} : ${seconds} : ${milliseconds}`;
}