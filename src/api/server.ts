/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { SERVER_URL } from "config";
import { getId } from "./discord";

const config = {
	timeout: 1000 * 10,
};

async function getLeaderboards(token: string, guild_id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/leaderboards`,
		{ authorization: `Bearer ${token}`, guild_id },
		config
	);
	return data;
}

async function getOsuRank(id: string) {
	const { data } = await axios.post(`${SERVER_URL}/osu/user`, { id }, config);

	return data;
}

async function getUser(id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/users/getMongoProfile`,
		{ id },
		config
	);

	return data;
}

async function loginOsu(token: string) {
	const id = await getId(token);
	const { data } = await axios.put(
		`${SERVER_URL}/osu/newUser`,
		{ id },
		config
	);
	return data;
}

async function createCustomCommand(
	guild_id: string,
	command: string,
	response: any,
	token: string
) {
	const { data } = await axios.post(
		`${SERVER_URL}/guilds/setCustomCommand`,
		{ guild_id, command, response, authorization: `Bearer ${token}` },
		config
	);
	return data;
}

async function sendEmbed(channel_id: string, embed: never, token: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/guilds/setCustomCommand`,
		{ channel_id, embed, authorization: `Bearer ${token}` },
		config
	);
	return data;
}

async function getGuildChannels(guild_id: string, token: string) {
	const config = {
		timeout: 1000 * 5,
		headers: {
			authorization: `Bearer ${token}`,
		},
	};

	// const { data } = await axios.post(
	// 	`${SERVER_URL}/guilds/channels`,
	// 	{ guild_id },
	// 	config
	// );

	return [
		{ name: "channel name 1", id: "2125376427936", category: "category 1" },
		{ name: "channel name 2", id: "2125376427936", category: "category 2" },
	];
}

export {
	getLeaderboards,
	getOsuRank,
	loginOsu,
	getUser,
	sendEmbed,
	createCustomCommand,
	getGuildChannels,
};


