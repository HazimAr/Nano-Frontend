/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest, createTimer } from '@api/server';
import { getSession } from 'next-auth/client';
import { DiscordUser } from 'types';
import { SELECT_FIVE } from '@components/select_five';
//
// --------- 🚚 🚚 🚚 🚚 🚚 🚚 🚚 🚚 ---------
export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	const { cookies } = context.req;

	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	const api_response = await defaultPostRequest('g/timers', cookies.guild_id, session.accessToken);

	return { props: { session, api_response, cookies } };
}
export default function Timers(props: { session: DiscordUser; api_response: any; cookies: any }): JSX.Element {
	return <SELECT_FIVE key={props.cookies.guild_id} {...props} />;
}
