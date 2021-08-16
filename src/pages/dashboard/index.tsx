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
import Container from "@components/container";
import HeadFoot from "@components/home/headfoot";
import NextChakraLink from "@components/nextChakra";
import { setCookie } from "@lib/cookie";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { DiscordUser } from "types";

export default function Index({
	session,
	guilds,
}: {
	session: DiscordUser;
	guilds: any;
}): JSX.Element {
	const router = useRouter();
	return (
		<HeadFoot session={session}>
			<Container>
				<Stack maxW="800px" w="100%" spacing={3}>
					{guilds.length > 0 ? (
						guilds
							.sort((a: any, b: any) => {
								if (a.status === b.status) {
									return a.guild.name === b.guild.name
										? 0
										: a.guild.name > b.guild.name
										? 1
										: -1;
								}
								return a.status.length - b.status.length;
								// return a.status.length - b.status.length;
							})
							.map((guildObject: any) => {
								const guild = guildObject.guild;

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
												{guildObject.status !==
												"invite" ? (
													<Button
														onClick={() => {
															setCookie(
																"guild",
																guild.id,
																7
															);

															void router.push(
																`${router.asPath}/${guild.id}`
															);
														}}
														type="secondary"
														mt={3}
														mb={3}
														bg="#fff"
														w="75px"
													>
														Edit
													</Button>
												) : (
													<NextChakraLink
														isExternal
														href={`https://discord.com/api/oauth2/authorize?client_id=783539062149087262&permissions=8&scope=bot&guild_id=${guild.id}`}
													>
														<Button
															mt={3}
															mb={3}
															bg="#fff"
														>
															Invite
														</Button>
													</NextChakraLink>
												)}
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
														guild.icon?.startsWith(
															"a_"
														)
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
						<Heading>
							Looks like you have no permissions to edit any
							guilds
						</Heading>
					)}
				</Stack>
			</Container>
		</HeadFoot>
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

	const guilds = await getGuilds(session.accessToken);
	return {
		props: {
			session,
			guilds,
		},
	};
}
