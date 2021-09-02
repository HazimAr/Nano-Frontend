import { updateNanoCommands } from '@api/server';
import { Box, VStack, SimpleGrid, Switch, Divider, Text, useToast } from '@chakra-ui/react';
import { Fragment, useState } from 'react';

export function CommandSection({ commands, title, session, guild_id }) {
	// const router = useRouter();
	const { accessToken: token } = session;
	const toast = useToast();
	const [changes, setChanges] = useState(0);

	return (
		<VStack bg="blackAlpha.700" borderRadius="xl" my="50px" py="25px">
			<Box fontSize="26px" width="100%" mx="auto" px="32px">
				<Box textAlign="center" borderRadius="xl" color="osu">
					{title} Commands
				</Box>
				<SimpleGrid columns={3} spacing={10} pt="15px" fontSize="25px">
					<Box textAlign="center">Command</Box>
					<Box textAlign="center">Options</Box>
					<Box textAlign="right" px="8">
						Enabled
					</Box>
					<Divider />
					<Divider />
					<Divider />
					{commands.map((cmd) => (
						<Fragment key={cmd.memberName}>
							<Box fontSize="18px" textAlign="center">
								{cmd.name} <br />
								<Text fontSize="14px" color="red_black.red">
									{cmd.description}
								</Text>
							</Box>
							<Box fontSize="18px" textAlign="center" color="osu">
								{cmd.format}
							</Box>
							<Box textAlign="right" px="8">
								<Switch
									colorScheme="green"
									defaultChecked={cmd.enabled}
									onChange={async () => {
										setChanges(changes + 1);

										const { data } = await updateNanoCommands(guild_id, cmd.groupID, { [cmd.memberName]: !cmd.enabled }, token);

										if (data.error) {
											toast({
												title: 'Error',
												description: 'The command you tried to set has an existing command already set.',
												status: 'error',
												duration: 3000,
												isClosable: true,
											});
											return;
										}

										toast({
											title: 'Success',
											description: data,
											status: 'success',
											duration: 3000,
											isClosable: true,
										});
									}}
								/>
							</Box>
						</Fragment>
					))}
				</SimpleGrid>
			</Box>
		</VStack>
	);
}
