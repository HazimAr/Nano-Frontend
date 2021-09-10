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
		<Box h="100%" minH="100vh" w="100%" overflowY="auto" overflowX="hidden" bg="theme_blue.base_dark">
			{/* <MobileTopBar session={session} /> */}
			<Sidebar session={session} cookies={cookies} isOpen={isOpen} setOpen={setOpen} bg="theme_blue.base_light" ml={isOpen ? '0px' : '-240px'} transition="all .1s ease-out" pos="fixed" zIndex={1} height="100%" />
			<Box pos="fixed" h="70px" zIndex={2} w="100%" bg="theme_blue.base_light">
				<Header session={session} isOpen={isOpen} setOpen={setOpen} />
			</Box>
			<Flex justifyContent="center" pos="relative" zIndex={0} ml={isOpen ? '240px' : '0px'} mt={70} transition="all .1s ease-out">
				{children}
			</Flex>
		</Box>
	);
}
