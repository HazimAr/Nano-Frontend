/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeaderboards } from '@api/server';
import { Box, Stack } from '@chakra-ui/react';
import Layout from '@components/dashboard/layout';
import { Messages, Rank, Tokens, Votes } from '@components/dashboard/leaderboards/types';
import { useState } from 'react';
import Select from 'react-select';
import { getSession } from 'next-auth/client';

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
export default function Custom({ api_response, session, cookies }: { api_response: any; session: any; cookies: any }): JSX.Element {
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
