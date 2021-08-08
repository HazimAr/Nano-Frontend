import {
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
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import Button from "@components/button";
import EmojiPicker from "@components/emojiPicker";
import { useEffect, useState } from "react";
export default function CreateReactionRoleModal({
	availableRoles,
	custom,
}): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [emoji, setEmoji] = useState();
	const [role, setRole] = useState();
	useEffect(() => {
		console.log(emoji);
	}, [emoji]);
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
				Add role
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
									<Heading size="md">Pick Emoji</Heading>
									<EmojiPicker
										setEmoji={setEmoji}
										custom={custom}
									/>
								</VStack>
								<VStack>
									<Heading size="md">Pick Role</Heading>
									<EmojiPicker
										setEmoji={setEmoji}
										custom={custom}
									/>
								</VStack>
							</HStack>
							<Stack>
								<Heading size="md">
									Users will recieve: {role}
								</Heading>

								<Heading size="md">
									When reacted with: {emoji}
								</Heading>
							</Stack>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<HStack>
							<Button onClick={onClose}>Cancel</Button>
							<Button>Save</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</VStack>
	);
}
