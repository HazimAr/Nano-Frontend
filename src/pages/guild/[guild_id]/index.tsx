/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Avatar, Flex, Grid, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import Layout from '@components/guild/layout';
import NextChakraLink from '@components/nextChakraLink';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';
//
// --------- 🚚 🚚 🚚 🚚 🚚 🚚 🚚 🚚 ---------
export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);

	if (!session?.accessToken) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	const { guild_id } = context.req.cookies;
	const guild = await defaultPostRequest('g/groups/profile', guild_id, session.accessToken);

	return {
		props: {
			session,
			guild,
			guild_id,
			cookies: context.req.cookies,
		},
	};
}
// ------------------------------------------------------
//
export default function Guild({ session, guild, guild_id, cookies }: { session: DiscordUser; guild: any; guild_id: string; cookies: any }): JSX.Element {
	const { discordGuild, mongoGuildObject: mongoGuild = {} } = guild;

	return (
		<Layout session={session} cookies={cookies}>
			<Stack align="center" mt={5} spacing={5}>
				<Flex align="center" w="100%">
					<Avatar
						// size="lg"
						boxSize={{
							base: '75px',
							sm: '125px',
							md: '175px',
						}}
						src={`https://cdn.discordapp.com/icons/${discordGuild.id}/${discordGuild.icon}.${discordGuild.icon?.startsWith('a_') ? 'gif' : 'png'}`}
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
				<HStack flexDirection={{ base: 'column', sm: 'row' }} align={{ base: 'center', sm: 'flex-start' }} justify={{ base: 'center', sm: 'flex-start' }} textAlign={{ base: 'center', sm: 'left' }} w="100%">
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

				<Grid
					templateColumns={{
						base: 'repeat(1, 1fr)',
						sm: 'repeat(2, 1fr)',
					}}
					gap={5}
				>
					<Panel name="Enable / Disable Commands" description="Click on a switch to activate and deactivate certain command nano commands." href={`/guild/${guild_id}/groups/commands`} />

					<Panel name="Custom Commands" description="Set a custom command so when you type -myCustomCommand the bot will respond with a customizable message." href={`/guild/${guild_id}/groups/custom_commands`} />

					<Panel name="Reaction Roles" description="Create a customizable message that when users will react to they will recieve a specified role." href={`/guild/${guild_id}/groups/reaction_roles`} />

					<Panel name="Timers" description="Add Timers to specific channels in your server. On an interval the bot will send a message in that channel." href={`/guild/${guild_id}/timers`} />
				</Grid>
			</Stack>
		</Layout>
	);
}

function Panel({ name, description, href }): JSX.Element {
	return (
		<VStack
			p={5}
			w="100%"
			maxW="400px"
			justify="space-between"
			bg="rgba(0,0,0,0.2)"
			rounded={5}
			transitionTimingFunction="ease"
			transitionDuration=".2s"
			_hover={{
				transform: 'scale(0.9)',
				cursor: 'pointer',
				color: 'brand.secondary',
			}}
		>
			<NextChakraLink href={href}>
				<Heading>{name}</Heading>
				<Text color="grey">{description}</Text>
			</NextChakraLink>
		</VStack>
	);
}
