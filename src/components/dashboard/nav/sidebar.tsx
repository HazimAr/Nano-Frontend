/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Divider, Flex, Heading, HStack, Image, Spacer, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaMedal, FaPen } from 'react-icons/fa';
import { GiAbstract039, GiCirclingFish, GiToggles, GiSwordSmithing, GiBackwardTime, GiBearFace, GiInfo, GiIncomingRocket, GiDoubleDragon, GiSlashedShield, GiImpLaugh } from 'react-icons/gi';
import { HiOutlineCollection } from 'react-icons/hi';
import { Logo } from './logo';
import { NavLink } from './navlink';
import { UserProfile } from './userprofile';
import { SERVER_URL } from 'config';

export function Sidebar(props): JSX.Element {
	const { session, authedGuilds } = props;
	const router = useRouter();
	const guild_id = router?.query?.id;

	const [guild, setGuild] = useState(null);

	// useEffect(() => {
	// 	axios
	// 		.get(`${DISCORD_BASE_URL}/users/@me/guilds`, {
	// 			headers: {
	// 				authorization: `Bearer ${session.accessToken}`,
	// 			},
	// 		})
	// 		.then(({ data }) => {
	// 			setGuild(data.find((g) => g.id === guild_id));

	// 			// guild = data;
	// 		});
	// }, []);

	return (
		<Box>
			<Flex bg="red_black.gray" direction="column" borderWidth="0px" width="325px" position="fixed" {...props}>
				<Flex direction="column" flex="1" py="8" px="10" overflowY="auto">
					<Logo />

					{/* <Box mb="6">
					<SearchField />
				</Box> */}

					<Stack spacing="6" as="nav" aria-label="Sidebar Navigation">
						<Stack spacing="1">
							<HStack justify="center">
								<Image src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${guild?.icon?.startsWith('a_') ? 'gif' : 'png'}`} w="50px" rounded="50%" />
								<Heading size="md" textAlign="center">
									{guild?.name}
									...Guild Image
								</Heading>
							</HStack>
							<UserProfile session={session} />
							<NavLink label="osu!" icon={GiAbstract039} href={`/dashboard/${guild_id}/groups/osu`} />
							<NavLink label="Utility" icon={HiOutlineCollection} href={`/dashboard/${guild_id}/groups/util`} />
							<NavLink label="Anime" icon={GiCirclingFish} href={`/dashboard/${guild_id}/groups/anime`} />
							<NavLink label="Coming Soon" icon={GiIncomingRocket} href={`/dashboard/${guild_id}/groups/coming_soon`} />
							<NavLink label="Info" icon={GiInfo} href={`/dashboard/${guild_id}/groups/info`} />
							<NavLink label="Games" icon={GiDoubleDragon} href={`/dashboard/${guild_id}/groups/games`} />
							<NavLink label="Guild" icon={GiSlashedShield} href={`/dashboard/${guild_id}/groups/guild`} />
							<NavLink label="Role Playing" icon={GiImpLaugh} href={`/dashboard/${guild_id}/groups/role_playing`} />
							<NavLink label="Coming Soon" icon={GiIncomingRocket} href={`/dashboard/${guild_id}/groups/coming_soon`} />
							<Divider />
							<NavLink label="Leaderboards" icon={FaMedal} href="/leaderboards" />
							<Divider />
							<NavLink label="Reaction Roles" icon={GiBearFace} href="/reaction" />
							<NavLink label="Timers" icon={GiBackwardTime} href={`/dashboard/${guild_id}/timers`} />
							<NavLink label="Edit Guild" icon={FaPen} href="" />
							<NavLink label="Premium" icon={FaPen} href="/dashboard/premium" />
							<NavLink label="Custom Commands" icon={GiSwordSmithing} href="/custom" />
							<NavLink label="Nano Commands" icon={GiToggles} href="/commands" />
						</Stack>
					</Stack>
					<Spacer />
				</Flex>
			</Flex>
			<Box h="100vh" w="225px" display={{ base: 'none', md: 'block' }} />
		</Box>
	);
}
