/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeaderboards } from "@api/server";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { useState } from "react";
import Select from "react-select";
import { DiscordUser } from "types";

const options = [
	{ value: "votes", label: "Votes" },
	{ value: "messages", label: "Messages" },
	{ value: "tokens", label: "Tokens" },
	{ value: "osu", label: "Osu Rank" },
];

/* secondary: "#f6a", primary: "#7549ac", primary2: "#fab107", */

const customStyles = {
	option: (provided, state) => ({
		...provided,
		borderBottom: "1px solid white",
		backgroundColor: state.isSelected ? "#fab107" : "#7549ac",
	}),

	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";

		return { ...provided, opacity, transition };
	},
};

export default function Custom({
	session,
	leader,
}: {
	session: DiscordUser;
	leader: any;
}): JSX.Element {
	console.log(leader);
	const [sort, setSort] = useState(options[0]);
	const [leaderboards, setLeaderboards] = useState(
		leader.lbAll
			.map((user) => {
				return {
					img: user.id,
					tag: user.tag,
					votes: {
						all: user.votes.all,
						monthly: user.votes.month,
					},
					tokens: user.tokens,
					// lvl: user.guild.lvl
					// xp: user.guild.xp
				};
			})
			.sort((a, b) => {
				return b.votes.all - a.votes.all;
			})
	);

	// useEffect(() => {
	// 	console.log(leader.lbAll);
	// });

	return (
		<Layout session={session}>
			<Box w="100%">
				<Select
					defaultValue={sort}
					onChange={setSort}
					options={options}
					styles={customStyles}
					isSearchable={false}
				/>
				{leaderboards.map((user: any, index: number) => {
					return (
						<Flex
							key={user.tag}
							justify="space-between"
							align="center"
							my={5}
							textAlign="center"
						>
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
								boxSize="50px"
								justify="center"
								align="center"
								rounded="50%"
							>
								<Text>{index + 1}</Text>
							</Flex>

							<Flex w="100px" justify="center">
								<Image src="/logo.png" w="60px" rounded="50%" />
							</Flex>

							<Text w="200px" textAlign="left">
								{user.tag}
							</Text>
							<Text w="100px">{user.votes.all}</Text>
							<Text w="100px">{user.votes.monthly}</Text>
							<Text w="100px">{user.tokens}</Text>
						</Flex>
					);
				})}
			</Box>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	if (!session) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
	}

	if (!context.req.cookies.guild) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session } };
	}

	const leader = await getLeaderboards(
		// @ts-ignore
		session.accessToken,
		context.req.cookies.guild
	);

	return { props: { session, leader } };
}
