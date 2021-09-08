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

	const api_response = await defaultPostRequest('g/groups/role_playing', cookies.guild_id, session.accessToken);

	return { props: { session, api_response, cookies } };
}
//
//
export default function RP({ session, api_response, cookies }: { session: DiscordUser; api_response: any; guild_id: string; cookies: any }): JSX.Element {
	const { guild_id } = cookies ?? {};
	return <RP2 key={guild_id} session={session} api_response={api_response} cookies={cookies} guild_id={guild_id} />;
}
//
//
export function RP2({ session, api_response, guild_id, cookies }: { session: DiscordUser; api_response: any; guild_id: string; cookies: any }): JSX.Element {
	const { commands } = api_response;
	const [positive, neutral, negative] = commands;

	return (
		<Layout session={session} cookies={cookies}>
			<Stack spacing="45px" flexDir="column">
				<CommandSection session={session} guild_id={guild_id} title="Positive" commands={positive} />
				<CommandSection session={session} guild_id={guild_id} title="Neutral" commands={neutral} />
				<CommandSection session={session} guild_id={guild_id} title="Negative" commands={negative} />
			</Stack>
		</Layout>
	);
}
