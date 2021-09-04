/* eslint-disable import/order */
import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { DiscordUser } from 'types';
// import { MobileTopBar } from './nav/mobiletopbar';
import { Sidebar } from './nav/sidebar';

// eslint-disable-next-line import/no-default-export
export default function Layout({ children, session, cookies }: { children: React.ReactNode; session: DiscordUser; cookies: any }): JSX.Element {
	return (
		<Box h="100%" w="100%" overflowY="auto" overflowX="hidden">
			{/* <MobileTopBar session={session} /> */}
			<Sidebar display={{ base: 'none', md: 'flex' }} w="320px" h="100vh" outline="0" session={session} cookies={cookies} />
			<Box w="auto%" ml="320px" px="155px">
				{children}
			</Box>
		</Box>
	);
}
