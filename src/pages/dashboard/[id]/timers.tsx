/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Layout from '@components/dashboard/layout';
import { Timer } from '@components/dashboard/timers/timer';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';

export default function Timers({ session, api_response, guild_id }: { session: DiscordUser; api_response: any; guild_id: string }): JSX.Element {
	const { guild, categories } = api_response ?? {};

	const arr = [];
	let timer_len = 0;
	let next_id = 1;

	for (let i = 1; i < 6; i++) {
		if (guild?.timers?.[i]?.message) {
			guild.timers[i].timer_id = i;
			arr.push(guild.timers[i]);
			timer_len++;
		} else {
			arr.push({ not_set: true, timer_id: i });
			next_id = i;
		}
	}
	arr.reverse();

	return (
		<Layout session={session}>
			<Stack spacing={5} w="100%" mt="50px" px="50px">
				<HStack justify="space-between">
					<Heading>Timers</Heading>
					<Text>
						{timer_len}/{guild.premium === 0 ? 1 : 5}
					</Text>
				</HStack>
				<Text>Timers sent every x minutes in a Discord channel.</Text>

				<Box>
					{arr.map((timer) => (
						<Timer key={timer.message} timer={timer} guild_id={guild_id} token={session.accessToken} categories={categories} />
					))}
				</Box>
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	const guild_id = context.params.id;

	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	const api_response = await defaultPostRequest('g/timers', guild_id, session.accessToken);

	return { props: { session, api_response, guild_id } };
}
