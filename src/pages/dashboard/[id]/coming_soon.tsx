/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Heading, Stack } from '@chakra-ui/react';
import { CommandSection } from '@components/dashboard/commands/CommandSection';
import Layout from '@components/dashboard/layout';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';

export default function Coming_Soon({ session, data, guild_id }: { session: DiscordUser; commands: any; guild_id: string }): JSX.Element {
	console.log(data);
	const { commands } = data;
	return (
		<Layout session={session}>
			<Stack spacing={3} flexDir="column" maxW="1200px" w="100%">
				<Heading textAlign="center">Enable and Disable Coming Soon Commands</Heading>
				<CommandSection commands={commands} />
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}
	if (!context.req.url.split('/')[2]) {
		context.res.writeHead(307, {
			Location: '/dashboard',
		});
		context.res.end();
		return { props: { session } };
	}

	const [, , guild_id] = context.req.url.split('/');
	const data = await defaultPostRequest('g/groups/coming_soon', guild_id, session.accessToken);

	return { props: { session, data, guild_id } };
}
