/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Divider, Flex, Spacer, Stack } from "@chakra-ui/react";
import React from "react";
import {
	FaClock,
	FaCode,
	FaCog,
	FaCrown,
	FaMedal,
	FaPlus,
	FaRegQuestionCircle,
	FaSurprise,
} from "react-icons/fa";
import { Logo } from "./logo";
import { NavLink } from "./navlink";
import { UserProfile } from "./userprofile";

export function Sidebar(props: any): JSX.Element {
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
							<NavLink
								label="Guilds"
								icon={FaPlus}
								href="/dashboard"
							/>
							<NavLink
								label="Premium"
								icon={FaCrown}
								href="/dashboard/premium"
							/>
							<NavLink
								label="Leaderboards"
								icon={FaMedal}
								href="/dashboard/leaderboards"
							/>
						</Stack>

						<Divider />

						<Stack spacing="1">
							<NavLink
								label="Nano Commands"
								icon={FaCode}
								href="/dashboard/commands"
							/>
							<NavLink
								label="Custom Commands"
								icon={FaCode}
								href="/dashboard/custom"
							/>
							<NavLink
								label="Reaction Roles"
								icon={FaSurprise}
								href="/dashboard/reaction"
							/>

							<NavLink
								label="Timers"
								icon={FaClock}
								href="/dashboard/timers"
							/>
						</Stack>

						<Divider />

						<Stack spacing="1">
							<NavLink
								label="Help"
								icon={FaRegQuestionCircle}
								href="/dashboard/help"
							/>

							<NavLink
								label="Settings"
								icon={FaCog}
								href="/dashboard/settings"
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
