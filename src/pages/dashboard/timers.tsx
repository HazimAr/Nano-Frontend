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
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";
export default function Custom({
	session,
	channels,
}: {
	session: DiscordUser;
	channels: any;
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const categories: any = [];
	channels.forEach((channel: any) => {
		let done = false;
		if (categories.length === 0) {
			categories.push({
				category: channel.category,
				channels: [channel.name],
			});
			return;
		}
		categories.forEach((category: any) => {
			if (done) return;
			if (channel.category === category.category) {
				category.channels.push(channel.name);
				done = true;
				return;
			}

			categories.push({
				category: channel.category,
				channels: [channel.name],
			});
		});
	});
	console.log(categories);
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
										key={category.category}
									>
										<AccordionItem>
											<Heading>
												<AccordionButton>
													{category.category}

													<AccordionIcon />
												</AccordionButton>
											</Heading>
											<AccordionPanel></AccordionPanel>
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

	const channels = await getGuildChannels(guild_id, session.accessToken);

	return { props: { session, channels } };
}
