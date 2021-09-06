import { Avatar, Flex, HStack, Spacer, Link, Text, Box } from '@chakra-ui/react';
import Button from '@components/button';
import Container from '@components/container';
import ContainerInside from '@components/containerInside';
import { signIn } from 'next-auth/client';
import { DiscordUser } from 'types';
import { Logo } from '@components/dashboard/nav/logo';
import { SearchField } from '@components/dashboard/nav/searchfield';

// eslint-disable-next-line import/no-default-export
export function Header({ session }: { session: DiscordUser }): JSX.Element {
	return (
		<Container as="header" py={3} bg="bg.secondary">
			<ContainerInside>
				<Flex justify="space-between" align="center" flexWrap="wrap">
					<Logo />
					<Box>
						<SearchField />
					</Box>
					<Flex justify="center" align="center">
						<Link href="/donate" mr={5}>
							Donate
						</Link>
						{session ? (
							<Link href="/dashboard">
								<HStack spacing="4" px="2" flexShrink={0} p="4">
									<Avatar size="sm" name={session.user.name} src={session.user.image} />
									<Flex direction="column" fontWeight="medium">
										<Text fontSize="sm">{session.user.name}</Text>
									</Flex>
								</HStack>
							</Link>
						) : (
							<Button
								onClick={async () => {
									await signIn('discord');
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
