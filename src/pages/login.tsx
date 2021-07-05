/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Center } from "@chakra-ui/react";
import Button from "@components/button";
import { getSession, signIn } from "next-auth/client";

export default function login(): JSX.Element {
	return (
		<Center h="100vh">
			<Box>
				<Button
					onClick={() => {
						signIn("discord");
					}}
				>
					Login with Discord
				</Button>
			</Box>
		</Center>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	console.log(session);
	if (session) {
		context.res.writeHead(307, {
			Location: "dashboard",
		});
		context.res.end();
	}
	return { props: {} };
}
