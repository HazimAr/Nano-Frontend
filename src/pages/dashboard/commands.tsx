/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center } from "@chakra-ui/react";
import Commands from "@components/dashboard/commands/commands";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function NanoCommands({
	session,
	commands,
}: {
	session: DiscordUser;
	commands: any;
}): JSX.Element {
	return (
		<Layout session={session}>
			<Center>
				<Commands commands={commands} />
			</Center>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
		return { props: { session } };
	}
	const commands = [];

	return { props: { session, commands } };
}
