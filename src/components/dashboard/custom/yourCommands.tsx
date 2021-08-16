/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Box, Center, Divider, Heading, HStack, Text } from "@chakra-ui/react";
import Command from "./command";

export default function YourCommands({
	commands,
	guild,
	token,
}: {
	commands: any[];
	guild: any;
	token: string;
}): JSX.Element {
	return (
		<Box w="100%">
			<HStack justify="space-between">
				<Heading size="md">Your Commands</Heading>
				<Heading size="md">
					{commands.length}/{guild?.premium === 0 ? 1 : 5}
				</Heading>
			</HStack>
			<Divider my={5} />
			{commands.length > 0 ? (
				commands.map((command) => {
					return (
						<Command
							key={command.command_id}
							command={command}
							token={token}
							prefix={guild?.prefix ?? "!"}
							guild_id={guild._id}
							premium={guild?.premium}
						/>
					);
				})
			) : (
				<Center
					style={{ outlineStyle: "dashed", outlineWidth: 2 }}
					color="grey"
					py={5}
				>
					<Text color="white" mx={5}>
						You don't have any custom commands right now. Click on
						the "Create Custom Command" button to add one.
					</Text>
				</Center>
			)}
		</Box>
	);
}
