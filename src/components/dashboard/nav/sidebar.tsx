/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
	Box,
	Divider,
	Flex,
	Heading,
	HStack,
	Image,
	Spacer,
	Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { DISCORD_BASE_URL } from "config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	FaBars,
	FaClock,
	FaCode,
	FaMedal,
	FaPen,
	FaSurprise,
} from "react-icons/fa";
import { Logo } from "./logo";
import { NavLink } from "./navlink";
import { UserProfile } from "./userprofile";

export function Sidebar(props: any): JSX.Element {
	const router = useRouter();
	const guild_id = router.asPath.split("/")[2];

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
			<Flex
				bg="linear-gradient(#7549ac 60%, #f6a)"
				direction="column"
				borderRightWidth="1px"
				width="225px"
				position="fixed"
				{...props}
			>
				<Flex
					direction="column"
					flex="1"
					pt="5"
					pb="4"
					overflowY="auto"
					px="4"
				>
					<Box mb="6">
						<Logo />
					</Box>

					{/* <Box mb="6">
					<SearchField />
				</Box> */}

					<Stack spacing="6" as="nav" aria-label="Sidebar Navigation">
						<Stack spacing="1">
							<NavLink label="Edit Guild" icon={FaPen} href="" />

							<NavLink
								label="Leaderboards"
								icon={FaMedal}
								href="leaderboards"
							/>

							{/* <NavLink
								label="Premium"
								icon={FaCrown}
								href="/dashboard/premium"
							/> */}
						</Stack>

						<Divider />

						<Stack spacing="1">
							<HStack justify="center">
								<Image
									src={`https://cdn.discordapp.com/icons/${
										guild?.id
									}/${guild?.icon}.${
										guild?.icon?.startsWith("a_")
											? "gif"
											: "png"
									}`}
									w="50px"
									rounded="50%"
								/>
								<Heading size="md" textAlign="center">
									{guild?.name}
								</Heading>
							</HStack>
							<NavLink
								label="Nano Commands"
								icon={FaBars}
								href="commands"
							/>
							<NavLink
								label="Custom Commands"
								icon={FaCode}
								href="custom"
							/>
							<NavLink
								label="Reaction Roles"
								icon={FaSurprise}
								href="reaction"
							/>

							<NavLink
								label="Timers"
								icon={FaClock}
								href="timers"
							/>
						</Stack>
					</Stack>
					<Spacer />
				</Flex>

				<UserProfile session={props.session} />
			</Flex>
			<Box h="100vh" w="225px" display={{ base: "none", md: "block" }} />
		</Box>
	);
}
