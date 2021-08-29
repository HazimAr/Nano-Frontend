/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, Textarea, useDisclosure, useToast, HStack, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent, ModalFooter, Heading, ModalCloseButton, Divider, Stack } from '@chakra-ui/react';
import Button from '@components/button';
import { Channels } from '@components/dashboard/channels';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import { CreateReactionRoleModal } from './modal/createReactionRoleModal';
import { GiAbstract111 } from 'react-icons/gi';

export function EditReaction({ token, reaction_role_id, categories, guild_id, reaction, customEmojis, availableRoles, premium }): JSX.Element {
	const [channel, setChannel] = useState('');
	const [message, setMessage] = useState('');
	const [reactionRole, setReactionRole] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const router = useRouter();

	const reactionArr = [];
	for (let i = 1; i < 21; i++) {
		if (reaction[i]) reaction[i].roles = [];
		reaction[i]?.role_ids.forEach((id) => reaction[i].roles.push(availableRoles.find((role) => role[0] === id)?.[1]));
		reactionArr.push(reaction[i]);
	}

	// console.log(reactionArr?.[0]?.role_ids?.[0]);
	console.log(reactionArr);

	return (
		<Box>
			<Button onClick={onOpen} w="100%">
				{reactionArr.map((react, i) => {
					return react?.role_ids ? (
						<Box key={react?.role_ids?.[0]}>
							<HStack>
								<Text mr="21px">{react?.emoji}</Text>
								{reaction?.[i + 1]?.role_ids?.map((id, x) => (
									<Text key={react.roles?.[x].color.toString(16)} color={`#${react.roles?.[x].color.toString(16)}`}>
										<HStack mr="7px">
											<GiAbstract111 /> <Text>{react.roles?.[x].name}</Text>
										</HStack>
									</Text>
								))}
							</HStack>
						</Box>
					) : (
						<>Hi</>
					);
				})}
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Edit Reaction Role</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Channels categories={categories} channel={channel} setChannel={setChannel} />
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

							<CreateReactionRoleModal availableRoles={availableRoles} custom={customEmojis} reactionRole={reactionRole} setReactionRole={setReactionRole} />
							<HStack color="grey" justify="space-between" spacing={0}>
								<Text>Emoji: </Text>
								<Text>Role: </Text>
							</HStack>
							{Object.keys(reactionRole).map((reactionRoleId) => {
								if (typeof reactionRole[reactionRoleId] === 'string') return;
								if (!reactionRole[reactionRoleId].role_ids.length) return;
								return (
									<HStack key={reactionRoleId} justify="space-between">
										<Text fontSize="2xl">{reactionRole[reactionRoleId].emoji}</Text>
										<Text>
											{reactionRole[reactionRoleId].fetchedRoles.map((role) => {
												return (
													<Text bg="rgba(0,0,0,0.2)" px={2} py={1} rounded={5} color={`#${role.color?.toString(16)}`}>
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
										title: 'Error',
										description: 'Please fill out all fields.',

										status: 'error',
										duration: 3000,
										isClosable: true,
									});
									return;
								}
								if (!Object.keys(reactionRole).length) {
									toast({
										title: 'Error',
										description: 'Please add a reactionRole "Add Roll".',

										status: 'error',
										duration: 3000,
										isClosable: true,
									});
									return;
								}

								onClose();

								const { data } = await axios.put('/api/guilds/reactionRoles', {
									guild_id,
									channel_id: channel,
									reaction_role_id,
									message,
									role_rows: reactionRole,
									token,
								});

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
		</Box>
	);
}
