import { Box, Flex, Image } from "@chakra-ui/react";
import Button from "@components/button";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";

export default function Home(): JSX.Element {
	return (
		<Container bg="bg.secondary">
			<ContainerInside>
				<Flex justify="center" align="center">
					<Box>
						<Button>Open Dashboard</Button>
					</Box>
					<Box>
						<Image src="/undraw/game.svg" w={400} />
					</Box>
				</Flex>
			</ContainerInside>
		</Container>
	);
}
