/* eslint-disable import/order */
import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import { DiscordUser } from "types";
import { MobileTopBar } from "./nav/mobiletopbar";
import { Sidebar } from "./nav/sidebar";

// eslint-disable-next-line import/no-default-export
export default function Layout({
	children,
	session,
}: {
	children: React.ReactNode;
	session: DiscordUser;
}): JSX.Element {
	return (
		<Box>
			<Flex h="100vh" flexDirection="column" position="fixed" w="100%">
				<MobileTopBar session={session} />
				<Flex flex="1">
					<Sidebar
						display={{ base: "none", md: "flex" }}
						session={session}
					/>
					<Center h="100%" w="100%" mx={50}>
						{children}
					</Center>
				</Flex>
			</Flex>
		</Box>
	);
}
