/* eslint-disable no-void */
import { Box, Flex, Image } from "@chakra-ui/react";
import Button from "@components/button";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import { useRouter } from "next/router";

export default function Home(): JSX.Element {
	const router = useRouter();
	return (
		<Container bg="bg.secondary">
			<ContainerInside>
				<Flex justify="center" align="center">
					<Box>
						<Button
							onClick={() => {
								void router.push("/dashboard");
							}}
						>
							Open Dashboard
						</Button>
					</Box>
					<Box>
						<Image src="/undraw/game.svg" w={400} />
					</Box>
				</Flex>
			</ContainerInside>
		</Container>
	);
}
