/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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
} from "@chakra-ui/react";
import Button from "@components/button";
import Channels from "@components/dashboard/channels";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateTimerForm({
	categories,
	session,
	guild_id,
	timer_id,
}: {
	categories: any;
	session: any;
	guild_id: string;
	timer_id: string;
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState() as any;
	const [timer, setTimer] = useState(10);
	const [message, setMessage] = useState("Hey, I'm a timer!");

	const toast = useToast();
	const router = useRouter();
	return (
		<>
			<Button onClick={onOpen}>Add Timer</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Add Timer</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Channels
							categories={categories}
							channel={channel}
							setChannel={setChannel}
						/>
						<Divider my={5} />
						<Stack>
							<Heading size="md" textAlign="center">
								Interval
							</Heading>
							<InputGroup>
								<InputLeftAddon bg="rgba(0,0,0,0.2)">
									Every
								</InputLeftAddon>
								<Input
									placeholder="10"
									type="number"
									onChange={(e: any) =>
										setTimer(
											// minutes to milliseconds
											e.target.value * 1_000 * 60
										)
									}
								/>
								<InputRightAddon bg="rgba(0,0,0,0.2)">
									minutes
								</InputRightAddon>
							</InputGroup>
						</Stack>
						<Divider my={5} />
						<Stack>
							<Heading size="md" textAlign="center">
								Message
							</Heading>
							<Textarea
								onChange={(e) => {
									setMessage(e.target.value);
								}}
								value={message}
							></Textarea>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button
							onClick={async () => {
								if (!channel || !message || !timer) {
									toast({
										title: "Error",
										description:
											"Please fill out all fields.",

										status: "error",
										duration: 3000,
										isClosable: true,
									});
									return;
								}
								onClose();
							
								const { data } = await axios.put(
									"/api/guilds/timers",
									{
										guild_id,
										channel_id: channel.channel_id,
										timer,
										timer_id,
										message,
										token: session.accessToken,
									}
								);
							
								toast({
									title: "Success",
									description: data,
									status: "success",
									duration: 3000,
									isClosable: true,
								});
								router.push("/dashboard/timers");
								
							}}
						>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
