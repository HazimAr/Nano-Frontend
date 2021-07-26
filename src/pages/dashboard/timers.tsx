/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuildChannels } from "@api/server";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Center,
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
	useDisclosure,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import Channel from "@components/dashboard/timers/channel";
import { getSession } from "next-auth/client";
import { useState } from "react";
import { DiscordUser } from "types";
export default function Custom({
	session,
	categories,
}: {
	session: DiscordUser;
	categories: any;
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selected, setSelected] = useState("");
	return (
		<Layout session={session}>
			<Stack spacing={5}>
				<Heading>Timers</Heading>
				<Text>
					Timers are messages sent every x time in a specific channel.
					They're useful when you want to give reminders for example.
				</Text>
				<Button onClick={onOpen}>Add Timer</Button>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent bg="bg.primary">
						<ModalHeader>Add Timer</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
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
													(channel: any) => {
														return (
															<Channel
																key={
																	channel.channel_id
																}
																channel={
																	channel
																}
																selected={
																	selected
																}
																setSelected={
																	setSelected
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
							{/* <Accordion allowToggle borderColor="transparent">
								<AccordionItem>
									<Heading>
										<AccordionButton>
											<Box flex="1" textAlign="left">
												Staff Chat
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</Heading>
									<AccordionPanel></AccordionPanel>
								</AccordionItem>
							</Accordion>
							<Accordion allowToggle borderColor="transparent">
								<AccordionItem>
									<Heading>
										<AccordionButton>
											<Box flex="1" textAlign="left">
												Chat
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</Heading>
									<AccordionPanel></AccordionPanel>
								</AccordionItem>
							</Accordion> */}
						</ModalBody>

						<ModalFooter>
							<Button mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button>Create</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				<Center
					style={{ outlineStyle: "dashed", outlineWidth: 2 }}
					color="grey"
					py={5}
				>
					<Text color="white">
						You don't have any timers right now. Click on the "Add
						Timer" button to add one.
					</Text>
				</Center>
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
		return { props: { session } };
	}
	const guild_id = context.req.cookies.guild ?? "";

	if (!guild_id) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session, guild_id } };
	}

	const categories = await getGuildChannels(guild_id, session.accessToken);

	return { props: { session, categories } };
}
