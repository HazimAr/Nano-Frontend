/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import {
	Box,
	Heading,
	Input,
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
	useToast
} from "@chakra-ui/react";
import Button from "@components/button";
import axios from "axios";
import { useState } from "react";

export default function CreateCustom({
	guild,
	token,
	guild_id,
	command_id
}: {
	guild: any;
	token: string;
	guild_id: string;
	command_id: number;	
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [command, setCommand] = useState("");
	const [response, setResponse] = useState("");
	const toast = useToast();
	return (
		<Box w="100%">
			<Button w="100%" onClick={onOpen}>
				Create Custom Command
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Create Custom Command</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Heading size="sm">Command</Heading>
							<Input
								placeholder="Hello, World!"
								value={`${guild?.prefix ?? "-"}${command}`}
								onChange={(e: any) => {
									const command = e.target.value
										.substring(1)
										.trim();
									if (command.length > 2000) {
										setCommand(command.substring(0, 2000));
										return;
									}
									setCommand(command);
								}}
							/>
							<Heading size="sm">Bot responds with</Heading>
							<Textarea
								placeholder="Hello, World!"
								h="100px"
								resize="none"
								value={response}
								onChange={(e: any) => {
									const response = e.target.value;
									if (response.length > 2000) {
										setResponse(
											response.substring(0, 2000)
										);
										return;
									}
									setResponse(response);
								}}
							/>
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
									"/api/guilds/customCommand",
									{
										guild_id,
										command,
										response,
										command_id,
										token,
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
		</Box>
	);
}
