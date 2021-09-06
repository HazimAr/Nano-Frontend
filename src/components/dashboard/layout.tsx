/* eslint-disable import/order */
import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DiscordUser } from 'types';
// import { MobileTopBar } from './nav/mobiletopbar';
import { Sidebar } from './nav/sidebar';
import { Header } from '@components/home/header';

// eslint-disable-next-line import/no-default-export
export default function Layout({ session, cookies, children }: { session: DiscordUser; cookies: any; children: React.ReactNode }): JSX.Element {
	const [isOpen, setOpen] = useState(false);

	return (
		<Box h="100%" w="100%" overflowY="auto" overflowX="hidden">
			{/* <MobileTopBar session={session} /> */}
			<Sidebar session={session} cookies={cookies} isOpen={isOpen} setOpen={setOpen} ml={isOpen ? '0px' : '-240px'} transition="200ms linear" />
			<Box w="100%">
				<Header session={session} isOpen={isOpen} setOpen={setOpen} />
			</Box>
			<Flex justifyContent="center">{children}</Flex>
		</Box>
	);
}
