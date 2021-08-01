/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Divider,
	Heading,
	HStack,
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
	Text,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import Button from "@components/button";
import Channel from "@components/dashboard/timers/channel";
import axios from "axios";
import { useState } from "react";

export default function CreateTimerForm({
	categories,
	session,
	guild_id,
}: {
	categories: any;
	session: any;
	guild_id: string;
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState() as any;
	const [timer, setTimer] = useState(10);
	const [message, setMessage] = useState("Hey, I'm a timer!");
	const timer_id = 1;
	return (
		<>
			<Button onClick={onOpen}>Add Timer</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Add Timer</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack justify="center">
							<Heading size="md" textAlign="center">
								{channel
									? channel.channel_name
									: "Select A Channel"}
							</Heading>
							{categories.map((category: any) => {
								return (
									<Accordion
										allowToggle
										borderColor="transparent"
										key={category.id}
									>
										<AccordionItem>
											<Heading
												bg="rgba(0,0,0,0.2)"
												rounded="md"
											>
												<AccordionButton>
													<HStack
														justify="space-between"
														w="100%"
													>
														<Text>
															{category.name
																? category.name
																: "No Category"}
														</Text>
														<AccordionIcon />
													</HStack>
												</AccordionButton>
											</Heading>
											<AccordionPanel>
												{category.channels.map(
													(curChannel: any) => {
														return (
															<Channel
																key={
																	curChannel.channel_id
																}
																curChannel={
																	curChannel
																}
																channel={
																	channel
																}
																setChannel={
																	setChannel
																}
															/>
														);
													}
												)}
											</AccordionPanel>
										</AccordionItem>
									</Accordion>
								);
							})}
						</Stack>
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
									value={timer}
									onChange={(e: any) =>
										setTimer(
											// minutes to milliseconds
											e.target.value * 1000 * 60
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
								console.log(guild_id);
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
								console.log(data);
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
