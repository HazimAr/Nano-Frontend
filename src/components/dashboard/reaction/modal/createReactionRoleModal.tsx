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
import { useState } from "react";
export default function CreateReactionRoleModal({
	reactionRole,
	setReactionRole,
	availableRoles,
	custom,
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [emoji, setEmoji] = useState() as any;
	const [role] = useState({
		name: "test role",
		id: "4236436734576",
		color: 6323595,
	}) as any;
	const toast = useToast();
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
								<VStack>
									<Heading size="md">Pick Role</Heading>
									<EmojiPicker
										setEmoji={setEmoji}
										custom={custom}
									/>
								</VStack>
								<VStack>
									<Heading size="md">Pick Emoji</Heading>
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
									<Text
										bg="rgba(0,0,0,0.2)"
										px={2}
										py={1}
										rounded={5}
										color={`#${role.color.toString(16)}`}
									>
										{role?.name}
									</Text>
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
									const temp = reactionRole;
									temp[Object.keys(temp).length + 1] = {
										animated: emoji.animated,
										emoji_id: emoji.emoji_id,
										name: emoji.name,
										role_id: role.id,
									};
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
