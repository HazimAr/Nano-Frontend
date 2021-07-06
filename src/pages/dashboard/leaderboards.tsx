/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeaderboards } from "@api/server";
import { Box } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { Rank, Votes } from "@components/dashboard/leaderboards/types";
import { getSession } from "next-auth/client";
import { useState } from "react";
import Select from "react-select";
import { DiscordUser } from "types";

const options = [
	{ value: "rank", label: "Rank" },
	{ value: "votes", label: "Votes" },
	{ value: "messages", label: "Messages" },
	{ value: "tokens", label: "Tokens" },
	{ value: "osu", label: "Osu Rank" },
];

/* secondary: "#f6a", primary: "#7549ac", primary2: "#fab107", */

const customStyles = {
	option: (provided: any, state: { isSelected: any }) => ({
		...provided,
		borderBottom: "1px solid white",
		backgroundColor: state.isSelected ? "#fab107" : "#7549ac",
	}),

	singleValue: (provided: any, state: { isDisabled: any }) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";

		return { ...provided, opacity, transition };
	},
};

export default function Custom({
	session,
	leader,
	guild_id,
}: {
	session: DiscordUser;
	guild_id: any;
	leader: any;
}): JSX.Element {
	guild_id = BigInt(guild_id);
	const [sort, setSort] = useState(options[0]);
	const [leaderboards] = useState(
		leader.lbAll.map((user: any) => {
			return {
				img: user?.img,
				tag: user?.tag,
				votes: {
					all: user?.votes?.all,
					monthly: user?.votes?.month,
				},
				tokens: user?.tokens,
				lvl: user?.guilds[guild_id]?.lvl,
				xp: user?.guilds[guild_id]?.xp,
				donated: user?.guilds[guild_id]?.donatedTokens,
				nextLvlPercent: user?.guilds[guild_id]?.nextLvlPercent,
				messages: user?.guilds[guild_id]?.messages?.all,
			};
		})
	);

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
				/>
				{sort.value === "rank" ? (
					<Rank leaderboards={leaderboards} />
				) : (
					<Votes leaderboards={leaderboards} />
				)}
			</Box>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	if (!session?.accessToken) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
		return { props: { session } };
	}

	// if (!context.req.cookies.guild) {
	// 	context.res.writeHead(307, {
	// 		Location: "/dashboard",
	// 	});
	// 	context.res.end();
	// 	return { props: { session } };
	// }

	const leader = await getLeaderboards(
		// @ts-ignore
		session?.accessToken,
		context.req.cookies?.guild
	);

	const guild_id = "199325828843044865";
	// const guild_id = context.req.cookies.guild;

	return { props: { session, leader, guild_id } };
}
