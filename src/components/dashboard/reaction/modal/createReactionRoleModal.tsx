import {
	Heading,
	HStack,
	Image,
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
	useToast,
	VStack,
} from "@chakra-ui/react";
import Button from "@components/button";
import EmojiPicker from "@components/emojiPicker";
import Select from "@components/select";
import { useEffect, useState } from "react";

export default function CreateReactionRoleModal({
	reactionRole,
	setReactionRole,
	availableRoles,
	custom,
}): JSX.Element {
	const options = availableRoles
		.sort((a, b) => {
			return b[1].rawPosition - a[1].rawPosition;
		})
		.map((role) => {
			return {
				value: {
					id: role[0],
					name: role[1].name,
					color: role[1].color,
				},
				label: role[1].name,
			};
		});

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [emoji, setEmoji] = useState(null) as any;
	const [role, setRole] = useState(null) as any;
	const toast = useToast();

	useEffect(() => {
		console.log(reactionRole);
	}, [reactionRole]);

	return (
		<VStack>
			<Button
				transitionTimingFunction="ease"
				transitionDuration="0.2s"
				_hover={{
					transform: "scale(1.1)",
					cursor: "pointer",
					color: "brand.secondary",
				}}
				onClick={onOpen}
			>
				Add Role
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Add Role</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={5}>
							<HStack justify="center" spacing={5}>
								<Stack w="100%">
									<Heading size="md">Pick Role</Heading>
									<Select
										options={options}
										onChange={(e) => {
											setRole(e.value);
										}}
									/>
								</Stack>
								<VStack>
									<Heading size="md">Emoji</Heading>
									<EmojiPicker
										setEmoji={setEmoji}
										custom={custom}
									/>
								</VStack>
							</HStack>
							<Stack spacing={5}>
								<HStack size="md">
									<Heading size="md">
										Users will recieve:{" "}
									</Heading>
									{role?.name && (
										<Text
											bg="rgba(0,0,0,0.2)"
											px={2}
											py={1}
											rounded={5}
											color={`#${role?.color?.toString(
												16
											)}`}
										>
											{role?.name}
										</Text>
									)}
								</HStack>
								<HStack size="md">
									<Heading size="md">
										When reacted with:{" "}
									</Heading>
									{emoji?.img ? (
										<Image src={emoji.img} w={10} />
									) : (
										<Text fontSize="3xl">{emoji}</Text>
									)}
								</HStack>
							</Stack>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<HStack>
							<Button onClick={onClose}>Cancel</Button>
							<Button
								onClick={() => {
									if (!emoji && !emoji?.emoji_id) {
										toast({
											title: "Error",
											description:
												"Please Choose An Emoji.",
											status: "error",
											duration: 3000,
											isClosable: true,
										});
										return;
									}

									if (!role) {
										toast({
											title: "Error",
											description: "Please A Role.",
											status: "error",
											duration: 3000,
											isClosable: true,
										});
										return;
									}

									const temp = { ...reactionRole };
									console.log(temp);

									temp[Object.keys(temp).length + 1] = {
										animated: emoji.animated ?? null,
										emoji_id: emoji.emoji_id ?? null,
										name: emoji.name ?? null,
										emoji:
											typeof emoji === "string"
												? emoji
												: null,
										role_ids: [role.id ?? null],
										role_name: role.name ?? null,
										img: emoji.img ?? null,
										color: role.color ?? null,
									};
									console.log(temp);

									setReactionRole(temp);
									setEmoji(null);
									setRole(null);
									onClose();
								}}
							>
								Save
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</VStack>
	);
}
