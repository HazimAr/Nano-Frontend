/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Divider,
	Heading,
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
import EmojiPicker from "@components/emojiPicker";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateReaction({
	categories,
	session,
	guild_id,
	timer_id,
	custom,
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState() as any;
	const [emoji, setEmoji] = useState() as any;
	const [reactionRoles, setReactionRoles] = useState([]);
	const [message, setMessage] = useState("Hey, I'm a timer!");

	const toast = useToast();
	const router = useRouter();
	return (
		<>
			<Button onClick={onOpen}>Add Reaction Role</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Add Reaction Role</ModalHeader>
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
								Message
							</Heading>
							<Textarea
								onChange={(e) => {
									setMessage(e.target.value);
								}}
								value={message}
							></Textarea>
						</Stack>
						<Divider my={5} />
						<Stack>
							<Heading size="md" textAlign="center">
								Reaction and roles
							</Heading>
							<EmojiPicker setEmoji={setEmoji} custom={custom} />
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
								router.push("/dashboard/reaction");
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
