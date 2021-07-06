/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Flex, Text } from "@chakra-ui/react";

export function Votes({ user, leaderboards, setLeaderboards }: any) {
	const newLeaderboards = leaderboards
		.map((user: any) => {
			return user;
		})
		.sort((a: any, b: any) => b.votes.all - a.votes.all);
	setLeaderboards(newLeaderboards);
	return (
		<Flex justify="center" w={{ base: "100%", md: "inherit" }}>
			<Box w={{ base: "100%", md: "65px" }}>
				<Text fontSize="xs" color="text.400">
					Votes (All)
				</Text>
				{user.votes.all}
			</Box>
			<Box w={{ base: "100%", md: "85px" }} mx={{ base: 0, md: 3 }}>
				<Text fontSize="xs" color="text.400">
					Votes (Monthly)
				</Text>
				{user.votes.monthly}
			</Box>
		</Flex>
	);
}

export function Rank({ user, leaderboards, setLeaderboards }: any) {
	const newLeaderboards = leaderboards
		.map((user: any) => {
			return user;
		})
		.sort((a: any, b: any) => b.experience - a.experience);
	setLeaderboards(newLeaderboards);
	return (
		<Flex justify="center" w={{ base: "100%", md: "inherit" }}>
			<Box w={{ base: "100%", md: "65px" }}>
				<Text fontSize="xs" color="text.400">
					Experience
				</Text>
				{user.xp}
			</Box>
			<Box w={{ base: "100%", md: "85px" }} mx={{ base: 0, md: 3 }}>
				<Text fontSize="xs" color="text.400">
					Level
				</Text>
				{user.lvl}
			</Box>
		</Flex>
	);
}
