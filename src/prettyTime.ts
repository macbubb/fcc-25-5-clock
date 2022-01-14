import {PrettyTime} from './types';

export const prettyTime = (time: number): PrettyTime => {
	const updateZeros = (time: string): string => {
		if (time.length === 1 && time !== '0') {
			time = '0' + time;
		} else if (time === '0') {
			time = '00';
		}
		return time;
	};
	let minutes: string = updateZeros(String(Math.floor(time / 60)));
	let seconds: string = updateZeros(String(time % 60));
	return {minutes: minutes, seconds: seconds};
};
