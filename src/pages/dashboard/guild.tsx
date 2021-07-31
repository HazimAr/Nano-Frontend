/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuilds } from "@api/discord";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Custom({
	session,
	guild_id,
	guilds,
}: {
	session: DiscordUser;
	guild_id: string;
	guilds: any[];
}): JSX.Element {
	let guild: any = {};
	guilds.forEach((g) => {
		if (g.id === guild_id && g.permissions & (1 << 8)) {
			guild = g;
			return;
		}
		if (guilds.indexOf(g) === guilds.length - 1) {
			// Reach the end of the array, but the guild was not found
		}
	});
	return (
		<Layout session={session}>
			{guild.name ? guild.name : "no guild found"}
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	if (!session?.accessToken) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
		return { props: { session } };
	}

	// @ts-ignore
	const guilds = await getGuilds(session?.accessToken);
	return {
		props: {
			session,
			guilds,
			guild_id: context.req.cookies.guild || null,
		},
	};
}
