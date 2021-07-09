/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { DISCORD_BASE_URL, SERVER_URL } from "config";

async function getGuilds(token: string) {
	const config = {
		timeout: 1000 * 5,
		headers: {
			// @ts-ignore
			authorization: `Bearer ${token}`,
		},
	};

	const og = await axios.get(
		`${DISCORD_BASE_URL}/users/@me/guilds`,

		config
	);

	const ids = og.data.map((guild: any) => guild.id);

	const { data } = await axios.post(
		`${SERVER_URL}/guilds/nanoInGuilds`,
		{ ids, authorization: `Bearer ${token}` },
		config
	);

	ids?.forEach((id: any, index: number) => {
		if (data.includes(id)) {
			og.data[index].nano = true;
			return;
		}
		og.data[index].nano = false;
	});

	return og.data;
}

async function getId(accessToken: string): Promise<string> {
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
