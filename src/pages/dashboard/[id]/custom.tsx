/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCustomCommands } from "@api/server";
import { Heading, Stack, Text } from "@chakra-ui/react";
import CreateCustom from "@components/dashboard/custom/createCustom";
import YourCommands from "@components/dashboard/custom/yourCommands";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";

export default function Custom({ session, guild, guild_id }): JSX.Element {
	const commands = guild.customCommands
		? Object.keys(guild.customCommands).map((command_id) => {
				const command = guild.customCommands[command_id];
				command.command_id = command_id;
				return command;
		  })
		: [];
	const allCommands = commands.map((command) => {
		return command.trigger;
	});
	let id;
	try {
		Object.keys(guild.customCommands).forEach((commandId) => {
			if (!guild.customCommands[commandId]) {
				return (id = parseInt(commandId));
			}
			if (
				Object.keys(guild.customCommands).indexOf(commandId) ===
				Object.keys(guild.customCommands).length - 1
			) {
				return (id = parseInt(commandId) + 1);
			}
		});

		id = Object.keys(guild.customCommands).length + 1;
	} catch {
		id = 1;
	}
	return (
		<Layout session={session}>
			<Stack w="100%">
				<Heading>Custom Commands</Heading>
				<Text>
					Set a custom command so when you type "-myCustomCommand" the
					bot will respond with a customizable message.
				</Text>
				<CreateCustom
					guild_id={guild_id}
					token={session.accessToken}
					guild={guild}
					command_id={id}
					commands={allCommands}
					commandsLength={commands.length}
					premium={guild.premium}
				/>
				<YourCommands
					guild={guild}
					commands={commands}
					token={session.accessToken}
				/>
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
	if (!context.req.url.split("/")[2]) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session } };
	}

	const guild_id = context.req.url.split("/")[2];

	const guild = await getCustomCommands(guild_id, session.accessToken);

	return { props: { session, guild, guild_id } };
}
