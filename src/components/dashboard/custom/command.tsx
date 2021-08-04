import {
	Heading,
	HStack,
	Stack,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import Button from "@components/button";
import axios from "axios";
import router from "next/router";

export default function Command({
	guild_id,
	prefix,
	token,
	command,
}: {
	guild_id: string;
	token: unknown;
	command: any;
	prefix: string;
}): JSX.Element {
	const toast = useToast();
	return (
		<HStack
			justify="space-between"
			bg="rgba(0,0,0,0.2)"
			py={2}
			px={5}
			my={5}
			rounded={5}
		>
			<Stack>
				<Heading>
					{prefix}
					{command.trigger}
				</Heading>
				<Text>{command.message}</Text>
				<Text>{command.command_id}</Text>
			</Stack>

			<VStack justify="center">
				<Button>Edit</Button>
				<Button
					type="delete"
					onClick={async () => {
						toast({
							title: "Sent",
							description: "Your custom command is being deleted",

							duration: 3000,
							isClosable: true,
						});

						const { data } = await axios.post(
							"/api/guilds/customCommand/delete",
							{
								guild_id,
								command_id: command.command_id,
								token,
							}
						);
						if (data.error) {
							toast({
								title: "Error",
								description:
									"The command you tried to set has an existing command already set.",
								status: "error",
								duration: 3000,
								isClosable: true,
							});
							return;
						}

						toast({
							title: "Success",
							description: data,
							status: "success",
							duration: 3000,
							isClosable: true,
						});

						router.push("/dashboard/custom");
					}}
				>
					Delete
				</Button>
			</VStack>
		</HStack>
	);
}
