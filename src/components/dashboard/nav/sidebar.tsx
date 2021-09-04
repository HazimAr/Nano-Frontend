/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Divider, Flex, Heading, HStack, Image, Spacer, Stack, Button } from '@chakra-ui/react';
import { UserProfile } from './userprofile';
import { signIn } from 'next-auth/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMedal, FaPen } from 'react-icons/fa';
import { HiOutlineCollection } from 'react-icons/hi';
import { GiAbstract039, GiCirclingFish, GiSwordSmithing, GiBackwardTime, GiInfo, GiIncomingRocket, GiDoubleDragon, GiSlashedShield, GiImpLaugh } from 'react-icons/gi';
import { Logo } from './logo';
import { NavLink } from './navlink';

export function Sidebar(props): JSX.Element {
	const { session, cookies } = props;
	const { guild_id } = cookies ?? {};

	const [guilds, setGuilds] = useState([]);
	const [guild, setGuild] = useState({});

	useEffect(() => {
		async function _getGuilds() {
			const { authedGuilds } = (await axios.post(`${process.env.HOST_DOMAIN}/u/get_guilds`, { authorization: `Bearer ${session.accessToken}` })).data;
			setGuilds(authedGuilds.filter((g) => g));
			setGuild(authedGuilds.find((g) => g.id === guild_id));
		}

		if (session?.accessToken) _getGuilds();
	}, []);

	return (
		<Flex bg="red_black.gray" direction="column" borderWidth="0px" width="325px" position="fixed" {...props}>
			<Flex direction="column" flex="1" py="8" px="10" overflowY="auto" overflowX="hidden">
				<Logo />

				{/* <Box mb="6">
					<SearchField />
				</Box> */}

				<Stack spacing="2" as="nav" aria-label="Sidebar Navigation">
					<NavLink label="Change Guild" icon={FaPen} href="/dashboard" />
					<NavLink label="Leaderboards" icon={FaMedal} href="/leaderboards" />
					<Divider />
					{session && guild_id ? (
						<>
							{
								guild?.id ? (
									<Box pt="16px">
										<HStack>
											<Image src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${guild?.icon?.startsWith('a_') ? 'gif' : 'png'}`} w="50px" rounded="50%" />
											<Heading size="md" textAlign="center">
												{guild?.name}
											</Heading>
										</HStack>
										{/*  */}
										<DropDown guilds={guilds} guild_id={guild_id} guild={guild} setGuild={setGuild} />
									</Box>
								) : null
								// <Select value={value} onChange={handleChange} placeholder="Controlled select">
								// 	<option value="Option 1">Option 1</option>
								// 	<option value="Option 2">Option 2</option>
								// 	<option value="Option 3">Option 3</option>
								// </Select>
							}
							<UserProfile session={session} />
							<NavLink label="osu!" icon={GiAbstract039} href={`/dashboard/${guild_id}/groups/osu`} />
							<NavLink label="Utility" icon={HiOutlineCollection} href={`/dashboard/${guild_id}/groups/util`} />
							<NavLink label="Anime" icon={GiCirclingFish} href={`/dashboard/${guild_id}/groups/anime`} />
							<NavLink label="Coming Soon" icon={GiIncomingRocket} href={`/dashboard/${guild_id}/groups/coming_soon`} />
							<NavLink label="Info" icon={GiInfo} href={`/dashboard/${guild_id}/groups/info`} />
							<NavLink label="Games" icon={GiDoubleDragon} href={`/dashboard/${guild_id}/groups/games`} />
							<NavLink label="Guild" icon={GiSlashedShield} href={`/dashboard/${guild_id}/groups/guild`} />
							<NavLink label="Role Playing" icon={GiImpLaugh} href={`/dashboard/${guild_id}/groups/role_playing`} />
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

					{/* <NavLink label="Reaction Roles" icon={GiBearFace} href={`/dashboard/${guild_id}/reaction_roles`} /> */}
					{/* <NavLink label="Premium" icon={GiBoltSpellCast} href={`/dashboard/${guild_id}/premium`} /> */}
				</Stack>
				<Spacer />
			</Flex>
		</Flex>
	);
}

function DropDown({ guilds, guild_id, guild, setGuild }) {
	const [isOpen, setOpen] = useState(false);

	return (
		<Box mt="10px" pos="relative" color="white">
			<Button onClick={() => setOpen(!isOpen)} borderRadius="none" height="40px" w="100%" bg="black">
				<Image src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${guild?.icon?.startsWith('a_') ? 'gif' : 'png'}`} w="50px" rounded="50%" />
				{guild.name}
			</Button>
			{isOpen ? (
				<Box bg="osu">
					{guilds.map((guild, i) => {
						return (
							<Button
								key={guild.id}
								pos="absolute"
								top={`${(i + 1) * 40}px`}
								left="0px"
								height="40px"
								w="100%"
								zIndex="1"
								onClick={() => {
									setGuild(guild);
									setOpen(!isOpen);
								}}
								borderRadius="none"
								bg="black"
							>
								<span>
									<Flex alignItems="center">
										<Box mr="auto">
											<Image src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${guild?.icon?.startsWith('a_') ? 'gif' : 'png'}`} w="30px" rounded="50%" />
										</Box>
										<Box mr="auto">{guild.name}</Box>
									</Flex>
								</span>
							</Button>
						);
					})}
				</Box>
			) : null}
		</Box>
		// <Select size="lg" bg="gray" borderColor="none" color="white" value={guild_id}>
		// 	<option value="pick" style={{ backgroundColor: '#faa', fontSize: '25px', textAlign: 'center' }}>
		// 		Pick a Guild
		// 	</option>
		// 	{guilds.map((guild) => {
		// 		return (
		// 			<option key={guild.id} style={{ backgroundColor: 'gray' }} value={guild.id}>
		// 				{guild.name}
		// 			</option>
		// 		);
		// 	})}
		// </Select>
	);
}
