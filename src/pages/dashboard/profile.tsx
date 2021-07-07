/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import { getSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const oldData = [
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

const newData: any[] | undefined = [];
oldData.forEach((day) => newData.push({ day: day[0], rank: day[1] }));

// const data = [
// 	{ name: 23, value: 493369 },
// 	{ name: 22, value: 494080 },
// 	{ name: 21, value: 494790 },
// 	{ name: 20, value: 495479 },
// 	{ name: 19, value: 496140 },
// 	{ name: 18, value: 496878 },
// 	{ name: 17, value: 497599 },
// 	{ name: 16, value: 498282 },
// 	{ name: 15, value: 498973 },
// 	{ name: 14, value: 499706 },
// 	{ name: 13, value: 500392 },
// 	{ name: 12, value: 501068 },
// 	{ name: 11, value: 501768 },
// 	{ name: 10, value: 502497 },
// 	{ name: 9, value: 503130 },
// 	{ name: 8, value: 503797 },
// 	{ name: 7, value: 504446 },
// 	{ name: 6, value: 505049 },
// 	{ name: 5, value: 505703 },
// 	{ name: 4, value: 506225 },
// 	{ name: 3, value: 506852 },
// 	{ name: 2, value: 507472 },
// 	{ name: 1, value: 508100 },
// 	{ name: 0, value: 508742 },
// ];

export default function Four({ session }: any): JSX.Element {
	const router = useRouter();
	return (
		<Layout session={session}>
			<Box>
				<LineChart width={500} height={300} data={newData}>
					<XAxis
						dataKey="day"
						style={{
							fontFamily: "Gagalin",
						}}
					/>
					<YAxis
						minTickGap={0}
						reversed
					
						style={{
							fontFamily: "Gagalin",
						}}
					/>
					<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
					<Line type="monotone" dataKey="rank" stroke="#8884d8" />
				</LineChart>
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

	return { props: { session } };
}
