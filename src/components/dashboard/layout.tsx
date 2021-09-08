/* eslint-disable import/order */
import { Box, Flex } from '@chakra-ui/react';
import { useState, ReactNode } from 'react';
import { DiscordUser } from 'types';
// import { MobileTopBar } from './nav/mobiletopbar';
import { Sidebar } from './nav/sidebar';
import { Header } from '@components/home/header';

// eslint-disable-next-line import/no-default-export
export default function Layout({ session, cookies, children }: { session: DiscordUser; cookies: any; children: ReactNode }): JSX.Element {
	const [isOpen, setOpen] = useState(false);

	return (
		<Box h="100%" w="100%" overflowY="auto" overflowX="hidden">
			{/* <MobileTopBar session={session} /> */}
			<Sidebar session={session} cookies={cookies} isOpen={isOpen} setOpen={setOpen} ml={isOpen ? '0px' : '-240px'} transition="all .1s ease-out" pos="absolute" zIndex={1} height="100%" />
			<Box pos="relative" zIndex={0}>
				<Header session={session} isOpen={isOpen} setOpen={setOpen} />
			</Box>
			<Flex justifyContent="center" pos="relative" zIndex={0}>
				{children}
			</Flex>
		</Box>
	);
}
