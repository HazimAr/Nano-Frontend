/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Index({
	session,
	guilds,
}: {
	guilds: any;
	session: DiscordUser;
}): JSX.Element {
	return <Layout session={session}>{guilds}</Layout>;
}

export async function getServerSideProps(context: any) {
	// @ts-ignore
	const session: DiscordUser | null = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
	}
	// @ts-ignore
	// const guilds = await getGuilds(session.accessToken);
	return {
		props: { session },
	};
	// guilds } };
}
