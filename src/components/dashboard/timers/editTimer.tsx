/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import {
	Button,
	Box,
	Divider,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Textarea,
	useDisclosure,
	useToast,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Channels } from '@components/dashboard/channels';
import { createTimer } from '@api/server';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function EditTimer({ token, categories, timer, guild_id }: { token: unknown; categories: any; timer: any; guild_id: string }): JSX.Element {
	const { timer_id, channel_id, interval: _interval } = timer ?? {};

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState({ channel_id });
	const [interval, setInterval] = useState(_interval?.toString());
	const [message, setMessage] = useState(timer.message ? timer.message : '');
	const toast = useToast();
	const router = useRouter();

	return (
		<>
			<Button p="5px" w="100%" height="100%" minHeight="50px" onClick={onOpen} _hover={{ transform: 'scale(1.1)' }} bg="red_black.black">
				<VStack>
					<Heading size="md" color="red_black.red">
						{timer.channel?.name ? timer.channel.name : 'Set Timer'}
					</Heading>
					<Text size="md" color="white">
						{interval && `Every ${(interval / 60_000).toFixed(1)} ${interval > 60_000 ? 'minutes' : 'minute'}`}
					</Text>
					<Text size="md" color="red_black.gray">
						{timer.message}
					</Text>
				</VStack>
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Add Timer</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Channels categories={categories} channel={channel} setChannel={setChannel} />
						<Divider my={5} />
						<Stack>
							<Heading size="md" textAlign="center">
								Interval
							</Heading>
							<InputGroup>
								<InputLeftAddon bg="rgba(0,0,0,0.2)">Every</InputLeftAddon>
								<Input type="number" value={(interval / 1_000 / 60).toString()} onChange={(e: any) => setInterval(e.target.value * 1_000 * 60)} />
								<InputRightAddon bg="rgba(0,0,0,0.2)">minutes</InputRightAddon>
							</InputGroup>
						</Stack>
						<Divider my={5} />
						<Stack>
							<Heading size="md" textAlign="center">
								Message
							</Heading>
							<Textarea onChange={(e) => setMessage(e.target.value)} value={message} />
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button
							onClick={async () => {
								if (!channel?.channel_id || !message || !timer) {
									toast({
										title: 'Error',
										description: 'Please fill out all fields.',

										status: 'error',
										duration: 3000,
										isClosable: true,
									});
									return;
								}

								if (interval < 60_000) {
									toast({
										title: 'Error',
										description: 'Please provide a number greater then 1 minute',

										status: 'error',
										duration: 3000,
										isClosable: true,
									});
									return;
								}
								onClose();

								const { data } = await createTimer(guild_id, channel.channel_id, interval, timer_id, message, token, false, true);
								toast({
									title: 'Success',
									description: data,
									status: 'success',
									duration: 3000,
									isClosable: true,
								});

								router.push(router.asPath);
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
