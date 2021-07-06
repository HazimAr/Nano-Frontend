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
			Authorization: `Bearer ${token}`,
		},
	};
	const og = await axios.get(
		`${DISCORD_BASE_URL}/users/@me/guilds`,

		config
	);

	const guilds = og.data.map((guild: any) => guild.id);
	console.log(guilds);
	const { data } = await axios.post(
		`${SERVER_URL}/guilds`,
		{ guilds, myOtherKey: "my value" },
		config
	);
	console.log(data);

	guilds.forEach((guild: any) => {
		if (data.includes(guild.id)) {
			guilds.nano = true;
			return;
		}
		guilds.nano = false;
	});
	// console.log(guilds);

	return guilds;
}

export { getGuilds };
