import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";

// eslint-disable-next-line import/no-default-export
export default function Header(): JSX.Element {
	return (
		<>
			<Container
				bg="brand.purple.light"
				as="header"
				py="10px"
				w="100%"
				position="fixed"
			>
				<ContainerInside>
					<Flex
						justify="space-between"
						align="center"
						flexWrap="wrap"
					>
						<Link href="/" _hover={{}}>
							<Flex justify="center" align="center">
								<Image src="/logo.png" w={30} />
								<Text ml={2.5}>School Simplified</Text>
							</Flex>
						</Link>
						{/* <Flex>
					<Link href="/about" mr="7px">
						About Us
					</Link>
					<Link href="/contact" mr="7px">
						Contact
					</Link>
					<Link href="/donate">Donate</Link>
				</Flex> */}
						I will add this later, have a good idea
					</Flex>
				</ContainerInside>
			</Container>
			<Box w="100vw" h="50px" />;
		</>
	);
}
