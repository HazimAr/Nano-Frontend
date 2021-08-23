/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { Channels } from '@components/dashboard/channels';
import { createTimer } from '@api/server';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function CreateTimerForm({ categories, session, guild_id, timer_id, timerLength, premium }: { categories: any; session: any; guild_id: string; timer_id: string; timerLength: number; premium: number }): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState() as any;
	const [interval, setInterval] = useState(null);
	const [message, setMessage] = useState('');

	const toast = useToast();
	const router = useRouter();

	return (
		<>
			<Button onClick={onOpen} bg="red_black.red">
				Add Timer
			</Button>
			{timerLength < (premium === 0 ? 1 : 5) && (
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
									<Input
										placeholder="10"
										type="number"
										// @ts-expect-error
										onWheel={(e) => e.target.blur()}
										onChange={(e: any) =>
											setInterval(
												// minutes to milliseconds
												e.target.value * 1_000 * 60
											)
										}
									/>
									<InputRightAddon bg="rgba(0,0,0,0.2)">minutes</InputRightAddon>
								</InputGroup>
							</Stack>
							<Divider my={5} />
							<Stack>
								<Heading size="md" textAlign="center">
									Message
								</Heading>
								<Textarea
									placeholder="Hey, I'm a timer!"
									onChange={(e: any) => {
										const response = e.target.value;
										if (response.length > 2000) {
											setMessage(response.substring(0, 2000));
											return;
										}
										setMessage(response);
									}}
									value={message}
								></Textarea>
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button mr={3} onClick={onClose} bg="red_black.red">
								Cancel
							</Button>
							<Button
								bg="red_black.red"
								onClick={async () => {
									if (!channel || !message || !interval) {
										return toast({
											title: 'Error',
											description: 'Please fill out all fields.',

											status: 'error',
											duration: 3_000,
											isClosable: true,
										});
									}
									if (interval < 60_000) {
										return toast({
											title: 'Error',
											description: 'Please provide a number greater then 1 minute',

											status: 'error',
											duration: 3000,
											isClosable: true,
										});
									}
									onClose();

									const { data } = await createTimer(guild_id, channel.channel_id, interval, timer_id, message, session.accessToken, false, true);
									toast({
										title: 'Success',
										description: data,
										status: 'success',
										duration: 3000,
										isClosable: true,
									});
									setChannel(null);
									setInterval(null);
									setMessage('');
									router.push(router.asPath);
								}}
							>
								Create
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	);
}
