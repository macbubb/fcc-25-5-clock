import * as React from 'react';
import {StyledEngineProvider} from '@mui/material/styles';
import CircularProgress, {
	CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function TimerProgressCircle(
	props: CircularProgressProps & {value: number}
) {
	return (
		<StyledEngineProvider injectFirst>
			<Box sx={{position: 'relative', display: 'inline-flex'}}>
				<CircularProgress variant="determinate" {...props} />
			</Box>
		</StyledEngineProvider>
	);
}
