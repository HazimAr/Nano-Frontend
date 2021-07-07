/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getOsuRank, loginOsu } from "@api/server";
import { AspectRatio, Box, Input, Stack, Text } from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import highchartsExporting from "highcharts/modules/exporting";
import { getSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { DiscordUser } from "types";

function graph(theme: any, data: any[]) {
	// 	const theme = {
	// 	// Galaxy
	// 	bg: null,
	// 	lineColor: {
	// 		linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
	// 		stops: [
	// 			[0, "#261e47"],
	// 			[0.5, "#8e22a9"],
	// 			[1, "#da46d8"],
	// 		],
	// 	},
	// 	axisLabelColors: "#8e22a9",
	// 	axisLineColors: "WHITE",
	// 	daysAgoColor: "#da46d8",
	// 	YaxisPlotLineColor: "WHITE",
	// 	YaxisPlotLineWidth: 0.2,
	// 	bgImage: "/theme/galaxy.png",
	// };

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

		series: [{ showInLegend: false, data: data.reverse() }],
	};
}

export default function Four({
	session,
	osu,
}: {
	session: DiscordUser;
	osu: any;
}): JSX.Element {
	console.log(osu);

	const router = useRouter();
	return (
		<Layout session={session}>
			<Stack
				spacing={3}
				flexDir="column"
				justify="center"
				maxW="1000px"
				w="100%"
			>
				<Input placeholder="Search for anyone's stats" />
				{osu?.osu?.rank_history ? (
					<Box
						bgImage={osu.theme?.websiteImage}
						bg={osu.theme?.bg}
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
									osu.theme,
									osu.osu.rank_history.data
								)}
								styles={{ fontFamily: "Gagalin" }}
							/>
						</AspectRatio>
						<Text
							color={osu.theme.daysAgoColor}
							textAlign="center"
							my={3}
							style={{
								color: osu.theme.axisLabelColors,
								fontFamily: "Gagalin",
								fontSize: 18,
							}}
						>
							Days Ago
						</Text>
					</Box>
				) : null}
				<Stack justify="center" align="center">
					{osu ? null : (
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
	const osu = await getOsuRank(session.accessToken);
	if (osu.osu) {
		osu.osu.rank_history.data.length = 26;
	}

	return { props: { session, osu } };
}
