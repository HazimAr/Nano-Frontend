/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { DISCORD_BASE_URL, SERVER_URL } from 'config';

async function getGuilds(token: string) {
	const config = { timeout: 1000 * 10, headers: { authorization: `Bearer ${token}` } };
	return (await axios.post(`${SERVER_URL}/u/dashboard`, { authorization: `Bearer ${token}` }, config)).data;
}

async function getId(accessToken: string) {
	const config = { timeout: 1000 * 5, headers: { authorization: `Bearer ${accessToken}` } };
	return (await axios.get(`${DISCORD_BASE_URL}/users/@me`, config)).data.id; // Needs to be done differently (no @me on front-end)
}

export { getGuilds, getId };
