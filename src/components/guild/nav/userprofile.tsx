/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Flex, HStack, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export function UserProfile({ session }: any): JSX.Element {
	const router = useRouter();

	return (
		<NextLink href={`/${router.asPath.split('/')[1]}/${router.asPath.split('/')[2]}/profile`} passHref>
			<Link href="profile">
				<HStack spacing="4" px="2" flexShrink={0} p="4">
					<Avatar size="md" name={session.user.name} src={session.user.image} fallbackSrc="/oss.png" />
					<Flex direction="column" fontWeight="medium">
						<Text fontSize="md">{session.user.name}</Text>
					</Flex>
				</HStack>
			</Link>
		</NextLink>
	);
}
