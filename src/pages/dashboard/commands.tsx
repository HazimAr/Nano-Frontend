/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getNanoCommands } from "@api/server";
import { Heading, Stack } from "@chakra-ui/react";
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
			<Stack w="100%">
				<Heading>Enable and Disable Commands</Heading>
				<Commands commands={commands} />
			</Stack>
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
	if (!context.req.cookies.guild) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session } };
	}

	const guild_id = context.req.cookies.guild;
	const commands = await getNanoCommands(guild_id);

	return { props: { session, commands } };
}
