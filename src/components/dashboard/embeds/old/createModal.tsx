import {
	Button,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import CreateFormModal from "@components/dashboard/embeds/createFormModal";

export default function CreateModal() {
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>Create Program</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p={4}>
					<CreateFormModal setToggle={onToggle} />
					<ModalCloseButton />
				</ModalContent>
			</Modal>
		</>
	);
}
