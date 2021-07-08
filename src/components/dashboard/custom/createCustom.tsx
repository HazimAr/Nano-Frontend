/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { createCustomCommand } from "@api/server";
import {
	Box,
	FormControl,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Stack,
	useToast,
} from "@chakra-ui/react";
import Button from "@components/button";
import { useState } from "react";
import { DiscordUser } from "types";

export default function CreateCustom({
	user,
	session,
	guild_id,
}: {
	user: any;
	session: DiscordUser;
	guild_id: string;
}): JSX.Element {
	const [command, setCommand] = useState("");
	const [response, setResponse] = useState("");
	const toast = useToast();
	return (
		<Box>
			<form
				style={{ width: "100%" }}
				onSubmit={async (e) => {
					e.preventDefault();
					toast({
						title: "Success",
						description: `${user.prefix}${command} is being created`,
						status: "info",
						duration: 3000,
						isClosable: true,
					});
					setCommand("");
					setResponse("");
					console.log(guild_id);
					console.log(command);
					console.log(response);
					console.log(session.accessToken);
					const newCommand = await createCustomCommand(
						guild_id,
						command,
						{
							embed: {
								title: "you are gay",
								description: "no you",
								fields: [
									{
										name: "no more being gay",
										value: "gay pride month is over",
										inline: true,
									},
									{
										name: "no moe being gay",
										value: "stupido",
										inline: true,
									},
									{
										name: "no more da gay",
										value: "gay pride gryhrehjrstyjjdrtyjdtyj is over",
										inline: true,
									},
									{
										name: "no more being gay",
										value: "gay  fuck ytou bitcvhsdhfioh  month is over",
									},
								],
							},
						},
						session.accessToken
					);
					if (newCommand) {
						toast({
							title: "Success",
							description: `${user.prefix}${command} was created successfully`,
							status: "success",
							duration: 3000,
							isClosable: true,
						});
					}
				}}
			>
				<Stack>
					<HStack align="center">
						<FormControl isRequired>
							<InputGroup>
								<InputLeftAddon color="brand.primary" fontSize="3xl">
									{user.prefix}
								</InputLeftAddon>
								<Input
									placeholder="Command to execute"
									value={command}
									w="100%"
									onChange={(event: any) => {
										setCommand(event.target.value);
									}}
								/>
							</InputGroup>
						</FormControl>
					</HStack>

					<FormControl isRequired>
						<Input
							placeholder="The bot responds with"
							value={response}
							w="100%"
							onChange={(event: any) => {
								setResponse(event.target.value);
							}}
						/>
					</FormControl>
					<Button type="submit">Create Command</Button>
				</Stack>
			</form>
		</Box>
	);
}

// createCustom;
