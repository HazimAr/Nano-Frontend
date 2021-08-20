/* eslint-disable import/order */
import { Center, Flex } from '@chakra-ui/react';
import React from 'react';
import { DiscordUser } from 'types';
import { MobileTopBar } from './nav/mobiletopbar';
import { Sidebar } from './nav/sidebar';

// eslint-disable-next-line import/no-default-export
export default function Layout({ children, session }: { children: React.ReactNode; session: DiscordUser }): JSX.Element {
	return (
		<Flex h="100vh" flexDirection="column" w="100%" overflowY="auto" overflowX="hidden">
			<MobileTopBar session={session} />
			<Flex flex="1">
				<Sidebar display={{ base: 'none', md: 'flex' }} session={session} h="100vh" outline="0" />
				<Center h="100%" w="100%" mx={25}>
					{children}
				</Center>
			</Flex>
		</Flex>
	);
}
