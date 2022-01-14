import * as React from 'react';
import {PrettyTime, ActionKind, TimerSettingProps} from './types';
import {prettyTime} from './prettyTime';
import {justMinutes} from './justMinutes';
import IconButton from '@mui/material/IconButton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const TimerSettings = ({name, time, handleClick}: TimerSettingProps) => {
	const formattedTime: string = justMinutes(time);
	return (
		<Box
			sx={{
				backgroundColor: '#363E40',
				padding: '1rem',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				textAlign: 'center',
				borderRadius: '50%',
				marginBottom: '1rem',
				marginLeft: 'auto',
				marginRight: 'auto',
				width: '220px',
				height: '220px',
				'&:first-child': {marginRight: '1.5rem'},
			}}
		>
			<Typography
				sx={{fontSize: '1.95rem', marginBottom: '0px'}}
				variant="h5"
				component="div"
				id={`${name}-label`}
			>
				{name}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					textAlign: 'center',
					marginLeft: 'auto',
					marginRight: 'auto',
					alignItems: 'center',
				}}
				className="timer-controls"
			>
				<IconButton
					sx={{
						marginBottom: '10px',
						color: '#F2F2F2',
						backgroundColor: '#666D73',
						width: '35px',
						height: '35px',
						'&:hover': {backgroundColor: '#7B848A'},
					}}
					id={`${name}-increment`}
					onClick={() => {
						handleClick({
							type: ActionKind.Increase,
							name: name,
							modifyingLength: true,
						});
					}}
				>
					<ArrowDropUpIcon />
				</IconButton>
				<Typography
					sx={{margin: '0 .5rem', fontSize: '3rem'}}
					variant="h4"
					component="span"
					id={`${name}-length`}
				>
					{formattedTime}
				</Typography>
				<IconButton
					sx={{
						marginBottom: '10px',
						width: '35px',
						height: '35px',
						color: '#F2F2F2',
						backgroundColor: '#666D73',
						'&:hover': {backgroundColor: '#7B848A'},
					}}
					id={`${name}-decrement`}
					onClick={() => {
						handleClick({
							type: ActionKind.Decrease,
							name: name,
							modifyingLength: true,
						});
					}}
				>
					<ArrowDropDownIcon />
				</IconButton>
			</Box>
		</Box>
	);
};
