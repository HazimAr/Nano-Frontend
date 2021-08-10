/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Divider,
	Heading,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import Button from "@components/button";
import Channels from "@components/dashboard/channels";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import CreateReactionRoleModal from "./modal/createReactionRoleModal";

export default function EditReaction({
	categories,
	token,
	guild_id,
	reaction_role_id,
	customEmojis,
	availableRoles,
	reactionRoleOg,
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState(reactionRoleOg.channel_id) as any;
	const [message, setMessage] = useState(reactionRoleOg.message);
	const [reactionRole, setReactionRole] = useState(reactionRoleOg) as any;
	const toast = useToast();
	const router = useRouter();

	return (
		<>
			<Button onClick={onOpen} w="100%">
				Edit
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Edit Reaction Role</ModalHeader>
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
								placeholder="Hey, I'm a timer!"
							></Textarea>
						</Stack>
						<Divider my={5} />
						<Stack>
							<Heading size="md" textAlign="center">
								Reaction and roles
							</Heading>

							<CreateReactionRoleModal
								availableRoles={availableRoles}
								custom={customEmojis}
								reactionRole={reactionRole}
								setReactionRole={setReactionRole}
							/>
							<HStack
								color="grey"
								justify="space-between"
								spacing={0}
							>
								<Text>Emoji: </Text>
								<Text>Role: </Text>
							</HStack>
							{Object.keys(reactionRole).map((reactionRoleId) => {
								if (
									typeof reactionRole[reactionRoleId] ===
									"string"
								)
									return;
								if (
									!reactionRole[reactionRoleId].role_ids
										.length
								)
									return;
								return (
									<HStack
										key={reactionRoleId}
										justify="space-between"
									>
										<Text fontSize="2xl">
											{reactionRole[reactionRoleId].emoji}
										</Text>
										<Text>
											{reactionRole[
												reactionRoleId
											].fetchedRoles.map((role) => {
												return (
													<Text
														bg="rgba(0,0,0,0.2)"
														px={2}
														py={1}
														rounded={5}
														color={`#${role.color?.toString(
															16
														)}`}
													>
														{role.name}
													</Text>
												);
											})}
										</Text>
									</HStack>
								);
							})}
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button
							onClick={async () => {
								if (!channel || !message) {
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
								if (!Object.keys(reactionRole).length) {
									toast({
										title: "Error",
										description:
											'Please add a reactionRole "Add Roll".',

										status: "error",
										duration: 3000,
										isClosable: true,
									});
									return;
								}

								onClose();

								const { data } = await axios.put(
									"/api/guilds/reactionRoles",
									{
										guild_id,
										channel_id: channel.channel_id,
										reaction_role_id,
										message,
										role_rows: reactionRole,
										token,
									}
								);
								setReactionRole({});
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
