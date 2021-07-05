/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@chakra-ui/react";
import { getSession } from "next-auth/client";
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
	console.log(session);
	return (
		<main id="main">
			<Flex h="100vh" flexDirection="column" position="fixed" w="100%">
				<MobileTopBar />
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

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	console.log(session);
	if (!session) {
		context.res.writeHead(307, {
			Location: "login",
		});
		context.res.end();
	}

	return { props: { session } };
}
