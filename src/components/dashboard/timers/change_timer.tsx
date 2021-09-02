/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { createTimer } from '@api/server';
import {
	Button,
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
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcCancel } from 'react-icons/fc';

export function EditTimer({ token, categories, guild_id, timer }: { token: unknown; categories: any; timer: any; guild_id: string }): JSX.Element {
	const { timer_id, channel_id, interval: _interval } = timer ?? {};

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState({ channel_id });
	const [interval, setInterval] = useState(_interval?.toString());
	const [message, setMessage] = useState(timer.message ? timer.message : '');
	const toast = useToast();
	const router = useRouter();

	return (
		<>
			<Button p="5px" w="100%" height="100%" minHeight="50px" onClick={onOpen} _hover={{ transform: 'scale(1.2)' }} _focus={{ transform: 'scale(1.2)' }} bg="red_black.black">
				<VStack>
					{timer.channel?.name ? (
						<>
							<Heading size="md" color="red_black.red">
								{timer.channel.name}
							</Heading>
							<Text size="md" color="light_white">
								{interval && `Every ${(interval / 60_000).toFixed(1)} ${interval > 60_000 ? 'minutes' : 'minute'}`}
							</Text>
							<Text size="md" color="white">
								{timer.message}
							</Text>
						</>
					) : (
						<Heading size="md" color="red_black.red">
							Set Timer
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
						<Button mr={3} onClick={onClose} bg="red_black.red">
							Cancel
						</Button>
						<Button
							bg="red_black.red"
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

export function DeleteTimer({ token, categories, timer, guild_id }: { token: unknown; categories: any; timer: any; guild_id: string }): JSX.Element {
	const { timer_id, channel_id, interval: _interval } = timer ?? {};

	const toast = useToast();
	const router = useRouter();

	return timer.enabled ? (
		<Button
			onClick={async () => {
				const { data } = await createTimer(guild_id, null, null, timer.timer_id, null, token, true, true);
				toast({
					title: 'Success',
					description: data,
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
				router.push(router.asPath);
			}}
			_hover={{ transform: 'scale(1.15)' }}
			_focus={{ transform: 'scale(1.15)' }}
			bg="transparent"
			position="absolute"
			right="-25px"
			top="-10px"
			fontSize="40px"
		>
			<FcCancel />
		</Button>
	) : null;
}