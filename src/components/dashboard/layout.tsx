/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@chakra-ui/react";
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
		<main id="main">
			<Flex h="100vh" flexDirection="column" position="fixed" w="100%">
				<MobileTopBar session={session}/>
				<Flex flex="1">
					<Sidebar
						display={{ base: "none", md: "flex" }}
						session={session}
					/>
					{children}
				</Flex>
			</Flex>
		</main>
	);
}
