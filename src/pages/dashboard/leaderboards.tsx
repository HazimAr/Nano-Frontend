/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeaderboards } from "@api/server";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
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
			<Box maxW="700px" w="100%">
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
										src="/logo.png"
										boxSize="50px"
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
								<Box w={{ base: "100%", md: "50px" }}>
									<Text fontSize="xs" color="text.400">
										Votes(A)
									</Text>
									{user.votes.all}
								</Box>
								<Box
									w={{ base: "100%", md: "50px" }}
									mx={{ base: 0, md: 3 }}
								>
									<Text fontSize="xs" color="text.400">
										Votes(M)
									</Text>
									{user.votes.monthly}
								</Box>
								<Box w={{ base: "100%", md: "50px" }}>
									<Text fontSize="xs" color="text.400">
										Tokens
									</Text>
									{user.tokens}
								</Box>
							</Flex>
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

	return { props: { session, leader } };
}
