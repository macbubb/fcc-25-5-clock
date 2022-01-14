import * as React from 'react';
import {StartStopProps, StartPause} from './types';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import {smallRoundButtonSize} from './constants';

export const StartStop = ({timerState, handleClick}: StartStopProps) => {
	return timerState.break.running || timerState.session.running ? (
		<IconButton
			value="check"
			id="start_stop"
			onClick={() => handleClick(StartPause.Pause)}
			sx={{
				backgroundColor: '#666D73',
				color: '#F2F2F2',
				'&:hover': {
					color: '#F2F2F2',
					backgroundColor: '#7B848A',
				},
			}}
		>
			<Pause sx={{fontSize: smallRoundButtonSize}} />
		</IconButton>
	) : (
		<IconButton
			value="check"
			id="start_stop"
			onClick={() => handleClick(StartPause.Start)}
			sx={{
				backgroundColor: '#666D73',
				color: '#F2F2F2',
				'&:hover': {
					color: '#F2F2F2',
					backgroundColor: '#7B848A',
				},
			}}
		>
			<PlayArrow sx={{fontSize: smallRoundButtonSize}} />
		</IconButton>
	);
};
