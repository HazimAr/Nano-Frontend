/* eslint-disable no-negated-condition */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getId } from "@api/discord";
import { getOsuRank, getUser, loginOsu } from "@api/server";
import {
	AspectRatio,
	Avatar,
	Box,
	Center,
	CircularProgress,
	Flex,
	FormControl,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import Level from "@components/dashboard/profile/level";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DiscordUser } from "types";

export default function Profile({
	session,
	osu,
	guildId,
	serverUser,
}: {
	session: DiscordUser;
	osu: any;
	guildId: string;
	serverUser: any;
}): JSX.Element {
	console.log(serverUser);
	// console.log(osu);
	const [osuState, setOsuState] = useState(osu);
	const [osuGame, setOsuGame] = useState(osu.osu);
	const [search, setSearch] = useState("");
	const [game] = useState("osu");
	const [loading, setLoading] = useState(false);
	const [fromUser, setFromUser] = useState(false);
	const router = useRouter();

	useEffect(() => {
		game === "osu"
			? setOsuGame(osuState.osu)
			: game === "taiko"
			? setOsuGame(osuState.taiko)
			: game === "fruits"
			? setOsuGame(osuState.fruits)
			: game === "mania"
			? setOsuGame(osuState.mania)
			: null;
	}, [osuState]);

	useEffect(() => {
		// console.log(osuState);
	}, [osuState]);

	return (
		<Layout session={session}>
			<Stack spacing={3} flexDir="column" maxW="1000px" w="100%">
				<HStack spacing={5} align="center">
					<Avatar
						size="2xl"
						name={session.user.name}
						src={session.user.image}
						fallbackSrc="/oss.png"
					/>
					<Heading>{session.user.name}</Heading>
					<Box>
						{guildId ? (
							<Level
								user={serverUser}
								guild={guildId}
								size={75}
							/>
						) : (
							<>
								<Text fontSize="lg">To see your level</Text>
								<Button
									onClick={() => router.push("/dashboard")}
								>
									Choose A Guild
								</Button>
							</>
						)}
					</Box>
					<Box>
						<Text>
							Prefix:{" "}
							{serverUser.premium !== "none" ? (
								serverUser.prefix
							) : (
								<Button
									ml={3}
									onClick={() => {
										void router.push("/dashboard/premium");
									}}
								>
									Join Premium
								</Button>
							)}
						</Text>
						<Text>Tokens: {serverUser.tokens}</Text>
						<Text>Messages: {serverUser.messages.all}</Text>
						<Text>
							Votes: {serverUser.votes.all}
							<Button
								ml={3}
								fontSize="6px"
								onClick={() => {
									void router.push("/vote");
								}}
							>
								Vote
							</Button>
						</Text>
					</Box>
				</HStack>
				{/* <Divider /> */}
				<form
					style={{ width: "100%" }}
					onSubmit={async (e) => {
						e.preventDefault();
						setLoading(true);
						const newOsu = await getOsuRank(search);
						setLoading(false);
						setOsuState(newOsu);

						if (!fromUser) {
							setFromUser(true);
						}
					}}
				>
					<FormControl isRequired>
						<Input
							placeholder="Search an osu user or discord id"
							w="100%"
							onChange={(event: any) => {
								setSearch(event.target.value);
							}}
						/>
					</FormControl>
				</form>
				<Flex justify="center">
					<Center>
						<CircularProgress
							isIndeterminate
							color="brand.primary"
							trackColor="transparent"
							size={550}
							display={loading ? "block" : "none"}
						/>
					</Center>
					{osuGame?.rank_history && !loading ? (
						<Box maxW="75%" w="100%">
							<HStack>
								<Avatar
									size="2xl"
									name={osuState.osu?.username}
									src={osuState.osu?.avatar_url}
									fallbackSrc="/oss.png"
								/>
								<Box w="100%">
									<Heading>{osuState.osu.username}</Heading>
									<HStack spacing={5}>
										<Box>
											<Text>
												Rank:{" "}
												{
													osuState.osu?.statistics
														.global_rank
												}
											</Text>
											<Text>
												{osuState.osu?.country.name}:{" "}
												{
													osuState.osu?.statistics
														.country_rank
												}
											</Text>
											<Text>
												Accuracy:{" "}
												{
													osuState.osu?.statistics
														.hit_accuracy
												}
											</Text>
										</Box>
										<Box>
											<Text>
												Rank:{" "}
												{
													osuState.osu?.statistics
														.global_rank
												}
											</Text>
											<Text>
												{osuState.osu?.country.name}:{" "}
												{
													osuState.osu?.statistics
														.country_rank
												}
											</Text>
											<Text>
												Accuracy:{" "}
												{
													osuState.osu?.statistics
														.hit_accuracy
												}
											</Text>
										</Box>
									</HStack>
								</Box>
							</HStack>

							<Box
								bgImage={osuState.theme?.websiteImage}
								bg={osuState.theme?.bg}
								rounded="10px"
								style={{
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
								}}
							>
								<AspectRatio ratio={6 / 4}>
									<HighchartsReact
										highcharts={Highcharts}
										options={graph(
											osuState.theme,
											osuGame.rank_history
										)}
										styles={{ fontFamily: "Gagalin" }}
									/>
								</AspectRatio>
								<Text
									color={osuState.theme.daysAgoColor}
									textAlign="center"
									my={3}
									style={{
										color: osuState.theme.axisLabelColors,
										fontFamily: "Gagalin",
										fontSize: 18,
									}}
								>
									Days Ago
								</Text>
							</Box>
						</Box>
					) : osuState.osu && !loading && !fromUser ? (
						<Heading textAlign="center">
							No Osu Rank For Your Profile
						</Heading>
					) : osuState.osu && !loading && fromUser ? (
						<Heading textAlign="center">
							Found No Stats for {search}
						</Heading>
					) : null}
				</Flex>
				<Stack justify="center" align="center">
					{osu.osu ? null : (
						<Button
							onClick={async () => {
								// console.log(await loginOsu(session.accessToken));

								const link = await loginOsu(
									session.accessToken
								);
								await router.push(link);
							}}
						>
							Sign in with Osu
						</Button>
					)}
					<Button
						onClick={async () => {
							await signOut();
						}}
					>
						Log Out
					</Button>
				</Stack>
			</Stack>
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
		return { props: { session } };
	}
	// const osu = context.req.cookies.osu ?? null;
	// @ts-expect-error ik dummy
	const id = await getId(session?.accessToken);
	const serverUser = await getUser(id);
	const osu = await getOsuRank(id);
	// console.log(serverUser);

	const guildId = "199325828843044865";
	// const guildId = context.req.cookies.guild;

	return { props: { session, osu, guildId, serverUser } };
}

function graph(theme: any, data: any[][]) {
	return {
		chart: {
			type: "spline",
			backgroundColor: theme.bg,

			margin: [20, 25, 25, 70],
			spacing: [60, 15, 60, 90],
		},
		title: { text: "" },
		subtitle: { text: "" },
		yAxis: {
			allowDecimals: false,
			lineWidth: 1,
			lineColor: theme.axisLineColors,
			gridLineColor: theme.YaxisPlotLineColor,
			gridLineWidth: theme.YaxisPlotLineWidth,
			reversed: true,
			tickWidth: 0,
			title: { text: "" },
			labels: {
				// The Tick Values
				enabled: true,
				allowOverlap: true,
				overflow: "allow",
				style: {
					color: theme.axisLabelColors,
					fontFamily: "Gagalin",
					fontSize: 18,
				},
			},
		},
		xAxis: {
			lineWidth: 1,
			lineColor: theme.axisLineColors,
			gridLineWidth: 0,
			reversed: true,
			tickWidth: 0,
			title: { text: "" },
			labels: {
				// The Tick Values
				enabled: true,
				allowOverlap: true,
				overflow: "allow",
				style: {
					color: theme.axisLabelColors,
					fontFamily: "Gagalin",
					fontSize: 18,
				},
			},
		},
		legend: { itemStyle: { color: "#CFD8DC" } },
		plotOptions: {
			series: {
				marker: { enabled: false },

				lineColor: theme.lineColor,
				lineWidth: 3.5,
				name: false,
			},
		},

		credits: false,

		series: [{ showInLegend: false, data }],
	};
}
