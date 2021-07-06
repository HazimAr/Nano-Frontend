/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuilds } from "@api/discord";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import { setCookie } from "@lib/cookie";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
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
	const router = useRouter();
	return (
		<Layout session={session}>
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
								key={guild.id}
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
									<Heading size="md" my={5}>
										{guild.name}
									</Heading>
								</Flex>

								{guild.id === guild_id ? (
									<Heading size="lg">Editing</Heading>
								) : (
									<Button
										onClick={() => {
											setCookie("guild", guild.id, 30);
											
											void router.push("");
										}}
									>
										Edit Guild
									</Button>
								)}
							</Flex>
						);
					}
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
	}

	// @ts-ignore
	const guilds = await getGuilds(session.accessToken);
	return {
		props: {
			session,
			guilds,
			guild_id: context.req.cookies.guild,
		},
	};
}
