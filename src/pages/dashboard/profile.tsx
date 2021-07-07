/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getId } from "@api/discord";
import { getOsuRank, loginOsu } from "@api/server";
import {
	AspectRatio,
	Box,
	FormControl,
	Heading,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsExporting from "highcharts/modules/exporting";
import { getSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DiscordUser } from "types";

if (typeof Highcharts === "object") {
	highchartsExporting(Highcharts);
}
function graph(theme: any, data: any[][]) {
	return {
		chart: {
			type: "spline",
			backgroundColor: theme.bg,

			margin: [70, 25, 30, 70],
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

export default function Four({
	session,
	osu,
}: {
	session: DiscordUser;
	osu: any;
}): JSX.Element {
	const [osuState, setOsuState] = useState(osu);
	const [osuGame, setOsuGame] = useState(osu.osu);
	const [search, setSearch] = useState("");
	const [game, setGame] = useState("osu");
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
		console.log(osuState);
	}, [osuState]);

	return (
		<Layout session={session}>
			<Stack
				spacing={3}
				flexDir="column"
				justify="center"
				maxW="1000px"
				w="100%"
			>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const newOsu = await getOsuRank(search);
						setOsuState(newOsu);
					}}
				>
					<FormControl isRequired>
						<Input
							placeholder="Search a discord user"
							w="100%"
							onChange={(event: any) => {
								setSearch(event.target.value);
							}}
						/>
					</FormControl>
				</form>

				{osuGame?.rank_history ? (
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
				) : osu.osu ? (
					<Heading textAlign="center">Found No Stats</Heading>
				) : null}
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
	}
	// const osu = context.req.cookies.osu ?? null;
	// @ts-expect-error ik dummy
	const id = await getId(session.accessToken);
	const osu = await getOsuRank(id);

	return { props: { session, osu } };
}
