/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuildEmojis } from "@api/server";
import Layout from "@components/dashboard/layout";
import EmojiPicker from "@components/emojiPicker";
import { getSession } from "next-auth/client";
import { useState } from "react";
import { DiscordUser } from "types";

export default function Custom({
	session,
	custom,
}: {
	session: DiscordUser;
	custom: any[];
}): JSX.Element {
	const [emoji, setEmoji] = useState() as any;

	return (
		<Layout session={session}>
			<EmojiPicker setParentState={setEmoji} custom={custom} />
			{emoji?.native}
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

	if (!context.req.cookies.guild) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session } };
	}

	const guild_id = context.req.cookies.guild;
	const custom = await getGuildEmojis(guild_id, session.accessToken);

	return { props: { session, custom } };
}
