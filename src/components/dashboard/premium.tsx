import {
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import Button from "@components/button";

export default function Premium({ isOpen, onOpen, onClose }): JSX.Element {
	return (
		<>
			<Button onClick={onOpen}>Open Modal</Button>

			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent bg="bg.primary">
					<ModalHeader>Premium Feature</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>

					<ModalFooter>
						<HStack>
							<Button onClick={onClose}>
								Upgrade To Premium
							</Button>
							<Button onClick={onClose}>Not Now</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
