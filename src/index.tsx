import * as React from 'react';
import {useState, useReducer, useEffect, useCallback} from 'react';
import {render} from 'react-dom';
// import './styles.scss';

import {ActionKind, TimerKind, StartPause} from './types';
import {initialTimerState} from './constants';
import {timerStateReducer} from './timerStateReducer';
import {TimerSettings} from './TimerSettings';
import {StartStop} from './StartStop';
import {TimerDisplay} from './TimerDisplay';
import {Reset} from './Reset';
import {TimerProgressCircle} from './TimerProgressCircle';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';

const App = () => {
	const [timerState, dispatch] = useReducer(
		timerStateReducer,
		initialTimerState
	);

	let [progress, setProgress] = useState(
		timerState.session.count / timerState.session.length
	);

	let [startNewTimer, setStartNewTimer] = useState(0);

	const timer = () => {
		console.log('small timer called');
		dispatch({
			type: ActionKind.Decrease,
			name: timerState.activeTimer,
			modifyingLength: false,
		});
	};

	const timerController = (startPause: StartPause) => {
		console.log('big timer called');
		let activeTimer: TimerKind = timerState.activeTimer;
		if (startPause === StartPause.Pause) {
			console.log('pausing timer' + timerState.intervalID);
			dispatch({
				type: ActionKind.Stop,
				name: activeTimer,
				modifyingLength: false,
			});
			clearInterval(timerState.intervalID);
		} else if (startPause === StartPause.Start) {
			console.log('starting timer');
			dispatch({
				type: ActionKind.Start,
				name: activeTimer,
				modifyingLength: false,
			});
			const ID: any = setInterval(timer, 1000);
			dispatch({type: ActionKind.SetIntervalID, intervalID: ID});
		}
	};

	useEffect(() => {
		let currentTimer: TimerKind = timerState.activeTimer;
		setProgress(
			(100 * timerState[currentTimer].count) / timerState[currentTimer].length
		);
		if (timerState[timerState.activeTimer].count === 0) {
			console.log('beep beep');
			const beep: HTMLAudioElement = document.getElementById('beep');
			beep.play();
			clearInterval(timerState.intervalID);
			setTimeout(() => {
				dispatch({
					type: ActionKind.Stop,
					name: timerState.activeTimer,
					modifyingLength: false,
				});
				dispatch({
					type: ActionKind.AlternateTimer,
					name: timerState.activeTimer,
					modifyingLength: false,
				});
				dispatch({
					type: ActionKind.Start,
					name: timerState.activeTimer,
					modifyingLength: false,
				});
			}, 500);
			setTimeout(() => {
				setStartNewTimer(startNewTimer + 1);
			}, 750);
		}
	}, [timerState.session.count, timerState.break.count]);

	useEffect(() => {
		if (startNewTimer !== 0) timerController(StartPause.Start);
	}, [startNewTimer]);

	return (
		<Box
			className="main"
			sx={{
				position: 'relative',
				display: 'flex',
				backgroundColor: '#232426',
				color: '#F2F2F2',
				justifyContent: 'center',
			}}
		>
			<TimerProgressCircle size={750} value={progress} thickness={1} />
			<Box
				className="main-controls"
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<Box
					className={
						timerState.session.running ||
						timerState.break.running ||
						!timerState.fresh
							? 'main-controls-settings hidden'
							: 'main-controls-settings shown'
					}
					sx={{
						width: 'auto',
						flexDirection: 'row',
						display: 'flex',
					}}
				>
					<TimerSettings
						name={timerState.session.name}
						time={timerState.session.length}
						handleClick={dispatch}
					/>
					<TimerSettings
						name={timerState.break.name}
						time={timerState.break.length}
						handleClick={dispatch}
					/>
				</Box>
				<Box
					className={
						timerState.session.running ||
						timerState.break.running ||
						!timerState.fresh
							? 'shown'
							: 'hidden'
					}
					sx={{marginBottom: '3rem'}}
				>
					<TimerDisplay timerState={timerState} />
				</Box>{' '}
				<Box
					className="main-controls-timer"
					sx={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<StartStop timerState={timerState} handleClick={timerController} />
					<Reset handleClick={dispatch} intervalID={timerState.intervalID} />
				</Box>
			</Box>
			<audio
				id="beep"
				preload="auto"
				src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
			/>
		</Box>
	);
};

render(<App />, document.getElementById('root'));
