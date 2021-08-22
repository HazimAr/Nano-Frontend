/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Stack } from '@chakra-ui/react';
import { CommandSection } from '@components/dashboard/commands/CommandSection';
import Layout from '@components/dashboard/layout';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { DiscordUser } from 'types';

export default function Osu({ session, data, guild_id, error }: { session: DiscordUser; data: any; guild_id: string; error: boolean }): JSX.Element {
	// if (error)
	// const router = useRouter();
	// router.push({ pathname: '/404', query: { error } });

	const { commands } = data;

	return (
		<Layout session={session}>
			<Stack spacing={3} flexDir="column" maxW="1200px" w="100%">
				<CommandSection session={session} guild_id={guild_id} commands={commands} title="osu!" />
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	let [session, data, err] = [{}, {}, null];
	const guild_id = context.params.id;

	session = await getSession(context);
	data = await defaultPostRequest('g/groups/osu', guild_id, session.accessToken);

	try {
		throw 'testing this';
	} catch (error) {
		err = error;
	}

	if (!session) {
		context.res.writeHead(307, { Location: '/' });
		context.res.end();
		return { props: { session } };
	}

	return { props: { session, data, guild_id, error: err } };
}
