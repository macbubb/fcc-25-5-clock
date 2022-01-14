import {Timer, TimerState, TimerKind} from './types';

export let initialTimerState: TimerState = {
	break: {
		name: 'break',
		length: 300,
		count: 300,
		running: false,
	},
	session: {
		name: 'session',
		length: 1500,
		count: 1500,
		running: false,
	},
	fresh: true,
	activeTimer: TimerKind.Session,
	intervalID: null,
};

export const smallRoundButtonSize: string = '70px';
