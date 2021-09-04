/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Heading, Stack, Text } from '@chakra-ui/react';
import CreateCustom from '@components/dashboard/custom/createCustom';
import YourCommands from '@components/dashboard/custom/yourCommands';
import Layout from '@components/dashboard/layout';
import { getSession } from 'next-auth/client';

// --------- 🚚 🚚 🚚 🚚 🚚 🚚 🚚 🚚 ---------
export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	const { guild_id } = context.req.cookies;

	const api_response = await defaultPostRequest('g/custom_commands', guild_id, session.accessToken);

	return { props: { session, api_response, guild_id } };
}
// ------------------------------------------------------

export default function Custom({ session, api_response, guild_id }): JSX.Element {
	const { customCommands, premium } = api_response;

	const commands = customCommands
		? Object.keys(customCommands).map((command_id) => {
				const command = customCommands[command_id];
				command.command_id = command_id;
				return command;
		  })
		: [];

	const allCommands = commands.map((command) => {
		return command.trigger;
	});

	let id;
	try {
		Object.keys(customCommands).forEach((commandId) => {
			if (!customCommands[commandId]) {
				return (id = parseInt(commandId));
			}
			if (Object.keys(customCommands).indexOf(commandId) === Object.keys(customCommands).length - 1) {
				return (id = parseInt(commandId) + 1);
			}
		});

		id = Object.keys(customCommands).length + 1;
	} catch {
		id = 1;
	}

	return (
		<Layout session={session}>
			<Stack w="100%">
				<Heading>Custom Commands</Heading>
				<Text>Set a custom command so when you type "-myCustomCommand" the bot will respond with a customizable message.</Text>
				<CreateCustom guild={api_response} commands={allCommands} token={session.accessToken} guild_id={guild_id} command_id={id} commandsLength={commands.length} premium={premium} />
				<YourCommands guild={api_response} commands={commands} token={session.accessToken} />
			</Stack>
		</Layout>
	);
}
