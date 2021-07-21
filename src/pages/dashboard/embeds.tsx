/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuildChannels } from "@api/server";
import { Box, Flex, Text } from "@chakra-ui/react";
import CreateEmbed from "@components/dashboard/embeds/createEmbed";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Custom({
	session,
	channels,
}: {
	channels: any[];
	session: DiscordUser;
}): JSX.Element {
	return (
		<Layout session={session}>
			<Box>
				<CreateEmbed />

				{channels.map((channel) => {
					return (
						<Flex key={channel.id}>
							<Text>#</Text>
							<Text mx={5}>{channel.name}</Text>
							<Text>{channel.category}</Text>
						</Flex>
					);
				})}
			</Box>
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

	const channels = await getGuildChannels(guild_id, session.accessToken);

	return { props: { session, channels } };
}
