import * as React from 'react';
import {ResetProps, ActionKind, TimerKind} from './types';
import IconButton from '@mui/material/IconButton';
import RestartAlt from '@mui/icons-material/RestartAlt';
import {smallRoundButtonSize} from './constants';

export const Reset = ({handleClick, intervalID}: ResetProps) => {
	return (
		<div>
			<IconButton
				value="check"
				id="reset"
				onClick={() => {
					const beep: HTMLAudioElement = document.getElementById('beep');
					beep.pause();
					beep.currentTime = 0;
					clearInterval(intervalID);
					handleClick({
						type: ActionKind.Reset,
						name: TimerKind.Session,
						modifyingLength: false,
					});
				}}
				sx={{
					marginLeft: '1rem',
					backgroundColor: '#666D73',
					color: '#F2F2F2',
					'&:hover': {
						color: '#F2F2F2',
						backgroundColor: '#7B848A',
					},
				}}
			>
				<RestartAlt sx={{fontSize: smallRoundButtonSize}} />
			</IconButton>
		</div>
	);
};
