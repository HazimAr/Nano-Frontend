/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-negated-condition */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getOsuRank, getUser, loginOsu } from '@api/server';
import { AspectRatio, Avatar, Box, Center, CircularProgress, Flex, FormControl, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';
import Button from '@components/button';
import Layout from '@components/guild/layout';
import Level from '@components/guild/profile/level';
import NextChakraLink from '@components/nextChakraLink';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DiscordUser } from 'types';
//
//
export async function getServerSideProps(context: any) {
	const session: any = (await getSession(context)) as DiscordUser;
	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	const promises: Promise<any>[] = [];

	const props: Record<string, any> = { session };

	// for serverUser, osu, and guildId
	promises.push(
		getUser(session.accessToken).then((user: any) => {
			const osu = user.osu ?? '';

			const guild_id = context.req.url.split('/')[2] ?? '';

			props.serverUser = user;
			props.osu = osu;
			props.guildId = guild_id;
		})
	);

	// for the login link
	promises.push(
		loginOsu(session.accessToken).then((success) => {
			props.loginLink = success;
		})
	);

	return Promise.all(promises).then(() => {
		return { props };
	});
}
//
//
export default function Profile({ session, osu, guildId, serverUser, loginLink }: { session: DiscordUser; osu: any; guildId: string; serverUser: any; loginLink: string }): JSX.Element {
	console.log(serverUser);
	const serverUser2 = serverUser.mongoUserObject.guilds[guildId];

	const [osuState, setOsuState] = useState(osu);
	const [osuGame, setOsuGame] = useState(osu.osu);
	const [search, setSearch] = useState('');
	const [game] = useState('osu');
	const [loading, setLoading] = useState(false);
	const [fromUser, setFromUser] = useState(false);
	const router = useRouter();

	// console.log(`osu.osu object: ${osu.osu}`);
	// console.log(`osu object:`);
	// console.log(JSON.stringify(osu));

	useEffect(() => {
		game === 'osu' ? setOsuGame(osuState.osu) : game === 'taiko' ? setOsuGame(osuState.taiko) : game === 'fruits' ? setOsuGame(osuState.fruits) : game === 'mania' ? setOsuGame(osuState.mania) : null;
	}, [osuState]);

	return (
		<Layout session={session}>
			<Stack spacing={3} flexDir="column" maxW="1200px" w="100%">
				{guildId ? (
					<HStack
						// spacing={5}
						align="center"
						flexDir={{ base: 'column', sm: 'row' }}
						mt={5}
						spacing={0}
					>
						<Flex align="center">
							<Avatar
								// size="lg"
								boxSize={{
									base: '75px',
									sm: '125px',
									md: '175px',
								}}
								name={session.user.name}
								src={session.user.image}
								fallbackSrc="/oss.png"
							/>
							<Heading ml={5}>{session.user.name}</Heading>
							<Box mx={3}>
								<Level user={serverUser.mongoUserObject.nextLvlPercent} guild={guildId} size={75} />
							</Box>
						</Flex>
						<Flex flexDir={{ base: 'row', sm: 'column' }} align={{ base: 'center', sm: 'flex-start' }} justify={{ base: 'center', sm: 'flex-start' }} textAlign={{ base: 'center', sm: 'left' }}>
							{/* <Text w="100%">Tokens: {serverUser.tokens}</Text> */}
							<Text w="100%">Messages: {serverUser2?.messages}</Text>
							<Text w="100%">
								Votes: {serverUser2?.votes}{' '}
								<Button
									fontSize="6px"
									onClick={() => {
										void router.push('/vote');
									}}
								>
									Vote
								</Button>
							</Text>
						</Flex>
					</HStack>
				) : (
					<Heading textAlign="center">Select a guild to see your stats</Heading>
				)}
				{/* <Divider /> */}
				<form
					style={{ width: '100%' }}
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
						<CircularProgress isIndeterminate color="brand.primary" trackColor="transparent" size={200} display={loading ? 'block' : 'none'} />
					</Center>
					{osuGame?.rank_history && !loading ? (
						<Box w="100%">
							<HStack flexDir={{ base: 'column', sm: 'row' }}>
								<Avatar
									boxSize={{
										base: '100px',
										sm: '150px',
										md: '200px',
									}}
									name={osuState.osu?.username}
									src={osuState.osu?.avatar_url}
									// fallbackSrc="/oss.png"
								/>
								<Box w="100%">
									<Flex
										justify={{
											base: 'center',
											sm: 'flex-start',
										}}
									>
										<Heading>{osuState.osu.username}</Heading>
									</Flex>
									<HStack
										spacing={10}
										justify={{
											base: 'center',
											sm: 'flex-start',
										}}
									>
										<Box>
											<Text>Rank: {osuState.osu?.statistics.global_rank}</Text>
											<Text>
												{osuState.osu?.country.name}: {osuState.osu?.statistics.country_rank}
											</Text>

											<Text>PP: {osuState.osu?.statistics.pp}</Text>
										</Box>
										<Box>
											<Text>Level: {osuState.osu?.statistics.level.current}</Text>
											<Text>Play Count: {osuState.osu?.statistics.play_count}</Text>
											<Text>Accuracy: {osuState.osu?.statistics.hit_accuracy}</Text>
										</Box>
									</HStack>
								</Box>
							</HStack>
							<Box
								bgImage={osuState.theme?.websiteImage}
								bg={osuState.theme?.bg}
								rounded="10px"
								style={{
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover',
								}}
							>
								<AspectRatio ratio={6 / 4}>
									<HighchartsReact highcharts={Highcharts} options={graph(osuState.theme, osuGame.rank_history)} styles={{ fontFamily: 'Gagalin' }} />
								</AspectRatio>
								<Text
									color={osuState.theme.daysAgoColor}
									textAlign="center"
									my={3}
									style={{
										color: osuState.theme.axisLabelColors,
										fontFamily: 'Gagalin',
										fontSize: 18,
									}}
								>
									Days Ago
								</Text>
							</Box>
						</Box>
					) : osuGame && !loading && !fromUser ? (
						<Heading textAlign="center">No Osu Rank For Your Profile</Heading>
					) : osuGame && !loading && fromUser ? (
						<Heading textAlign="center">Found No Stats for {search}</Heading>
					) : null}
				</Flex>
				<Stack justify="center" align="center">
					{loginLink ? (
						<NextChakraLink href={loginLink} isExternal>
							<Button>Sign in with Osu</Button>
						</NextChakraLink>
					) : null}
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

function graph(theme: any, data: any[][]) {
	return {
		chart: {
			type: 'spline',
			backgroundColor: theme.bg,

			margin: [20, 25, 25, 70],
			spacing: [60, 15, 60, 90],
		},
		title: { text: '' },
		subtitle: { text: '' },
		yAxis: {
			allowDecimals: false,
			lineWidth: 1,
			lineColor: theme.axisLineColors,
			gridLineColor: theme.YaxisPlotLineColor,
			gridLineWidth: theme.YaxisPlotLineWidth,
			reversed: true,
			tickWidth: 0,
			title: { text: '' },
			labels: {
				// The Tick Values
				enabled: true,
				allowOverlap: true,
				overflow: 'allow',
				style: {
					color: theme.axisLabelColors,
					fontFamily: 'Gagalin',
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
			title: { text: '' },
			labels: {
				// The Tick Values
				enabled: true,
				allowOverlap: true,
				overflow: 'allow',
				style: {
					color: theme.axisLabelColors,
					fontFamily: 'Gagalin',
					fontSize: 18,
				},
			},
		},
		legend: { itemStyle: { color: '#CFD8DC' } },
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
