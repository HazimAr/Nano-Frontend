/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env;

const options = {
	providers: [
		Providers.Discord({
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET,
			type: 'oauth',
			version: '2.0',
			scope: 'email connections guilds identify',
		}),
	],
	callbacks: {
		async jwt(token: { accessToken: any }, _: any, account: { accessToken: any }) {
			// Add access_token to the token right after signing in

			if (account?.accessToken) {
				token.accessToken = account.accessToken;
			}

			return token;
		},
		async session(session: any, token: any, user: any) {
			// Add property to session, like an access_token from a provider.
			session.accessToken = token.accessToken;
			session.user.id = token.sub;
			return session;
		},
	},
};

export default async function getAuth(req: any, res: any) {
	// @ts-ignore
	return NextAuth(req, res, options);
}
