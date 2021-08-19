/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Divider, Flex, Heading, HStack, Image, Spacer, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { DISCORD_BASE_URL } from 'config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaMedal, FaPen } from 'react-icons/fa';
import {
	GiAbstract039,
	GiCirclingFish,
	GiToggles,
	GiSwordSmithing,
	GiBackwardTime,
	GiBearFace,
	GiInfo,
	GiIncomingRocket,
	GiDoubleDragon,
	GiSlashedShield,
	GiImpLaugh,
} from 'react-icons/gi';
import { HiOutlineCollection } from 'react-icons/hi';
import { Logo } from './logo';
import { NavLink } from './navlink';
import { UserProfile } from './userprofile';

export function Sidebar(props: any): JSX.Element {
	const router = useRouter();
	const guild_id = router.asPath.split('/')[2];

	let [guild, setGuild] = useState(null);
	useEffect(() => {
		axios
			.get(`${DISCORD_BASE_URL}/users/@me/guilds`, {
				headers: {
					authorization: `Bearer ${props.session.accessToken}`,
				},
			})
			.then(({ data }) => {
				setGuild(data.find((g) => g.id === guild_id));

				// guild = data;
			});
	}, []);

	return (
		<Box>
			<Flex bg="linear-gradient(#7549ac 60%, #f6a)" direction="column" borderRightWidth="1px" width="225px" position="fixed" {...props}>
				<Flex direction="column" flex="1" pt="5" pb="4" overflowY="auto" px="4">
					<Box mb="6">
						<Logo />
					</Box>

					{/* <Box mb="6">
					<SearchField />
				</Box> */}

					<Stack spacing="6" as="nav" aria-label="Sidebar Navigation">
						<Divider />

						<Stack spacing="1">
							<HStack justify="center">
								<Image
									src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${
										guild?.icon?.startsWith('a_') ? 'gif' : 'png'
									}`}
									w="50px"
									rounded="50%"
								/>
								<Heading size="md" textAlign="center">
									{guild?.name}
								</Heading>
							</HStack>
							<NavLink label="osu!" icon={GiAbstract039} href="osu" />
							<NavLink label="Reaction Roles" icon={GiBearFace} href="reaction" />
							<NavLink label="Coming Soon" icon={GiIncomingRocket} href="coming_soon" />
							<NavLink label="Utility" icon={HiOutlineCollection} href="util" />
							<NavLink label="Anime" icon={GiCirclingFish} href="anime" />
							<NavLink label="Timers" icon={GiBackwardTime} href="timers" />
							<NavLink label="Coming Soon" icon={GiIncomingRocket} href="coming_soon" />
							<NavLink label="Info" icon={GiInfo} href="info" />
							<NavLink label="Games" icon={GiDoubleDragon} href="games" />
							<NavLink label="Guild" icon={GiSlashedShield} href="guild" />
							<NavLink label="Role Playing" icon={GiImpLaugh} href="role_playing" />
							<Divider />
							<NavLink label="Leaderboards" icon={FaMedal} href="leaderboards" />
							<Divider />
							<NavLink label="Edit Guild" icon={FaPen} href="" />
							{/* <NavLink
								label="Premium"
								icon={FaCrown}
								href="/dashboard/premium"
							/> */}
							<NavLink label="Custom Commands" icon={GiSwordSmithing} href="custom" />
							<NavLink label="Nano Commands" icon={GiToggles} href="commands" />
							<UserProfile session={props.session} />
						</Stack>
					</Stack>
					<Spacer />
				</Flex>
			</Flex>
			<Box h="100vh" w="225px" display={{ base: 'none', md: 'block' }} />
		</Box>
	);
}
