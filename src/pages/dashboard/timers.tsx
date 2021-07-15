/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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
}: {
	session: DiscordUser;
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
						<ModalBody>this dude</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button variant="ghost">Create</Button>
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

	return { props: { session } };
}
