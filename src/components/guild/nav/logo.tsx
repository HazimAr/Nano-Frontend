import { Flex, Heading, Image, Link } from '@chakra-ui/react';
import React from 'react';

export function Logo(): JSX.Element {
	return (
		<Link href="/leaderboards" _hover={{ color: 'brand.secondary' }} _focus={{}}>
			<Flex justify="center">
				{/* <Image src="/logo.png" w={150} rounded="50%" /> */}
				<Heading size="lg" ml={2.5} lineHeight="70px">
					Nano
				</Heading>
			</Flex>
		</Link>
	);
}
