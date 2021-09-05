/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Stack } from '@chakra-ui/react';
import { CommandSection } from '@components/dashboard/commands/CommandSection';
import Layout from '@components/dashboard/layout';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';
//
// --------- 🚚 🚚 🚚 🚚 🚚 🚚 🚚 🚚 ---------
export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	const { cookies } = context.req;

	if (!session) {
		context.res.writeHead(307, { Location: '/' });
		context.res.end();
		return { props: { session } };
	}

	const api_response = await defaultPostRequest('g/groups/guild', cookies.guild_id, session.accessToken);

	return { props: { session, api_response, cookies } };
}
//
//
export default function Guild({ session, api_response, cookies }: { session: DiscordUser; api_response: any; guild_id: string; cookies: any }): JSX.Element {
	const { guild_id } = cookies ?? {};
	return <Guild2 key={guild_id} session={session} api_response={api_response} cookies={cookies} guild_id={guild_id} />;
}
//
//
export function Guild2({ session, api_response, guild_id, cookies }: { session: DiscordUser; api_response: any; guild_id: string; cookies: any }): JSX.Element {
	const { commands } = api_response;
	return (
		<Layout session={session} cookies={cookies}>
			<Stack spacing="45px" flexDir="column" maxW="1200px" w="100%">
				<CommandSection session={session} guild_id={guild_id} commands={commands} title="Guild" />
			</Stack>
		</Layout>
	);
}
