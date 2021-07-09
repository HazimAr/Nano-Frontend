/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuildChannels } from "@api/discord";
import CreateEmbed from "@components/dashboard/embeds/createEmbed";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Custom({
	session,
	guild_id,
	channels,
}: {
	guild_id: string;
	channels: any[];
	session: DiscordUser;
}): JSX.Element {
	console.log(guild_id);
	console.log(channels);
	return (
		<Layout session={session}>
			<CreateEmbed />
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

	const guild_id = context.req.cookies.guild;

	if (!guild_id) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session, guild_id } };
	}

	// @ts-expect-error i checked already exists
	const channels = await getGuildChannels(guild_id, session.accessToken);

	return { props: { session, channels, guild_id } };
}
