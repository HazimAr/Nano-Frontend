/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Divider, Flex, HStack, Image, Spacer, Stack } from '@chakra-ui/react';
import { CUSTOM_BUTTON_1 } from '@components/button';
import { Logo } from '@components/guild/nav/logo';
import axios from 'axios';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { FaMedal } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { GiAbstract039, GiBackwardTime, GiCirclingFish, GiDoubleDragon, GiHamburgerMenu, GiImpLaugh, GiIncomingRocket, GiInfo, GiSlashedShield, GiSwordSmithing } from 'react-icons/gi';
import { HiOutlineCollection } from 'react-icons/hi';
import { NavLink } from './navlink';
//
export function Sidebar(props): JSX.Element {
	const { session, cookies, isOpen, setOpen, theme_color } = props;
	const { guild_id } = cookies ?? {};

	const [guilds, setGuilds] = useState([]);
	const [guild, setGuild] = useState({ id: '' });

	useEffect(() => {
		async function _getGuilds() {
			const { authed_guilds_filtered } = (await axios.post(`${process.env.HOST_DOMAIN}/u/get_guilds`, { authorization: `Bearer ${session.accessToken}` })).data;
			setGuilds(authed_guilds_filtered);
			setGuild(authed_guilds_filtered.find((g) => g.id === guild_id));
		}

		if (session?.accessToken) _getGuilds();
	}, []);

	return (
		<Stack pos="relative" as="nav" aria-label="Sidebar Navigation">
			<HStack px="5" pl="5px">
				<CUSTOM_BUTTON_1
					bg="transparent"
					onClick={() => {
						setOpen(!isOpen);
					}}
				>
					<GiHamburgerMenu />
				</CUSTOM_BUTTON_1>
				<Logo />
			</HStack>
			{/*  */}
			{session && guild_id ? (
				<>
					<Box px="5">
						<Image display="block" mx="auto" src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${guild?.icon?.startsWith('a_') ? 'gif' : 'png'}`} minW="40px" maxW="80px" rounded="50%" />
						{guild?.id && <GuildDropDown guilds={guilds} guild_id={guild_id} guild={guild} setGuild={setGuild} theme_color={theme_color} />}
						<NavLink label="Anime" icon={GiCirclingFish} href={`/guild/${guild_id}/groups/anime`} theme_color={theme_color} />
						<NavLink label="Coming Soon" icon={GiIncomingRocket} href={`/guild/${guild_id}/groups/coming_soon`} theme_color={theme_color} />
						<NavLink label="Games" icon={GiDoubleDragon} href={`/guild/${guild_id}/groups/games`} theme_color={theme_color} />
						<NavLink label="Guild" icon={GiSlashedShield} href={`/guild/${guild_id}/groups/guild`} theme_color={theme_color} />
						<NavLink label="Info" icon={GiInfo} href={`/guild/${guild_id}/groups/info`} theme_color={theme_color} />
						<NavLink label="osu!" icon={GiAbstract039} href={`/guild/${guild_id}/groups/osu`} theme_color={theme_color} />
						<NavLink label="Role Playing" icon={GiImpLaugh} href={`/guild/${guild_id}/groups/role_playing`} theme_color={theme_color} />
						<NavLink label="Utility" icon={HiOutlineCollection} href={`/guild/${guild_id}/groups/util`} theme_color={theme_color} />
					</Box>
					<Divider />
					<Box px="5">
						<NavLink label="Custom Commands" icon={GiSwordSmithing} href={`/guild/${guild_id}/custom_commands`} theme_color={theme_color} />
						<NavLink label="Timers" icon={GiBackwardTime} href={`/guild/${guild_id}/timers`} theme_color={theme_color} />
					</Box>
				</>
			) : (
				<CUSTOM_BUTTON_1
					bg="discord"
					_hover={{ bg: `${theme_color}.50` }}
					onClick={async () => {
						await signIn('discord');
					}}
				>
					Login With Discord
				</CUSTOM_BUTTON_1>
			)}
			<Divider />
			<Box px="5">
				<NavLink label="Leaderboards" icon={FaMedal} href="/leaderboards" theme_color={theme_color} />
			</Box>

			{/* <NavLink label="Reaction Roles" icon={GiBearFace} href={`/guild/${guild_id}/reaction_roles`} /> */}
			{/* <NavLink label="Premium" icon={GiBoltSpellCast} href={`/guild/${guild_id}/premium`} /> */}
		</Stack>
	);
}
//
function GuildDropDown({ guilds, guild_id, guild, setGuild, theme_color }) {
	const [isOpen, setOpen] = useState(false);
	const router = useRouter();

	return (
		<Box pos="relative" zIndex="1" color="white" mx="auto">
			{/* // Dropdown Button
			// */}
			<CUSTOM_BUTTON_1
				pos="relative"
				zIndex="2"
				borderRadius="none"
				height="60px"
				w="100%"
				bg="transparent"
				outline="none"
				_focus={{ color: `${theme_color}.80` }}
				_hover={{ color: `${theme_color}.90` }}
				onClick={() => setOpen(!isOpen)}
				onBlur={() => setTimeout(() => setOpen(false), 200)}
			>
				<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', fontSize: '20px' }}>
					<Box mr="4px">{guild.name}</Box>
					<BsFillCaretDownFill transform={isOpen ? 'scale(1, -1)' : 'none'} style={{ transition: 'transform 300ms linear' }} />
				</span>
			</CUSTOM_BUTTON_1>
			{/* // Guild Buttons 🔽
			// */}
			<Box pos="absolute" hidden={!isOpen} w="100%" bg={`${theme_color}.20`} h={`${guilds.length * 40 + 30}px`} borderRadius="5%">
				{guilds
					.filter((g) => g.id !== guild_id)
					.map((guild, i) => {
						return (
							<CUSTOM_BUTTON_1
								key={guild.id}
								pos="absolute"
								zIndex="5"
								top={`${i * 40 + 10}px`}
								left="0px"
								height="40px"
								w="100%"
								bg="transparent"
								borderRadius="none"
								_hover={{ bg: 'transparent', color: `${theme_color}.50` }}
								onClick={async () => {
									setGuild(guild);
									setOpen(!isOpen);
									await fetch('/api/set_cookie', {
										method: 'post',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({ key: 'guild_id', value: guild.id, expire: 2.628e6 }),
									});
									router.push(router.asPath.replace(router.query.guild_id, guild.id));
								}}
							>
								<span style={{ display: 'flex', alignItems: 'center', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
									<Box mr="15px">
										<Image src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${guild?.icon?.startsWith('a_') ? 'gif' : 'png'}`} minW="30px" maxW="30px" rounded="50%" />
									</Box>
									<Box>{guild.name}</Box>
								</span>
							</CUSTOM_BUTTON_1>
						);
					})}
				{/* // Invite Button
			// */}
				<Divider pos="absolute" top={`${(guilds.length - 1) * 40 + 20}px`} />
				<a href={`https://discord.com/api/oauth2/authorize?client_id=783539062149087262&permissions=8&scope=bot&guild_id=199325828843044865&response_type=code&redirect_uri=${process.env.CLIENT_DOMAIN}`}>
					<CUSTOM_BUTTON_1 key={guild.id} pos="absolute" top={`${(guilds.length - 1) * 40 + 20}px`} left="0px" height="40px" w="100%" _hover={{ bg: 'transparent', color: `${theme_color}.50` }} bg="transparent" borderRadius="none">
						<span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
							<Box mr="15px">
								<FiPlusCircle size="30px" />
							</Box>
							<Box mr="auto">Add Server</Box>
						</span>
					</CUSTOM_BUTTON_1>
				</a>
			</Box>
		</Box>
	);
}
