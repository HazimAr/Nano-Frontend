/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { getPercent } from "@utils/utils";

export default function Level(props: any): JSX.Element {
	return (
		<CircularProgress
			// value={50}
			value={
				(props.user.guilds
					? getPercent(props.user.guilds[props.guild]?.xp)
					: getPercent(props.user.xp)) * 100
			}
			color="brand.primary"
			trackColor="transparent"
			{...props}
		>
			<CircularProgressLabel>
				{props.user.guilds
					? props.user.guilds[props.guild]?.lvl
					: props.user.lvl}
			</CircularProgressLabel>
		</CircularProgress>
	);
}
