/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { default_user_post_request } from '@api/server';
import { Avatar, Box, Button, Flex, Grid, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import Layout from '@components/guild/layout';
import NextChakraLink from '@components/nextChakraLink';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';
import { Level } from '@components/guild/profile/level';
import { useState } from 'react';
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

	const { user_id } = context.req.cookies;
	const user = await default_user_post_request('u/profile', user_id, session.accessToken);

	return {
		props: {
			session,
			user,
			user_id: user_id ?? null,
			cookies: context.req.cookies,
		},
	};
}
// ------------------------------------------------------
//
export default function User({ session, user, user_id, cookies }: { session: DiscordUser; user: any; user_id: string; cookies: any }): JSX.Element {
	const { discordUser = {}, fruits, mania, mongoUserObject = {}, osu, taiko } = user ?? {};
	const { avatarURL, tag } = discordUser;
	const { guilds, inventory, tokens, nextLvlPercent } = mongoUserObject;

	return (
		<Layout session={session} cookies={cookies}>
			<VStack pos="relative" w="100%">
				{/* Banner */}
				<Box pos="relative" w="100%" h="300px">
					<Image pos="absolute" w="100%" h="300px" objectFit="cover" objectPosition="0px -150px" src="https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700865452.jpg" />
					<VStack w="100%" h="100%" style={{ marginTop: 0, paddingTop: 15 }} pos="relative" bg="hsl(0, 0%, 0%, .6)">
						<HStack w="100%" h="100%" pl="200">
							<HStack>
								<Image style={{ display: 'block' }} w="auto" h="50%" src={avatarURL} borderRadius="50%" />
								<Text fontSize="26px">{tag}</Text>
								<Level user={nextLvlPercent} />
							</HStack>
							<HStack>
								<Image style={{ display: 'block' }} w="auto" h="50%" src={avatarURL} borderRadius="50%" />
								<Text fontSize="26px">{tag}</Text>
								<Level user={nextLvlPercent} />
							</HStack>
						</HStack>
						<Box>
							<Button w="15px" onClick={() => console.log(user)} />
						</Box>
					</VStack>
				</Box>
				{/*  */}
				<Stack spacing="45px" flexDir="column" maxW="1200px" w="100%">
					<Box bg="whatsapp.800" mt="50px" borderRadius="10px" p="10px">
						<Button display="none" w="15px" onClick={() => console.log(user)} />
						<HStack>
							<Image w="150px" src={avatarURL} borderRadius="50%" />
							<Text fontSize="26px">{tag}</Text>
							<Level user={nextLvlPercent} />
						</HStack>
					</Box>
					<Box bg="whatsapp.800" mt="50px" borderRadius="10px" p="10px">
						<Button w="15px" onClick={() => console.log(user)} />
						<HStack>
							<Image w="150px" src={avatarURL} borderRadius="50%" />
							<Text fontSize="26px">{tag}</Text>
							<Level user={nextLvlPercent} />
						</HStack>
					</Box>
					<Box bg="whatsapp.800" mt="50px" borderRadius="10px" p="10px">
						<Button w="15px" onClick={() => console.log(user)} />
						<HStack>
							<Image w="150px" src={avatarURL} borderRadius="50%" />
							<Text fontSize="26px">{tag}</Text>
							<Level user={nextLvlPercent} />
						</HStack>
					</Box>
				</Stack>
			</VStack>
		</Layout>
	);
}
