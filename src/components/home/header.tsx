import { Flex, Image, Link, Text } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";

// eslint-disable-next-line import/no-default-export
export default function Header(): JSX.Element {
	return (
		<Container as="header" py={3}>
			<ContainerInside>
				<Flex justify="space-between" align="center" flexWrap="wrap">
					<Link href="/" _hover={{}}>
						<Flex justify="center" align="center">
							<Image src="/logo.png" w={10} />
							<Text ml={2.5}>Nano</Text>
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
				</Flex>
			</ContainerInside>
		</Container>
	);
}
