/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuildTimers } from "@api/server";
import {
	Center,
	Divider,
	Heading,
	HStack,
	Stack,
	Text,
} from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import CreateTimerForm from "@components/dashboard/timers/createTimerForm";
import TimersList from "@components/dashboard/timers/timers";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Timers({
	session,
	guild_id,
	server,
}: {
	session: DiscordUser;
	guild_id: string;
	server: any;
}): JSX.Element {
	const guild = server.guild;
	const categories = server.categories;

	console.log(guild);
	const timers = guild.timers?.[1]
		? Object.keys(guild.timers)
				.map((timerId) => {
					if (timerId === "bump") return;
					const timer = guild.timers[timerId];
					timer.timer_id = timerId;
					return timer;
				})
				.filter((timer) => timer != undefined)
		: [];

	let tempId = (timers.length + 1).toString();

	return (
		<Layout session={session}>
			<Stack spacing={5} w="100%">
				<Heading>Timers</Heading>
				<Text>
					Timers are messages sent every x time in a specific channel.
					They're useful when you want to give reminders for example.
				</Text>
				<CreateTimerForm
					categories={categories}
					session={session}
					guild_id={guild_id}
					timer_id={tempId}
					timerLength={timers.length}
					premium={guild.premium}
				/>
				<HStack justify="space-between">
					<Heading size="md">Your Timers</Heading>
					<Heading size="md">
						{timers.length}/{guild.premium === 0 ? 1 : 5}
					</Heading>
				</HStack>
				<Divider my={5} />
				{timers.length ? (
					<TimersList
						timers={timers}
						guild_id={guild_id}
						token={session.accessToken}
						categories={categories}
					/>
				) : (
					<Center
						style={{ outlineStyle: "dashed", outlineWidth: 2 }}
						color="grey"
						py={5}
					>
						<Text color="white" mx={5}>
							You don't have any timers right now. Click on the
							"Add Timer" button to add one.
						</Text>
					</Center>
				)}
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	if (!session) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
		return { props: { session } };
	}

	const guild_id = context.req.cookies.guild ?? "";

	if (!guild_id) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session, guild_id } };
	}

	const server = await getGuildTimers(guild_id, session.accessToken);

	return {
		props: {
			session,
			server,
			guild_id,
		},
	};
}
