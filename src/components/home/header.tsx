import { Avatar, Box, Flex, HStack, Link } from '@chakra-ui/react';
import Button from '@components/button';
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
			<Flex align="center" mr="55px">
				{/* <Link href="/donate" mr={5}>
					Donate
				</Link> */}
				{session ? (
					<Link href={`/user/${session.user.id}/profile`}>
						<Avatar size="md" name={session.user.name} src={session.user.image} />
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
