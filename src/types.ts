export type PrettyTime = {
	seconds: string;
	minutes: string;
};

export type Timer = {
	name: string;
	length: number;
	count: number;
	running: boolean;
};

export interface TimerState {
	activeTimer: TimerKind;
	break: Timer;
	session: Timer;
	fresh: boolean;
	intervalID: any;
}

export enum ActionKind {
	Increase = 'increase',
	Decrease = 'decrease',
	Start = 'start',
	Stop = 'stop',
	Reset = 'reset',
	AlternateTimer = 'alternateTimer',
	SetIntervalID = 'setIntervalID',
}

export enum TimerKind {
	Session = 'session',
	Break = 'break',
}

export enum StartPause {
	Start = 'start',
	Pause = 'pause',
}

export type Action = {
	type: ActionKind;
	name: TimerKind;
	modifyingLength: boolean;
	intervalID: any;
};

export interface TimerSettingProps {
	name: TimerKind;
	time: number;
	handleClick: any;
}

export interface StartStopProps {
	timerState: TimerState;
	handleClick: any;
}

export interface TimerProps {
	timerState: TimerState;
}

export interface ResetProps {
	handleClick: any;
	intervalID: any;
}
