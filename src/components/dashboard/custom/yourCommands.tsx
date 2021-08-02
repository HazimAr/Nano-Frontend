/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Box, Divider, Heading, HStack } from "@chakra-ui/react";
import { useState } from "react";

export default function YourCommands({
	guild,
	token,
	guild_id,
}: {
	guild: any;
	token: string;
	guild_id: string;
}): JSX.Element {
	const [commands, setCommands] = useState([]);

	return (
		<Box w="100%">
			<HStack justify="space-between">
				<Heading size="md">Your Commands</Heading>
				<Heading size="md">
					{commands.length}/{guild?.premium !== 0 ? 1 : 5}
				</Heading>
			</HStack>
			<Divider my={5} />
			{commands.length > 0
				? commands.map((command) => {
						return;
				  })
				: "You have no custom commands yet."}
		</Box>
	);
}
