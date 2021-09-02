/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react';
import Level from '@components/dashboard/profile/level';
//
//
export function Votes({ leaderboards }: any): JSX.Element {
	const newLeaderboards = leaderboards
		.map((user: any) => {
			return user;
		})
		.sort((a: any, b: any) => {
			if (a.votes.all === b.votes.all) {
				return a.tag === b.tag ? 0 : a.tag > b.tag ? 1 : -1;
			}
			return b.votes.all - a.votes.all;
		});
	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return <DefaultLeaderboard key={user.tag} user={user} index={index} stat_name="Votes" stat_to_show={user.votes.all} />;
			})}
		</>
	);
}
//
//
export function Rank({ leaderboards }: any): JSX.Element {
	const newLeaderboards = leaderboards.sort((a: any, b: any) => {
		if (a.xp === b.xp) {
			return a.tag === b.tag ? 0 : a.tag > b.tag ? 1 : -1;
		}
		return b.xp - a.xp;
	});

	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return <DefaultLeaderboard key={user.tag} user={user} index={index} stat_name="Rank" stat_to_show={user.lvl} is_rank />;
			})}
		</>
	);
}
//
//
export function Tokens({ leaderboards }: any): JSX.Element {
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
				return <DefaultLeaderboard key={user.tag} user={user} index={index} stat_name="Tokens" stat_to_show={user.tokens} />;
			})}
		</>
	);
}
//
//
export function Messages({ leaderboards }: any): JSX.Element {
	const newLeaderboards = leaderboards.sort((a: any, b: any) => {
		if (a.messages === b.messages) {
			return a.tag === b.tag ? 0 : a.tag > b.tag ? 1 : -1;
		}
		return b.messages - a.messages;
	});

	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return <DefaultLeaderboard key={user.tag} user={user} index={index} stat_name="Messages" stat_to_show={user.messages.all} />;
			})}
		</>
	);
}
//
//
export function Osu({ leaderboards }: any): JSX.Element {
	const newLeaderboards: any[] = [];
	leaderboards
		.map((user: any) => {
			return user;
		})
		.sort((a: any, b: any) => a.osu?.osuRank - b.osu?.osuRank);

	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return (
					<Flex
						key={user.tag}
						justify={{
							base: 'center',
							md: 'space-between',
						}}
						flexDir={{ base: 'column', md: 'row' }}
						align={{ base: 'flex-start', md: 'center' }}
						my={5}
						textAlign="center"
					>
						<Flex justify="center" align="center">
							<Flex bg={index < 3 ? (index === 2 ? 'silver' : index === 1 ? 'brand.primary2' : 'brand.secondary') : 'osu'} boxSize="30px" justify="center" align="center" rounded="50%">
								<Text>{index + 1}</Text>
							</Flex>

							<Flex justify="center" mx={3}>
								<Avatar src={user.img} boxSize="50px" fallbackSrc="/oss.png" alt={user.tag} rounded="50%" />
							</Flex>

							<Text maxW="300px" textAlign="left">
								{user.tag}
							</Text>
						</Flex>
						<Flex justify="center" w={{ base: '100%', md: 'inherit' }}>
							<Box w={{ base: '100%', md: '85px' }} mx={{ base: 0, md: 3 }}>
								<Text fontSize="xs" color="text.400">
									Rank
								</Text>
								{user.osu.osuRank}
							</Box>
						</Flex>

						<Divider display={{ base: 'block', md: 'none' }} />
					</Flex>
				);
			})}
		</>
	);
}
//
//
//
function DefaultLeaderboard({ user, index, stat_name, stat_to_show, is_rank }) {
	return (
		<Flex
			key={user.tag}
			justify={{
				base: 'center',
				md: 'space-between',
			}}
			flexDir={{ base: 'column', md: 'row' }}
			align={{ base: 'flex-start', md: 'center' }}
			my={5}
			textAlign="center"
		>
			<Flex justify="center" align="center">
				<Box mr="10px" color={index < 3 ? (index === 2 ? '#b08d57' : index === 1 ? 'silver' : '#d4af37') : 'osu'} boxSize="30px" justify="center" align="center" rounded="50%">
					<Text>{index + 1}</Text>
				</Box>

				<Box justify="center" mx={3}>
					<Avatar alt={user.tag} src={user.img} boxSize="50px" fallbackSrc="/oss.png" rounded="50%" />
				</Box>

				<Text maxW="300px" textAlign="left">
					{user.tag}
				</Text>
			</Flex>
			<Flex justify="center" w={{ base: '100%', md: 'inherit' }}>
				<Box w={{ base: '100%', md: '85px' }} mx={{ base: 0, md: 3 }}>
					<Text fontSize="s" color="osu">
						{stat_name}
					</Text>
					{stat_to_show}
				</Box>
				{is_rank ? (
					<Box w={{ base: '100%', md: '85px' }} mx={{ base: 0, md: 3 }}>
						<Level user={user.nextLvlPercent} />
					</Box>
				) : null}
			</Flex>

			<Divider display={{ base: 'block', md: 'none' }} />
		</Flex>
	);
}
