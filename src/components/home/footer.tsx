import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";

// eslint-disable-next-line import/no-default-export
export default function Footer(): JSX.Element {
	return (
		<Box as="footer">
			<Container bg="brand.purple.light" mt="-7px">
				<ContainerInside>
					<Flex
						justify="space-between"
						textAlign="left"
						flexWrap="wrap"
						py="10px"
					/>
				</ContainerInside>
			</Container>
			<Container bg="brand.purple.dark" py="10px">
				<ContainerInside>
					<Flex
						justify="space-between"
						align="center"
						color="text.200"
					>
						<Text>
							Nano © 2021 All Rights Reserved
						</Text>
						<Text>
							<Link href="/terms">Terms of Service</Link> |{" "}
							<Link href="/privacy">Privacy Policy</Link>
						</Text>
					</Flex>
				</ContainerInside>
			</Container>
		</Box>
	);
}
