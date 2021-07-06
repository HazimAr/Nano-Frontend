/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { getGuilds } from "@api/discord";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import { setCookie } from "@lib/cookie";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Index({
	session,
	guilds,
}: {
	guilds: any;
	session: DiscordUser;
}): JSX.Element {
	return (
		<Layout session={session}>
			{guilds ? (
				<Box maxW="600px" w="100%">
					{guilds.map((guild: any) => {
						if (guild.permissions & (1 << 3)) {
							return (
								<Flex
									justify="space-between"
									align="center"
									my={5}
									flexDir={{
										base: "column",
										md: "row",
									}}
								>
									<Flex
										align="center"
										flexDir={{
											base: "column",
											sm: "row",
										}}
										justify="center"
									>
										<Image
											src={`https://cdn.discordapp.com/icons/${
												guild.id
											}/${guild.icon}.${
												guild.icon.startsWith("a_")
													? "gif"
													: "png"
											}`}
											w={20}
											rounded="50%"
											mr={{ base: 0, sm: 5 }}
										/>
										<Text>{guild.name}</Text>
									</Flex>
									<Button
										onClick={() => {
											setCookie("guild", guild.id, 30);
										}}
									>
										Edit guild
									</Button>
								</Flex>
							);
						}
					})}
				</Box>
			) : (
				<Heading>You are being rate limited</Heading>
			)}
		</Layout>
	);
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
		props: {
			session,
			// guilds,
		},
	};
}
