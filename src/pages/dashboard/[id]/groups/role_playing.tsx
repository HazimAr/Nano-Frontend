/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Stack } from '@chakra-ui/react';
import { CommandSection } from '@components/dashboard/commands/CommandSection';
import Layout from '@components/dashboard/layout';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';

export default function Role_Playing({ session, data, guild_id }: { session: DiscordUser; data: any; guild_id: string }): JSX.Element {
	// console.log(data);
	const { commands } = data;
	const [positive, neutral, negative] = commands;

	return (
		<Layout session={session}>
			<Stack spacing="45px" flexDir="column" maxW="1200px" w="100%">
				<CommandSection session={session} guild_id={guild_id} title="Positive" commands={positive} />
				<CommandSection session={session} guild_id={guild_id} title="Neutral" commands={neutral} />
				<CommandSection session={session} guild_id={guild_id} title="Negative" commands={negative} />
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

	const guild_id = context.params.id;
	const data = await defaultPostRequest('g/groups/role_playing', guild_id, session.accessToken);

	return { props: { session, data, guild_id } };
}
