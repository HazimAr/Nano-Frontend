/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest, createCustomCommand } from '@api/server';
import { Box, Heading, HStack, Stack, Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import Layout from '@components/dashboard/layout';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';
//
// --------- 🚚 🚚 🚚 🚚 🚚 🚚 🚚 🚚 ---------
export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	const { cookies } = context.req;

	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	const api_response = await defaultPostRequest('g/custom_commands', cookies.guild_id, session.accessToken);

	return { props: { session, api_response, cookies } };
}
//
//
const handleToast = (status, description, toast) => {
	toast({
		title: status,
		description,

		status: status.toLowerCase(),
		duration: 2_000,
		isClosable: true,
	});
};
//
export default function Commands({ session, api_response, cookies }: { session: DiscordUser; api_response: any; guild_id: string; cookies: any }): JSX.Element {
	const { guild_id } = cookies ?? {};
	return <Commands2 key={guild_id} session={session} api_response={api_response} cookies={cookies} guild_id={guild_id} />;
}
//
export function Commands2({ session, api_response, guild_id, cookies }: { session: DiscordUser; api_response: any; guild_id: string; cookies: any }): JSX.Element {
	const { mongoGuild } = api_response ?? {};
	const { customCommands, premium } = mongoGuild ?? {};

	const arr = [];
	let commands_len = 0;

	for (let i = 1; i < 6; i++) {
		if (customCommands?.[i]?.message) {
			customCommands[i].id = i;
			arr.push(customCommands[i]);
			commands_len++;
		} else arr.push({ not_set: true, id: i });
	}

	const [cmdArr, setCmdArr] = useState(arr);

	const updateCommand = ({ trigger, response, enabled, id }, _delete) => {
		if (_delete === true) {
			setCmdArr(
				cmdArr.map((timer, i) => {
					if (i + 1 === Number.parseInt(id)) return { not_set: true, id };
					else return timer;
				})
			);
		} else {
			setCmdArr(
				cmdArr.map((timer, i) => {
					if (i + 1 === Number.parseInt(id)) return { trigger, message: response, enabled, id };
					else return timer;
				})
			);
		}
	};

	return (
		<Layout session={session} cookies={cookies}>
			<Stack spacing={5} w="100%" mt="50px" px="50px">
				<HStack justify="space-between">
					<Heading>Custom Commands</Heading>
					<Text>
						{commands_len}/{premium === 0 ? 1 : 5}
					</Text>
				</HStack>
				<Text>Insert or override Nano commands with your own custom commands!</Text>

				<Box>
					{cmdArr.map((cmd) => (
						<Command token={session.accessToken} command={cmd} guild_id={guild_id} updateCommand={updateCommand} key={cmd.id} />
					))}
				</Box>
			</Stack>
		</Layout>
	);
}
//
//
//
function Command({ token, command, guild_id, updateCommand }) {
	return (
		<Box bg="rgba(11,51,15,0.8)" rounded={5} backgroundColor="red_black.gray" h="100%" position="relative" py="2px" my="25px">
			<EditCommand token={token} command={command} guild_id={guild_id} updateCommand={updateCommand} />
			<DeleteCommand token={token} command={command} guild_id={guild_id} updateCommand={updateCommand} />
		</Box>
	);
}
//
//
//
function EditCommand({ token, command, guild_id, updateCommand }): JSX.Element {
	const { trigger, message: response, enabled: _enabled, id } = command;

	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	return (
		<>
			<Button p="5px" w="100%" height="100%" minHeight="50px" onClick={onOpen} _hover={{ transform: 'scale(1.2)' }} _focus={{ transform: 'scale(1.2)' }} bg="red_black.black">
				<VStack>
					{trigger ? (
						<>
							<Heading size="md" color="red_black.red">
								{trigger}
							</Heading>
							<Text size="md" color="white">
								{response}
							</Text>
						</>
					) : (
						<Heading size="md" color="osu">
							Set Command {id}
						</Heading>
					)}
				</VStack>
			</Button>
			{/* // --------------------------                    -------------------------- */}
			{/* // -------------------------- 🔽 POP-UP MENU 🔽 -------------------------- */}
			{/* // --------------------------                    -------------------------- */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="red_black.black">
					<ModalHeader>Custom Command {id}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Heading size="md" textAlign="center">
								Trigger
							</Heading>
							<Textarea onChange={(e) => updateCommand({ trigger: e.target.value, response, id, enabled: true }, false)} value={trigger} />
						</Stack>
						<Stack>
							<Heading size="md" textAlign="center">
								Response
							</Heading>
							<Textarea onChange={(e) => updateCommand({ trigger, response: e.target.value, id, enabled: true }, false)} value={response} />
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose} bg="red_black.red">
							Cancel
						</Button>
						<Button
							bg="red_black.red"
							onClick={async () => {
								if (!trigger) return handleToast('Error', 'Please, set the text that will trigger the command.', toast);
								if (!response) return handleToast('Error', 'Please, set the response to send when the trigger is detected.', toast);

								onClose();
								const { data } = await createCustomCommand({ guild_id, trigger, response, command_id: id, enabled: true }, token, false);
								updateCommand({ trigger, response, id, enabled: true }, false);
								return handleToast('Success', data, toast);
							}}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
//
//
//
function DeleteCommand({ token, command, guild_id, updateCommand }) {
	const { trigger: _trigger, message: _response, enabled: _enabled, id } = command;
	const toast = useToast();

	return _response ? (
		<Button
			onClick={async () => {
				const { data } = await createCustomCommand({ guild_id, trigger: null, response: null, command_id: id, enabled: true }, token, true);
				updateCommand({ id }, true);
				handleToast('Success', data, toast);
			}}
			_hover={{ transform: 'scale(1.15)' }}
			_focus={{ transform: 'scale(1.15)' }}
			bg="transparent"
			position="absolute"
			right="-25px"
			top="-10px"
			fontSize="30px"
		>
			<FcCancel />
		</Button>
	) : null;
}
