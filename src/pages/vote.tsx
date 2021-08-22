/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { getId } from '@api/discord';
import { getUser } from '@api/server';
import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Button from '@components/button';
import Container from '@components/container';
import ContainerInside from '@components/containerInside';
import HeadFoot from '@components/home/headfoot';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';

export default function Vote({ session, timers }: { session: DiscordUser; timers: any }): JSX.Element {
	return (
		<HeadFoot session={session}>
			<Container bg="bg.secondary">
				<ContainerInside>
					<Heading textAlign="center">Help Nano grow by voting</Heading>
					<Stack>
						<Voting name="Nano" time={timers?.nextNano} link="https://top.gg/bot/783539062149087262/vote" session={session} />
						<Voting name="Nano Server" time={timers?.nextBaka} link="https://top.gg/servers/199325828843044865/vote" session={session} />
						<Voting name="Nano Emojis" time={timers?.nextEmoji} link="https://top.gg/servers/768552664677220372/vote" session={session} />
					</Stack>
				</ContainerInside>
			</Container>
		</HeadFoot>
	);
}

export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	let id = null;

	if (session?.accessToken) {
		id = await getId(session?.accessToken);
	}

	let timers = null;
	// @ts-ignore
	if (id) ({ timers } = await getUser(id));

	return { props: { session, timers } };
}

function Voting({ name, link, time, session }: any): JSX.Element {
	const now = Date.now();
	return (
		<Flex justify="space-between">
			<Text>{name}</Text>
			{session ? (
				now >= time ? (
					<a href={link} target="_blank" rel="noreferrer">
						<Button>Vote</Button>
					</a>
				) : (
					<Text>You can vote in {Math.round((time - now) / 60000)} min</Text>
				)
			) : (
				<a href={link} target="_blank" rel="noreferrer">
					<Button>Vote</Button>
				</a>
			)}
		</Flex>
	);
}
