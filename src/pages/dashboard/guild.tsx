/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDiscordGuild, getMongoGuild } from "@api/server";
import { Image } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Custom({
	session,
	guild_id,
	discordGuild,
	mongoGuild,
}: {
	session: DiscordUser;
	guild_id: string;
	discordGuild: any;
	mongoGuild: any;
}): JSX.Element {
	console.log(discordGuild);
	console.log(mongoGuild);
	return (
		<Layout session={session}>
			<Image
				src={`https://cdn.discordapp.com/icons/${discordGuild.id}/${
					discordGuild.icon
				}.${discordGuild.icon?.startsWith("a_") ? "gif" : "png"}`}
				fallbackSrc="/oss.png"
				w={20}
				rounded="50%"
				mx={{ base: 0, sm: 5 }}
			/>
			{discordGuild.name ? discordGuild.name : "no guild found"}
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

	if (!context.req.cookies.guild) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session } };
	}

	const guild_id = context.req.cookies.guild;
	// @ts-ignore
	const discordGuild = await getDiscordGuild(guild_id);
	const mongoGuild = await getMongoGuild(guild_id);
	return {
		props: {
			session,
			discordGuild,
			mongoGuild,
			guild_id,
		},
	};
}
