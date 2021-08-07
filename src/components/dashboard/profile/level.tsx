/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export default function Level(props): JSX.Element {
	return (
		<CircularProgress
			// value={50}
			value={props.user.nextLvlPercent * 100}
			color="brand.primary"
			trackColor="transparent"
			{...props}
		>
			<CircularProgressLabel>{props.user.lvl}</CircularProgressLabel>
		</CircularProgress>
	);
}
