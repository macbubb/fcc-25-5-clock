import * as React from 'react';
import {PrettyTime} from './types';
import {prettyTime} from './prettyTime';
import {TimerProps} from './types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const TimerDisplay = ({timerState}: TimerProps) => {
	let displayTimer: PrettyTime = prettyTime(
		timerState[timerState.activeTimer].count
	);
	let timerLabel: string = String(timerState.activeTimer);
	timerLabel = timerLabel.charAt(0).toUpperCase() + timerLabel.slice(1);
	return (
		<Typography
			component="div"
			className="timer"
			sx={{
				position: 'absolute',
				top: 265,
				left: 0,
				right: 0,
				marginLeft: 'auto',
				marginRight: 'auto',
				width: '300px',
			}}
		>
			<Typography
				component="div"
				variant="h1"
				id="time-left"
				sx={{
					color: '#F2F2F2',
					fontWeight: 500,
					fontSize: '8rem',
					lineHeight: '.9',
				}}
			>
				<span>
					{displayTimer.minutes}:{displayTimer.seconds}
				</span>
			</Typography>
			<Typography
				component="div"
				variant="h3"
				id="timer-label"
				sx={{textAlign: 'center', color: '#F2F2F2'}}
			>
				{timerLabel}
			</Typography>
		</Typography>
	);
};
