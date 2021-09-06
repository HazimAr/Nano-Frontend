/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Divider, Flex, Heading, HStack, Image, Spacer, Stack, Button } from '@chakra-ui/react';
import { UserProfile } from './userprofile';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMedal, FaPen } from 'react-icons/fa';
import { HiOutlineCollection } from 'react-icons/hi';
import { GiAbstract039, GiCirclingFish, GiSwordSmithing, GiBackwardTime, GiInfo, GiIncomingRocket, GiDoubleDragon, GiSlashedShield, GiImpLaugh } from 'react-icons/gi';
import { Logo } from './logo';
import { NavLink } from './navlink';
import { useRouter } from 'next/router';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { FiPlusCircle } from 'react-icons/fi';
//
export function Sidebar(props): JSX.Element {
	const { session, cookies } = props;
	const { guild_id } = cookies ?? {};

	const [guilds, setGuilds] = useState([]);
	const [guild, setGuild] = useState({});

	useEffect(() => {
		async function _getGuilds() {
			const { authed_guilds_filtered } = (await axios.post(`${process.env.HOST_DOMAIN}/u/get_guilds`, { authorization: `Bearer ${session.accessToken}` })).data;
			setGuilds(authed_guilds_filtered);
			setGuild(authed_guilds_filtered.find((g) => g.id === guild_id));
		}

		if (session?.accessToken) _getGuilds();
	}, []);

	return (
		<Flex bg="red_black.gray" direction="column" borderWidth="0px" width="325px" position="fixed" {...props}>
			<Flex direction="column" flex="1" py="8" px="10" overflowY="auto" overflowX="hidden">
				<Stack spacing="2" as="nav" aria-label="Sidebar Navigation">
					{session && guild_id ? (
						<>
							{guild?.id ? <GuildDropDown guilds={guilds} guild_id={guild_id} guild={guild} setGuild={setGuild} /> : null}
							<NavLink label="Anime" icon={GiCirclingFish} href={`/dashboard/${guild_id}/groups/anime`} />
							<NavLink label="Coming Soon" icon={GiIncomingRocket} href={`/dashboard/${guild_id}/groups/coming_soon`} />
							<NavLink label="Games" icon={GiDoubleDragon} href={`/dashboard/${guild_id}/groups/games`} />
							<NavLink label="Guild" icon={GiSlashedShield} href={`/dashboard/${guild_id}/groups/guild`} />
							<NavLink label="Info" icon={GiInfo} href={`/dashboard/${guild_id}/groups/info`} />
							<NavLink label="osu!" icon={GiAbstract039} href={`/dashboard/${guild_id}/groups/osu`} />
							<NavLink label="Role Playing" icon={GiImpLaugh} href={`/dashboard/${guild_id}/groups/role_playing`} />
							<NavLink label="Utility" icon={HiOutlineCollection} href={`/dashboard/${guild_id}/groups/util`} />
							<Divider />
							<NavLink label="Custom Commands" icon={GiSwordSmithing} href={`/dashboard/${guild_id}/custom_commands`} />
							<NavLink label="Timers" icon={GiBackwardTime} href={`/dashboard/${guild_id}/timers`} />
						</>
					) : (
						<Button
							bg="discord"
							_hover={{ bg: 'osu' }}
							onClick={async () => {
								await signIn('discord');
							}}
						>
							Login With Discord
						</Button>
					)}
					<Divider />
					<NavLink label="Leaderboards" icon={FaMedal} href="/leaderboards" />

					{/* <NavLink label="Reaction Roles" icon={GiBearFace} href={`/dashboard/${guild_id}/reaction_roles`} /> */}
					{/* <NavLink label="Premium" icon={GiBoltSpellCast} href={`/dashboard/${guild_id}/premium`} /> */}
				</Stack>
				<Spacer />
			</Flex>
		</Flex>
	);
}

function GuildDropDown({ guilds, guild_id, guild, setGuild }) {
	const [isOpen, setOpen] = useState(false);
	const router = useRouter();
	console.log(router);

	return (
		<Box mt="10px" pt="10px" color="white" pos="relative">
			{/* // Dropdown Button
			// */}
			<Button _focus={{ outline: 'none', color: 'osu' }} _hover={{ bg: 'transparent' }} onClick={() => setOpen(!isOpen)} borderRadius="none" height="60px" w="100%" bg="transparent" onBlur={() => setTimeout(() => setOpen(false), 200)}>
				<span style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '14px' }}>
					<Box mr="auto">
						<Image src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${guild?.icon?.startsWith('a_') ? 'gif' : 'png'}`} minW="40px" maxW="40px" rounded="50%" />
					</Box>
					<Box mr="auto">{guild.name.slice(0, 20)}</Box>
					<BsFillCaretDownFill transform={isOpen ? 'scale(1, -1)' : 'none'} style={{ transition: 'all 300ms linear' }} />
				</span>
			</Button>
			{/* // Guild Buttons
			// */}
			<Box hidden={isOpen ? false : true} w="100%" bg="black" pos="absolute" h={`${guilds.length * 40 + 30}px`} zIndex="1" borderRadius="5%">
				{guilds
					.filter((g) => g.id !== guild_id)
					.map((guild, i) => {
						return (
							<Button
								key={guild.id}
								pos="absolute"
								top={`${i * 40 + 10}px`}
								left="0px"
								height="40px"
								w="100%"
								zIndex="1"
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
									void router.push(router.asPath.replace(router.query.guild_id, guild.id));
									// router.reload();
								}}
								_hover={{ bg: 'transparent', color: 'osu' }}
								bg="transparent"
								borderRadius="none"
							>
								<span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
									<Box mr="auto">
										<Image src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${guild?.icon?.startsWith('a_') ? 'gif' : 'png'}`} minW="30px" maxW="30px" rounded="50%" />
									</Box>
									<Box mr="auto">{guild.name.slice(0, 20)}</Box>
								</span>
							</Button>
						);
					})}
				{/* // Invite Button
			// */}
				<Divider pos="absolute" top={`${(guilds.length - 1) * 40 + 20}px`} />
				<a href={`https://discord.com/api/oauth2/authorize?client_id=783539062149087262&permissions=8&scope=bot&guild_id=199325828843044865&response_type=code&redirect_uri=${process.env.CLIENT_DOMAIN}`}>
					<Button key={guild.id} pos="absolute" top={`${(guilds.length - 1) * 40 + 20}px`} left="0px" height="40px" w="100%" zIndex="1" _hover={{ bg: 'transparent', color: 'osu' }} bg="transparent" borderRadius="none">
						<span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
							<Box mr="auto">
								<FiPlusCircle size="30px" />
							</Box>
							<Box mr="auto">Add Server</Box>
						</span>
					</Button>
				</a>
			</Box>
		</Box>
	);
}
