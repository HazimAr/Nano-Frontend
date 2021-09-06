/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeaderboards } from '@api/server';
import { Avatar, Box, Stack, Flex, Text, Divider } from '@chakra-ui/react';
import Layout from '@components/dashboard/layout';
import { useState } from 'react';
import Select from 'react-select';
import { getSession } from 'next-auth/client';
import Level from '@components/dashboard/profile/level';

const options = [
	{ value: 'rank', label: 'Rank' },
	{ value: 'votes', label: 'Votes' },
	{ value: 'messages', label: 'Messages' },
	{ value: 'tokens', label: 'Tokens' },
];

/* secondary: "#f6a", primary: "#7549ac", primary2: "#fab107", */
const osu = {
	1: 'hsl(333, 100%, 70%)',
	2: 'hsl(333, 100%, 75%)',
	3: 'hsl(328, 100%, 70%)',
	4: 'hsl(328, 100%, 75%)',
	dark: 'hsl(328, 100%, 30%)',
};

const customStyles = {
	control: (base, state) => ({
		...base,
		background: 'transparent',
		'&:hover': {
			borderColor: osu[2],
		},
	}),

	menu: (base) => ({
		...base,
		borderRadius: 0,
		margin: 0,
	}),

	menuList: (base) => ({
		...base,
		padding: 0,
	}),

	option: (provided: any, state: { isSelected: boolean }) => ({
		...provided,
		borderBottom: osu.dark,
		backgroundColor: state.isSelected ? osu[1] : osu[2],
		'&:hover': {
			backgroundColor: state.isSelected ? osu[3] : osu[4],
		},
	}),

	singleValue: (provided: any, state: { isDisabled: boolean }) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...provided, opacity, transition };
	},
};
//
// --------- 🚚 🚚 🚚 🚚 🚚 🚚 🚚 🚚 ---------
export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	return { props: { api_response: (await getLeaderboards()).data, session, cookies: context.req.cookies } };
}
//
//
export default function Leaderboards({ api_response, session, cookies }: { api_response: any; session: any; cookies: any }): JSX.Element {
	const { xp, votes, messages, tokens } = api_response;
	const [sort, setSort] = useState(options[0]);

	return (
		<Layout session={session} cookies={cookies}>
			<Stack spacing="45px" flexDir="column" maxW="1200px" w="100%" mt="50px">
				<Select
					// @ts-ignore
					onChange={setSort}
					defaultValue={sort}
					options={options}
					styles={customStyles}
					isSearchable={false}
					style={{ minWidth: '0' }}
				/>
				<Box mt="50px">{sort.value === 'rank' ? <Rank leaderboards={xp} /> : sort.value === 'votes' ? <Votes leaderboards={votes} /> : sort.value === 'messages' ? <Messages leaderboards={messages} /> : <Tokens leaderboards={tokens} />}</Box>
			</Stack>
		</Layout>
	);
}
//
function Votes({ leaderboards }: any): JSX.Element {
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
				return <DefaultLeaderboard key={user.tag} user={user} index={index} stat_name="Votes" stat_to_show={user.votes.all} is_rank={false} />;
			})}
		</>
	);
}
//
//
function Rank({ leaderboards }: any): JSX.Element {
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
function Tokens({ leaderboards }: any): JSX.Element {
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
				return <DefaultLeaderboard key={user.tag} user={user} index={index} stat_name="Tokens" stat_to_show={user.tokens} is_rank={false} />;
			})}
		</>
	);
}
//
//
function Messages({ leaderboards }: any): JSX.Element {
	const newLeaderboards = leaderboards.sort((a: any, b: any) => {
		if (a.messages === b.messages) {
			return a.tag === b.tag ? 0 : a.tag > b.tag ? 1 : -1;
		}
		return b.messages - a.messages;
	});

	return (
		<>
			{newLeaderboards.map((user: any, index: number) => {
				return <DefaultLeaderboard key={user.tag} user={user} index={index} stat_name="Messages" stat_to_show={user.messages.all} is_rank={false} />;
			})}
		</>
	);
}
//
//
function Osu({ leaderboards }: any): JSX.Element {
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
			<Flex justify="center" align="center" w={{ base: '100%', md: 'inherit' }}>
				<Box w={{ base: '100%', md: '85px' }} mx={{ base: 0, md: 3 }}>
					<Text fontSize="s" color="osu">
						{stat_name}
					</Text>
					{is_rank || stat_to_show}
				</Box>
				{is_rank && (
					<Box w={{ base: '100%', md: '85px' }} mx={{ base: 0, md: 3 }}>
						<Level user={user.nextLvlPercent} />
					</Box>
				)}
			</Flex>

			<Divider display={{ base: 'block', md: 'none' }} />
		</Flex>
	);
}
