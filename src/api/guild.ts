/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { DISCORD_BASE_URL } from "config";

async function getGuilds(token: string) {
	const { data } = await axios.get(
		`${DISCORD_BASE_URL}/users/@me/guilds`,

		{
			// @ts-ignore
			Authorization: `Bearer ${token}`,
		}
	);

	return data;
}

export { getGuilds };
