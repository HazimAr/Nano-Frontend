/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Stack } from '@chakra-ui/react';
import { CommandSection } from '@components/dashboard/commands/CommandSection';
import Layout from '@components/dashboard/layout';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';

export default function Coming_Soon({ session, data, guild_id }: { session: DiscordUser; commands: any; guild_id: string }): JSX.Element {
	const { commands } = data;
	return (
		<Layout session={session}>
			<Stack spacing={3} flexDir="column" maxW="1200px" w="100%">
				<CommandSection title="Coming Soon" commands={commands} />
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(307, { Location: '/' });
		context.res.end();
		return { props: { session } };
	}

	const guild_id = context.params.id;
	const data = await defaultPostRequest('g/groups/coming_soon', guild_id, session.accessToken);
	return { props: { session, data, guild_id } };
}
