import { useDisclosure, VStack } from "@chakra-ui/react";
import Button from "@components/button";
export default function CreateReactionRoleModal(): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
		</VStack>
	);
}
