/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuilds } from "@api/discord";
import { Box, Divider, Flex, Heading, Image } from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import { setCookie } from "@lib/cookie";
import { getSession } from "next-auth/client";
import { useState } from "react";
import { DiscordUser } from "types";

export default function Index({
	session,
	guilds,
	guild_id,
}: {
	guild_id: string;
	guilds: any;
	session: DiscordUser;
}): JSX.Element {
	const [guildCookie, setGuildCookie] = useState(guild_id);
	return (
		<Layout session={session}>
			<Box maxW="600px" w="100%">
				{guilds.length > 0 ? (
					guilds.map((guild: any) => {
						if (guild.permissions & (1 << 3)) {
							return (
								<Box key={guild.id}>
									<Flex
										justify="space-between"
										align="center"
										my={5}
										flexDir={{
											base: "column",
											sm: "row",
										}}
										// key={guild.id}
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
													guild.icon?.startsWith("a_")
														? "gif"
														: "png"
												}`}
												fallbackSrc="/oss.png"
												w={20}
												rounded="50%"
												mr={{ base: 0, sm: 5 }}
											/>
											<Heading
												size="md"
												my={5}
												textAlign="center"
											>
												{guild.name}
											</Heading>
										</Flex>
										{/* {guild.nano ? (
									
								) : (
									<Button
										onClick={() => {
											void router.push("");
										}}
									>
										Invite Nano
									</Button>
						);
					} */}
										{guild.id === guildCookie ? (
											<Heading size="lg">Editing</Heading>
										) : (
											<Button
												onClick={() => {
													setCookie(
														"guild",
														guild.id,
														1
													);
													setGuildCookie(guild.id);
												}}
											>
												Edit Guild
											</Button>
										)}
									</Flex>
									<Divider
										display={{ base: "block", sm: "none" }}
									/>
								</Box>
							);
						}
					})
				) : (
					<Heading>Looks like you are not admin a guild</Heading>
				)}
			</Box>
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
