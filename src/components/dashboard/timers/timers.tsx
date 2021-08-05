import { Stack } from "@chakra-ui/react";
import Timer from "./timer";

export default function Timers({
	guild_id,
	token,
	timers,
	categories,
}: {
	guild_id: string;
	token: unknown;
	timers: any[];
	categories: any;
}): JSX.Element {
	return (
		<Stack>
			{timers.map((timer) => {
				return (
					<Timer
						timer={timer}
						guild_id={guild_id}
						token={token}
						categories={categories}
					/>
				);
			})}
		</Stack>
	);
}
