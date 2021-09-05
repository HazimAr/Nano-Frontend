/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuilds } from '@api/discord';
import { Box, Divider, Flex, Heading, HStack, Image, Stack, VStack } from '@chakra-ui/react';
import Button from '@components/button';
import Layout from '@components/dashboard/layout';
import NextChakraLink from '@components/nextChakra';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
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

	const { authed_guilds_statuses } = await getGuilds(session.accessToken);
	return {
		props: {
			session,
			authed_guilds_statuses,
			cookies: context.req.cookies,
		},
	};
}
//
//
export default function Index({ session, authed_guilds_statuses, cookies }: { session: DiscordUser; authed_guilds_statuses: any; cookies: any }): JSX.Element {
	const router = useRouter();

	return (
		<Layout session={session} cookies={cookies}>
			<Stack maxW="800px" w="100%" spacing={3} pt="50px">
				{authed_guilds_statuses.length > 0 ? (
					authed_guilds_statuses
						.sort((a: any, b: any) => {
							if (a.status === b.status) {
								return a.guild.name === b.guild.name ? 0 : a.guild.name > b.guild.name ? 1 : -1;
							}
							return a.status.length - b.status.length;
							// return a.status.length - b.status.length;
						})
						.map((guildObject: any) => {
							const { guild } = guildObject;

							return (
								<Box key={guild.id}>
									<HStack
										justify={{
											base: 'center',
											sm: 'flex-start',
										}}
										align="center"
										spacing={0}
										flexDir={{
											base: 'column',
											sm: 'row',
										}}
										my="15px"
									>
										<VStack spacing={0} justify="flex-start">
											{guildObject.status === 'invite' ? (
												<NextChakraLink isExternal href={`https://discord.com/api/oauth2/authorize?client_id=783539062149087262&permissions=8&scope=bot&guild_id=${guild.id}`}>
													<Button mt={3} mb={3} bg="#fff">
														Invite
													</Button>
												</NextChakraLink>
											) : (
												<Button
													onClick={() => {
														fetch('/api/set_cookie', {
															method: 'post',
															headers: {
																'Content-Type': 'application/json',
															},
															body: JSON.stringify({ key: 'guild_id', value: guild.id, expire: 2.628e6 }),
														});
														void router.push(`${router.asPath}/${guild.id}`);
													}}
													type="secondary"
													mt={3}
													mb={3}
													bg="#fff"
													w="75px"
												>
													Edit
												</Button>
											)}
										</VStack>
										<Flex
											align="center"
											flexDir={{
												base: 'column',
												sm: 'row',
											}}
											justify="center"
										>
											<Image src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon?.startsWith('a_') ? 'gif' : 'png'}`} fallbacksrc="/oss.png" w={20} rounded="50%" mx={{ base: 0, sm: 5 }} />
											<Heading size="md" my={{ base: 3, sm: 5 }} textAlign="center">
												{guild.name}
											</Heading>
										</Flex>
									</HStack>
								</Box>
							);
						})
				) : (
					<Heading>Looks like you have no permissions to edit any guilds</Heading>
				)}
			</Stack>
		</Layout>
	);
}
