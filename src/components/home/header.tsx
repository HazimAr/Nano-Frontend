import { Avatar, Box, Flex, HStack, Link } from '@chakra-ui/react';
import { CUSTOM_BUTTON_1 } from '@components/button';
import { Logo } from '@components/guild/nav/logo';
import { SearchField } from '@components/guild/nav/searchfield';
import { signIn } from 'next-auth/client';
import { GiHamburgerMenu } from 'react-icons/gi';
import { DiscordUser } from 'types';
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
					<Link href={`/user/${session.user.id}/profile`}>
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
