/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { SERVER_URL } from "config";

async function getGuilds(token: string) {
	const config = {
		headers: {
			// @ts-ignore
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(
		`${SERVER_URL}/users/@me/guilds`,

		config
	);

	return data;
}

export { getGuilds };