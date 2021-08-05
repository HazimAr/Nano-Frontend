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
	useToast,
} from "@chakra-ui/react";
import Button from "@components/button";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateCustom({
	guild,
	token,
	guild_id,
	command_id,
	commands,
}: {
	guild: any;
	token: string;
	guild_id: string;
	command_id: any;
	commands: string[];
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [trigger, setTrigger] = useState("");
	const [response, setResponse] = useState("");
	const toast = useToast();
	const router = useRouter();
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
								value={`${guild?.prefix ?? "!"}${trigger}`}
								onChange={(e: any) => {
									const command = e.target.value
										.substring(1)
										.trim();
									if (command.length > 2000) {
										setTrigger(command.substring(0, 2000));
										return;
									}
									setTrigger(command);
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
								if (!trigger || !response) {
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
								if (commands.includes(trigger)) {
									toast({
										title: "Error",
										description:
											"A command with that name already exists.",

										status: "error",
										duration: 3000,
										isClosable: true,
									});
									return;
								}
								onClose();
								toast({
									title: "Sent",
									description:
										"Your custom command is being created",

									duration: 3000,
									isClosable: true,
								});
							
								const { data } = await axios.put(
									"/api/guilds/customCommand",
									{
										guild_id,
										trigger,
										response,
										command_id,
										token,
									}
								);

								if (!data) {
									toast({
										title: "Error",
										description:
											"There was an error with creating your command. If this persists to happen, please contact one of the developers",
										status: "error",
										duration: 3000,
										isClosable: true,
									});
									return;
								}

								toast({
									title: "Success",
									description: data,
									status: "success",
									duration: 3000,
									isClosable: true,
								});
								router.push("/dashboard/custom");
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
