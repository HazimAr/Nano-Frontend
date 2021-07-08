/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Flex, HStack, Link, Text } from "@chakra-ui/react";
// import useProfile from "@hooks/useProfile";
import React from "react";

export function UserProfile({ session }: any): JSX.Element {
	return (
		<Link href="/dashboard/profile">
			<HStack
				spacing="4"
				px="2"
				flexShrink={0}
				borderTopWidth="1px"
				p="4"
			>
				<Avatar
					size="sm"
					name={session.user.name}
					src={session.user.image}
					fallbackSrc="/oss.png"
				/>
				<Flex direction="column" fontWeight="medium">
					<Text fontSize="sm">{session.user.name}</Text>
				</Flex>
			</HStack>
		</Link>
	);
}
