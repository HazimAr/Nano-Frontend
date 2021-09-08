/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export function Level(props): JSX.Element {
	const { user } = props;

	return (
		<CircularProgress
			// value={50}
			value={(user.nextLvlPercent ?? user.percent) * 100}
			color="osu"
			trackColor="transparent"
			{...props}
		>
			<CircularProgressLabel>{user.lvl ?? user.level}</CircularProgressLabel>
		</CircularProgress>
	);
}
