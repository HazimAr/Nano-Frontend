/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDiscordGuild, getMongoGuild } from "@api/server";
import { Avatar, Flex, Heading, HStack, Image, Stack } from "@chakra-ui/react";
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
			<Image />
			<Stack align="center" mt={5} spacing={0}>
				<Flex align="center" w="100%">
					<Avatar
						// size="lg"
						boxSize={{
							base: "75px",
							sm: "125px",
							md: "175px",
						}}
						src={`https://cdn.discordapp.com/icons/${
							discordGuild.id
						}/${discordGuild.icon}.${
							discordGuild.icon?.startsWith("a_") ? "gif" : "png"
						}`}
						fallbackSrc="/oss.png"
						rounded="50%"
						mx={{ base: 0, sm: 5 }}
						name={discordGuild.name}
					/>
					<Heading ml={5}>{discordGuild.name}</Heading>
					{/* <Box mx={3}>
						<Level user={serverUser} guild={guildId} size={75} />
					</Box> */}
				</Flex>
				<HStack
					flexDirection={{ base: "column", sm: "row" }}
					align={{ base: "center", sm: "flex-start" }}
					justify={{ base: "center", sm: "flex-start" }}
					textAlign={{ base: "center", sm: "left" }}
					w="100%"
				>
					<Heading w="100%">Prefix: {mongoGuild.prefix}</Heading>
					<Heading w="100%">Tokens: {mongoGuild.tokens}</Heading>
					<Heading w="100%">Xp: {mongoGuild.xp}</Heading>
					{/* <Text w="100%">
						Votes: {serverUser.votes.all}{" "}
						<Button
							fontSize="6px"
							onClick={() => {
								void router.push("/vote");
							}}
						>
							Vote
						</Button>
					</Text> */}
				</HStack>
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
