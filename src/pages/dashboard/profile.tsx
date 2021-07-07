/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AspectRatio, Box, Flex } from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import highchartsExporting from "highcharts/modules/exporting";
import { getSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

const data = [
	[23, 493369],
	[22, 494080],
	[21, 494790],
	[20, 495479],
	[19, 496140],
	[18, 496878],
	[17, 497599],
	[16, 498282],
	[15, 498973],
	[14, 499706],
	[13, 500392],
	[12, 501068],
	[11, 501768],
	[10, 502497],
	[9, 503130],
	[8, 503797],
	[7, 504446],
	[6, 505049],
	[5, 505703],
	[4, 506225],
	[3, 506852],
	[2, 507472],
	[1, 508100],
	[0, 508742],
];
const theme = {
	// Galaxy
	bg: null,
	lineColor: {
		linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
		stops: [
			[0, "#261e47"],
			[0.5, "#8e22a9"],
			[1, "#da46d8"],
		],
	},
	axisLabelColors: "#8e22a9",
	axisLineColors: "WHITE",
	daysAgoColor: "#da46d8",
	YaxisPlotLineColor: "WHITE",
	YaxisPlotLineWidth: 0.2,
	bgImage: "/theme/galaxy.png",
};

const options: Highcharts.Options = {
	chart: {
		type: "spline",
		// @ts-expect-error null can be retard
		backgroundColor: theme.bg,

		margin: [70, 25, 70, 70],
		spacing: [60, 15, 60, 90],
	},
	title: { text: "" },
	subtitle: { text: "" },
	// @ts-expect-error style can be used
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
			zIndex: 100,
			style: {
				color: theme.axisLabelColors,
				fontFamily: "Gagalin",
				fontSize: 18,
			},
		},
	},
	// @ts-expect-error style can be used
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
			// @ts-expect-error lineColor on series object
			lineColor: theme.lineColor,
			lineWidth: 3.5,
			name: false,
		},
	},
	// @ts-expect-error credits can be used
	credits: false,
	// @ts-expect-error data can be used
	series: [{ showInLegend: false, data }],
};

export default function Four({ session }: any): JSX.Element {
	// if (typeof Highcharts === "object") {
	// 	highchartsExporting(Highcharts);
	// }
	const router = useRouter();
	return (
		<Layout session={session}>
			<Flex flexDir="column" justify="center" maxW="1000px" w="100%">
				<Box bgImage={theme.bgImage} rounded="10px">
					<AspectRatio ratio={{ base: 1, md: 16 / 9 }}>
						<HighchartsReact
							highcharts={Highcharts}
							options={options}
							styles={{ fontFamily: "Gagalin" }}
						/>
					</AspectRatio>
				</Box>

				<Flex justify="center" align="center">
					<Button
						onClick={async () => {
							await signOut();
							// await router.push(
							// 	`https://osu.ppy.sh/oauth/authorize?client_id=${OSU_V2ID}&redirect_uri=https://nano-osu.teamdragonsden.com/signin-osu&response_type=code&scope=public&state=${state}`
							// );
						}}
					>
						Sign in with Osu
					</Button>
					<Button
						onClick={async () => {
							await signOut();
							await router.push("/");
						}}
					>
						Log Out
					</Button>
				</Flex>
			</Flex>
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

	return { props: { session } };
}
