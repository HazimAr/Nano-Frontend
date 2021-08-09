/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { DISCORD_BASE_URL, SERVER_URL } from "config";

async function getGuilds(token: unknown) {
	const config = {
		timeout: 1000 * 5,
		headers: {
			// @ts-ignore
			authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${SERVER_URL}/g/dashboard`,
		{ authorization: `Bearer ${token}` },
		config
	);

	return data;
}

async function getId(accessToken: unknown) {
	const config = {
		timeout: 1000 * 5,
		headers: {
			// @ts-ignore
			authorization: `Bearer ${accessToken}`,
		},
	};

	const { data } = await axios.get(
		`${DISCORD_BASE_URL}/users/@me`,

		config
	);
	return data.id;
}

export { getGuilds, getId };
