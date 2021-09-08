import { Avatar, Flex, HStack, Spacer, Link, Text, Box } from '@chakra-ui/react';
import { CUSTOM_BUTTON_1 } from '@components/button';
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
		<Flex justify="space-between" align="center" flexWrap="wrap" mt="2px">
			<HStack pl="5px">
				<CUSTOM_BUTTON_1 bg="transparent" onClick={() => setOpen(!isOpen)}>
					<GiHamburgerMenu />
				</CUSTOM_BUTTON_1>
				<Logo />
			</HStack>
			{/*  */}
			<Box>
				<SearchField />
			</Box>
			{/*  */}
			<Flex align="center" mr="55px">
				{/* <Link href="/donate" mr={5}>
					Donate
				</Link> */}
				{session ? (
					<Link href="/leaderboards">
						<Avatar size="md" name={session.user.name} src={session.user.image} />
					</Link>
				) : (
					<CUSTOM_BUTTON_1
						onClick={async () => {
							await signIn('discord');
						}}
					>
						Login
					</CUSTOM_BUTTON_1>
				)}
			</Flex>
			{/*  */}
		</Flex>
	);
}
