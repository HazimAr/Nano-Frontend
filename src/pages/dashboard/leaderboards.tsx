/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeaderboards } from "@api/server";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { Rank, Votes } from "@components/dashboard/leaderboards/types";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
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
	console.log(leader);
	guild_id = BigInt(guild_id);
	const [sort, setSort] = useState(options[0]);
	const [leaderboards, setLeaderboards] = useState(
		leader.lbAll
			.map((user: any) => {
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
					nextLvl: user?.guilds[guild_id]?.nextLvlPercent,
					messages: user?.guilds[guild_id]?.messages?.all,
				};
			})
			.sort(
				(
					a: { votes: { all: number } },
					b: { votes: { all: number } }
				) => {
					return b.votes.all - a.votes.all;
				}
			)
	);

	useEffect(() => {
		console.log(leaderboards);
	}, [leaderboards]);

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
				{leaderboards.map((user: any, index: number) => {
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
										src={user.img ? user.img : "/logo.png"}
										boxSize="50px"
										rounded="50%"
									/>
								</Flex>

								<Text maxW="300px" textAlign="left">
									{user.tag}
								</Text>
							</Flex>
							{sort.value === "rank" ? (
								<Rank
									user={user}
									leaderboards={leaderboards}
									setLeaderboards={setLeaderboards}
								/>
							) : sort.value === "votes" ? (
								<Votes
									user={user}
									leaderboards={leaderboards}
									setLeaderboards={setLeaderboards}
								/>
							) : null}
							<Divider display={{ base: "block", md: "none" }} />
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

	const guild_id = "199325828843044865";
	// const guild_id = context.req.cookies.guild;

	return { props: { session, leader, guild_id } };
}

/* <Box w={{ base: "100%", md: "50px" }}>
									<Text fontSize="xs" color="text.400">
										Tokens
									</Text>
									{user.tokens}
								</Box> */
