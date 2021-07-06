/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeaderboards } from "@api/server";
import { Text } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Custom({
	session,
	leader,
}: {
	session: DiscordUser;
	leader: any;
}): JSX.Element {
	console.log(leader);
	return (
		<Layout session={session}>
			{leader.lb.map((user: any) => {
				return (
					<Text key={user.discord_id}>
						{user.discord_id}: {user.vote_all}
					</Text>
				);
			})}
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
	}
	if (!context.req.cookies.guild) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session } };
	}
	console.log(context.req.cookies.guild);
	console.log("before");
	const leader = await getLeaderboards(
		// @ts-ignore
		session.accessToken,
		context.req.cookies.guild
	);

	return { props: { session, leader } };
}
