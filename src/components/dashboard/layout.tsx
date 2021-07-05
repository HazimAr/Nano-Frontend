/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { MobileTopBar } from "./dash/mobiletopbar";
import { Sidebar } from "./dash/sidebar";

// eslint-disable-next-line import/no-default-export
export default function Layout({
	children,
	session,
}: {
	children: React.ReactNode;
	session: any;
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
					<Box w="100%">{children}</Box>
				</Flex>
			</Flex>
		</Box>
	);
}
