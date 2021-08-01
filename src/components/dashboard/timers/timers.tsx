import { Stack } from "@chakra-ui/react";
import { useState } from "react";
import Timer from "./timer";

export default function Timers({
	guild_id,
	token,
	timers,
}: {
	guild_id: string;
	token: unknown;
	timers: any[];
}): JSX.Element {
	const [timerss, setTimers] = useState(timers);
    
	return (
		<Stack>
			{timerss.map((timer) => {
				return (
					<Timer
						timer={timer}
						timers={timerss}
						guild_id={guild_id}
                        setTimers={setTimers}
						token={token}
					/>
				);
			})}
		</Stack>
	);
}
