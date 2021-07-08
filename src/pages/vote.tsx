/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { getId } from "@api/discord";
import { getUser } from "@api/server";
import { Flex, Stack, Text } from "@chakra-ui/react";
import Button from "@components/button";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import HeadFoot from "@components/home/headfoot";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { DiscordUser } from "types";

export default function Vote({
	session,
	timers,
}: {
	session: DiscordUser;
	timers: any;
}): JSX.Element {
	return (
		<HeadFoot session={session}>
			<Container bg="bg.secondary">
				<ContainerInside>
					<Stack>
						<Voting
							name="Nano"
							time={timers.nextNano}
							link="https://top.gg/bot/783539062149087262/vote"
							session={session}
						/>
						<Voting
							name="Nano Server"
							time={timers.nextBaka}
							link="https://top.gg/servers/199325828843044865/vote"
							session={session}
						/>
						<Voting
							name="Nano Emojis"
							time={timers.nextEmoji}
							link="https://top.gg/servers/768552664677220372/vote"
							session={session}
						/>
					</Stack>
				</ContainerInside>
			</Container>
		</HeadFoot>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	// @ts-expect-error nope
	const id = await getId(session?.accessToken);
	const { timers } = await getUser(id);
	return { props: { session, timers } };
}

function Voting({ name, link, time, session }: any): JSX.Element {
	const router = useRouter();
	const now = Date.now();
	console.log(time);
	return (
		<Flex justify="center">
			<Text>{name}</Text>
			{session ? (
				now >= time ? (
					<Button
						onClick={() => {
							void router.push(link);
						}}
					>
						Vote
					</Button>
				) : (
					<Text>You can vote in {time - now}ms</Text>
				)
			) : (
				<Button
					onClick={() => {
						void router.push(link);
					}}
				>
					Vote
				</Button>
			)}
		</Flex>
	);
}
