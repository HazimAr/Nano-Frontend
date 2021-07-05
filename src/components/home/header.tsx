import {
	Avatar,
	Flex,
	Heading,
	HStack,
	Image,
	Link,
	Text,
} from "@chakra-ui/react";
import Button from "@components/button";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import { signIn } from "next-auth/client";
import { DiscordUser } from "types";

// eslint-disable-next-line import/no-default-export
export default function Header({
	session,
}: {
	session: DiscordUser;
}): JSX.Element {
	return (
		<Container as="header" py={3}>
			<ContainerInside>
				<Flex justify="space-between" align="center" flexWrap="wrap">
					<Link href="/" _hover={{}} _focus={{}}>
						<Flex align="center">
							<Image src="/logo.png" w={30} rounded="50%" />
							<Heading size="md" ml={2.5}>
								Nano
							</Heading>
						</Flex>
					</Link>
					<Flex justify="center" align="center">
						{/* <Link href="/about" mr="7px">
						About Us
					</Link>
					<Link href="/contact" mr="7px">
						Contact
					</Link> */}
						<Link href="/donate">Donate</Link>
						{session ? (
							<Link href="/dashboard">
								<HStack spacing="4" px="2" flexShrink={0} p="4">
									<Avatar
										size="sm"
										name={session.user.name}
										src={session.user.image}
									/>
									<Flex
										direction="column"
										fontWeight="medium"
									>
										<Text fontSize="sm">
											{session.user.name}
										</Text>
									</Flex>
								</HStack>
							</Link>
						) : (
							<Button
								onClick={async () => {
									await signIn("discord");
								}}
							>
								Login
							</Button>
						)}
					</Flex>
				</Flex>
			</ContainerInside>
		</Container>
	);
}
