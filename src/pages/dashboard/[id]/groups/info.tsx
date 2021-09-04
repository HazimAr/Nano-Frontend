/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Stack } from '@chakra-ui/react';
import { CommandSection } from '@components/dashboard/commands/CommandSection';
import Layout from '@components/dashboard/layout';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';

export default function Info({ session, data, guild_id, cookies }: { session: DiscordUser; data: any; guild_id: string; cookies: any }): JSX.Element {
	const { commands } = data;
	return (
		<Layout session={session} cookies={cookies}>
			<Stack spacing="45px" flexDir="column" maxW="1200px" w="100%">
				<CommandSection session={session} guild_id={guild_id} commands={commands} title="Info" />
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	if (!session) {
		context.res.writeHead(307, { Location: '/' });
		context.res.end();
		return { props: { session } };
	}

	const { guild_id } = context.req.cookies;
	const data = await defaultPostRequest('g/groups/info', guild_id, session.accessToken);

	return { props: { session, data, guild_id, cookies: context.req.cookies } };
}
