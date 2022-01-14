import {initialTimerState} from './constants';
import {TimerState, ActionKind, Action, TimerKind} from './types';

export const timerStateReducer = (
	timerState: TimerState,
	action: Action
): TimerState => {
	const {name, length, count} = action.name
		? timerState[action.name]
		: timerState.session;

	// console.log(timerState);

	switch (action.type) {
		case ActionKind.Increase: {
			if (timerState[name].length === 3600) {
				return timerState;
			}
			if (timerState[name].running) {
				return timerState;
			} else if (action.modifyingLength) {
				let newTimerState: TimerState = JSON.parse(JSON.stringify(timerState));
				newTimerState[name].length = length + 60;
				newTimerState[name].count = newTimerState[name].length;
				return newTimerState;
			}
			break;
		}
		case ActionKind.Decrease: {
			console.log(timerState[name].length);
			if (action.modifyingLength && timerState[name].length === 60) {
				return timerState;
			}
			let newTimerState: TimerState = JSON.parse(JSON.stringify(timerState));
			if (timerState[name].running) {
				newTimerState[name].count = action.modifyingLength ? count : count - 1;
				return newTimerState;
			} else if (action.modifyingLength) {
				newTimerState[name].length = length - 60;
				newTimerState[name].count = newTimerState[name].length;
				return newTimerState;
			}
			break;
		}
		case ActionKind.Start: {
			return {
				...timerState,
				[name]: {...timerState[name], running: true},
				fresh: false,
			};
		}
		case ActionKind.Stop: {
			return {...timerState, [name]: {...timerState[name], running: false}};
		}
		case ActionKind.Reset: {
			return initialTimerState;
		}
		case ActionKind.AlternateTimer: {
			let newActiveTimer: TimerKind =
				timerState.activeTimer === TimerKind.Session
					? TimerKind.Break
					: TimerKind.Session;
			console.log(`new active timer set to ${newActiveTimer}`);
			return {
				...timerState,
				activeTimer: newActiveTimer,
				session: {
					...timerState.session,
					running: !timerState.session.running,
					count: timerState.session.length,
				},
				break: {
					...timerState.break,
					running: !timerState.break.running,
					count: timerState.break.length,
				},
			};
		}
		case ActionKind.SetIntervalID: {
			return {...timerState, intervalID: action.intervalID};
		}
		default: {
			return timerState;
		}
	}
	return timerState;
};
//delete this
// case ActionKind.Decrease: {
// 	let newTimerState: TimerState = JSON.parse(JSON.stringify(timerState));
// 	if (action.modifyingLength) {
// 		if (
// 			timerState.session.running === true ||
// 			timerState.break.running === true
// 		) {
// 			return timerState;
// 		}
// 		newTimerState[name].length = length - 1;
// 		newTimerState[name].count = newTimerState[name].length;
// 		return newTimerState;
// 	} else {
// 		newTimerState[name].count = count - 1;
// 		return newTimerState;
// 	}
// }
// case ActionKind.Increase: {
// 	let newTimerState: TimerState = JSON.parse(JSON.stringify(timerState));
// 	if (action.modifyingLength) {
// 		if (
// 			timerState.session.running === true ||
// 			timerState.break.running === true
// 		) {
// 			return timerState;
// 		}
// 		newTimerState[name].length = length + 1;
// 		newTimerState[name].count = newTimerState[name].length;
// 		return newTimerState;
// 	} else {
// 		newTimerState[name].count = count + 1;
// 		return newTimerState;
// 	}
// }
