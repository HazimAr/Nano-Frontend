/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuildChannels, getGuildTimers } from "@api/server";
import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import CreateTimerForm from "@components/dashboard/timers/createTimerForm";
import Timers from "@components/dashboard/timers/timers";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Custom({
	session,
	categories,
	guild_id,
	guildTimers,
}: {
	session: DiscordUser;
	categories: any;
	guild_id: string;
	guildTimers: any;
}): JSX.Element {
	let tempId = "1";
	const timers = guildTimers.timers
		? Object.keys(guildTimers.timers)
				.map((timerId) => {
					console.log(guildTimers.timers[timerId]);
					if (timerId === "bump") return;
					const timer = guildTimers.timers[timerId];
					timer.timer_id = timerId;
					tempId = (parseInt(timerId) + 1).toString();
					return timer;
				})
				.filter((timer) => timer != undefined)
		: [];
	return (
		<Layout session={session}>
			<Stack spacing={5}>
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
				/>
				{timers.length ? (
					<Timers
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

	const guildTimers = await getGuildTimers(guild_id, session.accessToken);
	const categories = await getGuildChannels(guild_id, session.accessToken);
	return { props: { session, categories, guild_id, guildTimers } };
}
