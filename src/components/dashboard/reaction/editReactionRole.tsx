/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import {
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
} from "@chakra-ui/react";
import Button from "@components/button";
import Channels from "@components/dashboard/channels";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EditReactionRole({
	token,
	categories,
	reactionRole,
	guild_id,
}: {
	token: unknown;
	categories: any;
	reactionRole: any;
	guild_id: string;
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState(reactionRole.channel);
	const [timerInterval, setTimerInterval] = useState(
		reactionRole.interval.toString()
	);
	const [message, setMessage] = useState(reactionRole.message);
	const toast = useToast();
	const router = useRouter();

	const timer_id = reactionRole.timer_id;

	return (
		<Box w="100%">
			<Button w="100%" onClick={onOpen}>
				Edit
			</Button>
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
									type="number"
									value={(
										timerInterval /
										1_000 /
										60
									).toString()}
									onChange={(e: any) =>
										setTimerInterval(
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
								if (!channel || !message || !reactionRole) {
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
								if (reactionRole < 60000) {
									toast({
										title: "Error",
										description:
											"Please provide a number greater then 1 minute",

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
										timer_id,
										timer: timerInterval,
										channel_id: channel.id,
										message,
										token,
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
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}
