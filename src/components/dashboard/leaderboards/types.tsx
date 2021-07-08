/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import Level from "@components/dashboard/profile/level";

export function Votes({ leaderboards }: any) {
	const newLeaderboards = leaderboards
		.map((user: any) => {
			return user;
		})
		.sort((a: any, b: any) => {
			if (a.votes.monthly === b.votes.monthly) {
				return a.tag === b.tag ? 0 : a.tag > b.tag ? 1 : -1;
			}
			return b.votes.monthly - a.votes.monthly;
		});
	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return (
					<Flex
						key={user.tag}
						justify={{
							base: "center",
							md: "space-between",
						}}
						flexDir={{ base: "column", md: "row" }}
						align={{ base: "flex-start", md: "center" }}
						my={5}
						textAlign="center"
					>
						<Flex justify="center" align="center">
							<Flex
								bg={
									index < 3
										? index === 2
											? "silver"
											: index === 1
											? "brand.primary2"
											: "brand.secondary"
										: "brand.primary"
								}
								boxSize="30px"
								justify="center"
								align="center"
								rounded="50%"
							>
								<Text>{index + 1}</Text>
							</Flex>

							<Flex justify="center" mx={3}>
								<Image
									src={user.img}
									boxSize="50px"
									fallbackSrc="/oss.png"
									rounded="50%"
								/>
							</Flex>

							<Text maxW="300px" textAlign="left">
								{user.tag}
							</Text>
						</Flex>
						<Flex
							justify="center"
							w={{ base: "100%", md: "inherit" }}
						>
							<Box
								w={{ base: "100%", md: "85px" }}
								mx={{ base: 0, md: 3 }}
							>
								<Text fontSize="xs" color="text.400">
									Votes (Monthly)
								</Text>
								{user.votes.monthly}
							</Box>
							<Box w={{ base: "100%", md: "65px" }}>
								<Text fontSize="xs" color="text.400">
									Votes (All)
								</Text>
								{user.votes.all}
							</Box>
						</Flex>

						<Divider display={{ base: "block", md: "none" }} />
					</Flex>
				);
			})}
		</>
	);
}

export function Rank({ leaderboards, guild }: any) {
	const newLeaderboards = leaderboards
		.map((user: any) => {
			return user;
		})
		.sort((a: any, b: any) => {
			if (a.xp === b.xp) {
				return a.tag === b.tag ? 0 : a.tag > b.tag ? 1 : -1;
			}
			return b.xp - a.xp;
		});

	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return (
					<Flex
						key={user.tag}
						justify={{
							base: "center",
							md: "space-between",
						}}
						flexDir={{ base: "column", md: "row" }}
						align={{ base: "flex-start", md: "center" }}
						my={5}
						textAlign="center"
					>
						<Flex justify="center" align="center">
							<Flex
								bg={
									index < 3
										? index === 2
											? "silver"
											: index === 1
											? "brand.primary2"
											: "brand.secondary"
										: "brand.primary"
								}
								boxSize="30px"
								justify="center"
								align="center"
								rounded="50%"
							>
								<Text>{index + 1}</Text>
							</Flex>

							<Flex justify="center" mx={3}>
								<Image
									src={user.img}
									boxSize="50px"
									rounded="50%"
									fallbackSrc="/oss.png"
								/>
							</Flex>

							<Text maxW="300px" textAlign="left">
								{user.tag}
							</Text>
						</Flex>
						<Flex
							justify="center"
							w={{ base: "100%", md: "inherit" }}
						>
							<Box w={{ base: "100%", md: "65px" }}>
								<Text fontSize="xs" color="text.400">
									Experience
								</Text>
								{user.xp}
							</Box>
							<Box
								w={{ base: "100%", md: "85px" }}
								mx={{ base: 0, md: 3 }}
							>
								<Level user={user} guild={guild} />
							</Box>
						</Flex>

						<Divider display={{ base: "block", md: "none" }} />
					</Flex>
				);
			})}
		</>
	);
}

export function Tokens({ leaderboards }: any) {
	const newLeaderboards = leaderboards
		.map((user: any) => {
			return user;
		})

		.sort((a: any, b: any) => {
			if (a.tokens === b.tokens) {
				return a.tag === b.tag ? 0 : a.tag > b.tag ? 1 : -1;
			}
			return b.tokens - a.tokens;
		});
	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return (
					<Flex
						key={user.tag}
						justify={{
							base: "center",
							md: "space-between",
						}}
						flexDir={{ base: "column", md: "row" }}
						align={{ base: "flex-start", md: "center" }}
						my={5}
						textAlign="center"
					>
						<Flex justify="center" align="center">
							<Flex
								bg={
									index < 3
										? index === 2
											? "silver"
											: index === 1
											? "brand.primary2"
											: "brand.secondary"
										: "brand.primary"
								}
								boxSize="30px"
								justify="center"
								align="center"
								rounded="50%"
							>
								<Text>{index + 1}</Text>
							</Flex>

							<Flex justify="center" mx={3}>
								<Image
									src={user.img}
									boxSize="50px"
									fallbackSrc="/oss.png"
									rounded="50%"
								/>
							</Flex>

							<Text maxW="300px" textAlign="left">
								{user.tag}
							</Text>
						</Flex>
						<Flex
							justify="center"
							w={{ base: "100%", md: "inherit" }}
						>
							<Box
								w={{ base: "100%", md: "85px" }}
								mx={{ base: 0, md: 3 }}
							>
								<Text fontSize="xs" color="text.400">
									Tokens (All)
								</Text>
								{user.tokens}
							</Box>
							{/* <Box w={{ base: "100%", md: "65px" }}>
								<Text fontSize="xs" color="text.400">
									Votes (All)
								</Text>
								{user.votes.all}
							</Box> */}
						</Flex>

						<Divider display={{ base: "block", md: "none" }} />
					</Flex>
				);
			})}
		</>
	);
}

export function Osu({ leaderboards, game }: any) {
	console.log(game);
	const newLeaderboards: any[] = [];
	leaderboards
		.sort((a: any, b: any) => a.osu?.osuRank - b.osu?.osuRank)
		.forEach((user: any) => {
			if (user.osu.id) {
				newLeaderboards.push(user);
			}
		});

	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return (
					<Flex
						key={user.tag}
						justify={{
							base: "center",
							md: "space-between",
						}}
						flexDir={{ base: "column", md: "row" }}
						align={{ base: "flex-start", md: "center" }}
						my={5}
						textAlign="center"
					>
						<Flex justify="center" align="center">
							<Flex
								bg={
									index < 3
										? index === 2
											? "silver"
											: index === 1
											? "brand.primary2"
											: "brand.secondary"
										: "brand.primary"
								}
								boxSize="30px"
								justify="center"
								align="center"
								rounded="50%"
							>
								<Text>{index + 1}</Text>
							</Flex>

							<Flex justify="center" mx={3}>
								<Image
									src={user.img}
									boxSize="50px"
									fallbackSrc="/oss.png"
									rounded="50%"
								/>
							</Flex>

							<Text maxW="300px" textAlign="left">
								{user.tag}
							</Text>
						</Flex>
						<Flex
							justify="center"
							w={{ base: "100%", md: "inherit" }}
						>
							<Box
								w={{ base: "100%", md: "85px" }}
								mx={{ base: 0, md: 3 }}
							>
								<Text fontSize="xs" color="text.400">
									Rank
								</Text>
								{user.osu.osuRank}
							</Box>
							{/* <Box w={{ base: "100%", md: "65px" }}>
								<Text fontSize="xs" color="text.400">
									Votes (All)
								</Text>
								{user.votes.all}
							</Box> */}
						</Flex>

						<Divider display={{ base: "block", md: "none" }} />
					</Flex>
				);
			})}
		</>
	);
}

export function Messages({ leaderboards }: any): JSX.Element {
	const newLeaderboards = leaderboards
		.map((user: any) => {
			return user;
		})
		.sort((a: any, b: any) => {
			if (a.messages === b.messages) {
				return a.tag === b.tag ? 0 : a.tag > b.tag ? 1 : -1;
			}
			return b.messages - a.messages;
		});
	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return (
					<Flex
						key={user.tag}
						justify={{
							base: "center",
							md: "space-between",
						}}
						flexDir={{ base: "column", md: "row" }}
						align={{ base: "flex-start", md: "center" }}
						my={5}
						textAlign="center"
					>
						<Flex justify="center" align="center">
							<Flex
								bg={
									index < 3
										? index === 2
											? "silver"
											: index === 1
											? "brand.primary2"
											: "brand.secondary"
										: "brand.primary"
								}
								boxSize="30px"
								justify="center"
								align="center"
								rounded="50%"
							>
								<Text>{index + 1}</Text>
							</Flex>

							<Flex justify="center" mx={3}>
								<Image
									src={user.img}
									boxSize="50px"
									fallbackSrc="/oss.png"
									rounded="50%"
								/>
							</Flex>

							<Text maxW="300px" textAlign="left">
								{user.tag}
							</Text>
						</Flex>
						<Flex
							justify="center"
							w={{ base: "100%", md: "inherit" }}
						>
							<Box
								w={{ base: "100%", md: "85px" }}
								mx={{ base: 0, md: 3 }}
							>
								<Text fontSize="xs" color="text.400">
									Messages (All)
								</Text>
								{user.messages}
							</Box>
							{/* <Box w={{ base: "100%", md: "65px" }}>
								<Text fontSize="xs" color="text.400">
									Votes (All)
								</Text>
								{user.votes.all}
							</Box> */}
						</Flex>

						<Divider display={{ base: "block", md: "none" }} />
					</Flex>
				);
			})}
		</>
	);
}
