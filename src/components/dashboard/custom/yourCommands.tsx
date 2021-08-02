/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Box, Divider, Heading, HStack } from "@chakra-ui/react";
import { useState } from "react";

export default function YourCommands({
	commands,
	guild,
}: {
	commands: any[];
	guild: any;
}): JSX.Element {
	const [commandsState, setCommandsState] = useState(commands);
	return (
		<Box w="100%">
			<HStack justify="space-between">
				<Heading size="md">Your Commands</Heading>
				<Heading size="md">
					{commandsState.length}/{guild?.premium !== 0 ? 1 : 5}
				</Heading>
			</HStack>
			<Divider my={5} />
			{commandsState.length > 0
				? commandsState.map((command) => {
						return JSON.stringify(command);
				  })
				: "You have no custom commands yet."}
		</Box>
	);
}
