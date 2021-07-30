/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getGuilds } from "@api/discord";
import {
	Box,
	Divider,
	Flex,
	Heading,
	HStack,
	Image,
	Stack,
	VStack,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakra";
import { setCookie } from "@lib/cookie";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
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
	const router = useRouter();
	return (
		<Layout session={session}>
			<Stack maxW="800px" w="100%" spacing={3}>
				{guilds.length > 0 ? (
					guilds
						.sort((a: any, b: any) => {
							if (a.nano === b.nano) {
								return a.name === b.name
									? 0
									: a.name > b.name
									? 1
									: -1;
							}
							return b.nano - a.nano;
						})
						.map((guild: any) => {
							return (
								<Box key={guild.id}>
									<HStack
										justify={{
											base: "center",
											sm: "flex-start",
										}}
										align="center"
										spacing={0}
										flexDir={{
											base: "column",
											sm: "row",
										}}
										// key={guild.id}
									>
										<VStack
											spacing={0}
											justify="flex-start"
										>
											{guild.nano ? (
												guild.id === guildCookie ? (
													<Heading size="md">
														Selected
													</Heading>
												) : (
													<Button
														onClick={() => {
															setCookie(
																"guild",
																guild.id,
																7
															);
															setGuildCookie(
																guild.id
															);
														}}
													>
														Select
													</Button>
												)
											) : (
												<Button
													onClick={() => {
														void router.push(
															`https://discord.com/api/oauth2/authorize?client_id=783539062149087262&permissions=8&scope=bot&guild_id=${guild.id}`
														);
													}}
													mt={3}
													mb={3}
													bg="#fff"
												>
													Invite
												</Button>
											)}
											<NextChakraLink
												href="/dashboard/guild"
												display={
													guild.permissions & (1 << 8)
														? "block"
														: "none"
												}
											>
												<Button>Edit</Button>
											</NextChakraLink>
										</VStack>
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
												mx={{ base: 0, sm: 5 }}
											/>
											<Heading
												size="md"
												my={{ base: 3, sm: 5 }}
												textAlign="center"
											>
												{guild.name}
											</Heading>
										</Flex>
									</HStack>
									<Divider
										mt={2}
										// display={{ base: "block", sm: "none" }}
									/>
								</Box>
							);
						})
				) : (
					<Heading>Looks like you are not in any guilds</Heading>
				)}
			</Stack>
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
