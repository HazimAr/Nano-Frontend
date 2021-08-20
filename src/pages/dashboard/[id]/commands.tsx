// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { defaultPostRequest } from '@api/server';
// import { Heading, Stack } from '@chakra-ui/react';
// import { Commands } from '@components/dashboard/commands/commands';
// import Layout from '@components/dashboard/layout';
// import { getSession } from 'next-auth/client';
// import { DiscordUser } from 'types';

// export default function NanoCommands({ session, commands, guild_id }: { session: DiscordUser; commands: any; guild_id: string }): JSX.Element {
// 	return (
// 		<Layout session={session}>
// 			<Stack spacing={3} flexDir="column" maxW="1200px" w="100%">
// 				<Commands commands={commands} guild_id={guild_id} token={session.accessToken} />
// 			</Stack>
// 		</Layout>
// 	);
// }

// export async function getServerSideProps(context: any) {
// 	const session = await getSession(context);
// 	if (!session) {
// 		context.res.writeHead(307, {
// 			Location: '/',
// 		});
// 		context.res.end();
// 		return { props: { session } };
// 	}
// 	if (!context.req.url.split('/')[2]) {
// 		context.res.writeHead(307, {
// 			Location: '/dashboard',
// 		});
// 		context.res.end();
// 		return { props: { session } };
// 	}

// 	const [, , guild_id] = context.req.url.split('/');
// 	const commands = await defaultPostRequest('commands', guild_id, session.accessToken);

// 	return { props: { session, commands, guild_id } };
// }
