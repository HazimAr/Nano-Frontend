/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuildLeaderboards } from '@api/server';
import { Box } from '@chakra-ui/react';
import Layout from '@components/dashboard/layout';
import { Messages, Osu, Rank } from '@components/dashboard/leaderboards/types';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import Select from 'react-select';
import { DiscordUser } from 'types';

const options = [
	{ value: 'rank', label: 'Rank' },
	{ value: 'messages', label: 'Messages' },
	// { value: "tokens", label: "Tokens" },
	{ value: 'osu', label: 'Osu Rank' },
];

/* secondary: "#f6a", primary: "#7549ac", primary2: "#fab107", */

const customStyles = {
	option: (provided: any, state: { isSelected: any }) => ({
		...provided,
		borderBottom: '1px solid white',
		backgroundColor: state.isSelected ? '#fab107' : '#7549ac',
	}),

	singleValue: (provided: any, state: { isDisabled: any }) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...provided, opacity, transition };
	},
};

export default function Custom({ session, leader, guild_id }: { session: DiscordUser; guild_id: any; leader: any }): JSX.Element {
	const [sort, setSort] = useState(options[0]);

	return (
		<Layout session={session}>
			<Box maxW="700px" w="100%">
				<Select
					// @ts-ignore
					onChange={setSort}
					defaultValue={sort}
					options={options}
					styles={customStyles}
					isSearchable={false}
					style={{ minWidth: '0' }}
				/>
				<Box>
					{
						sort.value === 'rank' ? <Rank leaderboards={leader.xp} guild={guild_id} /> : sort.value === 'osu' ? <Osu leaderboards={leader.osu} /> : <Messages leaderboards={leader.messages} />
						//  (
						// 	<Tokens leaderboards={leader.tokens} />
						// )
					}
				</Box>
			</Box>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);

	if (!session?.accessToken) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	if (!context.req.url.split('/')[2]) {
		context.res.writeHead(307, {
			Location: '/dashboard',
		});
		context.res.end();
		return { props: { session } };
	}

	const guild_id = context.req.url.split('/')[2];
	const leader = await getGuildLeaderboards(guild_id);

	return { props: { session, leader, guild_id } };
}
