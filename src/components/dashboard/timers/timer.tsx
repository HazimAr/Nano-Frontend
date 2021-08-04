import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Button from "@components/button";
import axios from "axios";
import React from "react";

export default function Timer({
	guild_id,
	token,
	timer,
	setTimers,
	timers,
}: {
	guild_id: string;
	token: unknown;
	timer: any;
	setTimers: Function;
	timers: any;
}): JSX.Element {
	return (
		<HStack justify="space-between" bg="rgba(0,0,0,0.2)" py={2} px={5} rounded={5}>
			<VStack>
				<Heading>{timer.channel_name}</Heading>
				<Text>{timer.message}</Text>
			</VStack>

			<VStack justify="center">
				<Button>Edit</Button>
				<Button
					type="delete"
					onClick={async () => {
						await axios.post("/api/guilds/timers/delete", {
							guild_id,
							timer_id: timer.timer_id,
							token,
						});
						const temp = timers;
						temp.splice(timer.timer_id - 1, 1);

						setTimers(temp);
					}}
				>
					Delete
				</Button>
			</VStack>
		</HStack>
	);
}
