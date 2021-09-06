import { Avatar, Flex, HStack, Spacer, Link, Text, Box } from '@chakra-ui/react';
import Button from '@components/button';
import Container from '@components/container';
import ContainerInside from '@components/containerInside';
import { signIn } from 'next-auth/client';
import { DiscordUser } from 'types';
import { Logo } from '@components/dashboard/nav/logo';
import { SearchField } from '@components/dashboard/nav/searchfield';
import { GiHamburgerMenu } from 'react-icons/gi';
//
// eslint-disable-next-line import/no-default-export
export function Header({ session, isOpen, setOpen }: { session: DiscordUser; isOpen: any; setOpen: any }): JSX.Element {
	return (
		<Flex justify="space-between" align="center" flexWrap="wrap">
			<HStack pl="5px">
				<Button bg="transparent" onClick={() => setOpen(!isOpen)}>
					<GiHamburgerMenu />
				</Button>
				<Logo />
			</HStack>
			{/*  */}
			<Box>
				<SearchField />
			</Box>
			{/*  */}
			<Flex align="center" mr="25px">
				<Link href="/donate" mr={5}>
					Donate
				</Link>
				{session ? (
					<Link href="/dashboard">
						<Avatar size="sm" name={session.user.name} src={session.user.image} />
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
			{/*  */}
		</Flex>
	);
}
