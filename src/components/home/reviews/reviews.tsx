import { HStack } from "@chakra-ui/react";
import RotatingPanel from "./rotating_panel";

export default function Reviews(): JSX.Element {
	return (
		<HStack h="100%" justify="center" mx={10}>
			<RotatingPanel />
		</HStack>
	);
}
