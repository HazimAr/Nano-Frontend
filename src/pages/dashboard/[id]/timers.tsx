/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Box, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Layout from '@components/dashboard/layout';
import { CreateTimerForm } from '@components/dashboard/timers/createTimerForm';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';
import { Timer } from '@components/dashboard/timers/timer';

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
			<Stack spacing={5} w="100%">
				<Heading>Timers</Heading>
				<Text>Timers sent every x minutes in a Discord channel.</Text>
				{/* // Add Timer Button */}
				<CreateTimerForm categories={categories} session={session} guild_id={guild_id} timer_id={next_id.toString()} timerLength={timer_len} premium={guild.premium} />
				{/* // ---------------- */}
				<HStack justify="space-between">
					<Heading size="md">Your Timers</Heading>
					<Heading size="md">
						{timer_len}/{guild.premium === 0 ? 1 : 5}
					</Heading>
				</HStack>
				<Divider my={5} />
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

	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}
	const guild_id = context.params.id;
	const api_response = await defaultPostRequest('g/timers', guild_id, session.accessToken);

	return { props: { session, api_response, guild_id } };
}
