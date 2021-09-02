/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { DISCORD_BASE_URL } from 'config';

// Can't destructure non-standard js process.env
// https://nextjs.org/docs/basic-features/environment-variables
const HOST_DOMAIN = process.env.HOST_DOMAIN;

async function getGuilds(token: string) {
	const config = { timeout: 1000 * 10, headers: { authorization: `Bearer ${token}` } };
	return (await axios.post(`${HOST_DOMAIN}/u/get_guilds`, { authorization: `Bearer ${token}` }, config)).data;
}

async function getId(accessToken: string) {
	const config = { timeout: 1000 * 5, headers: { authorization: `Bearer ${accessToken}` } };
	return (await axios.get(`${DISCORD_BASE_URL}/users/@me`, config)).data?.id; // Needs to be done differently (no @me on front-end)
}

export { getGuilds, getId };
