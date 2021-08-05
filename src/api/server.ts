/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { SERVER_URL } from "config";
import { getId } from "./discord";

const config = {
	timeout: 1000 * 10,
};

export async function getLeaderboards(token: string, guild_id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/leaderboards`,
		{ authorization: `Bearer ${token}`, guild_id },
		config
	);
	return data;
}

export async function getOsuRank(id: string) {
	const { data } = await axios.post(`${SERVER_URL}/osu/user`, { id }, config);

	return data;
}

export async function getUser(id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/users/getMongoProfile`,
		{ id },
		config
	);

	return data;
}

export async function getGuild(id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/guilds/getMongoGuild`,
		{ id },
		config
	);

	return data;
}

export async function loginOsu(token: string) {
	const id = await getId(token);
	const { data } = await axios.put(
		`${SERVER_URL}/osu/newUser`,
		{ id },
		config
	);
	return data;
}

export async function createCustomCommand(
	guild_id: string,
	trigger: string,
	command_id: string,
	response: any,
	token: string,
	update: boolean = false
) {
	const { data } = await axios.put(
		`${SERVER_URL}/p/guilds/customCommand`,
		{
			guild_id,
			trigger,
			response,
			update,
			command_id,
			authorization: `Bearer ${token}`,
		},
		config
	);

	return data;
}
export async function deleteGuildCommand(
	guild_id: string,
	command_id: string,
	token: unknown
) {
	const { data } = await axios.put(
		`${SERVER_URL}/p/guilds/customCommand/delete`,
		{
			guild_id,
			command_id,
			authorization: `Bearer ${token}`,
		}
	);
	return data;
}
// export async function sendEmbed(
// 	channel_id: string,
// 	embed: never,
// 	token: unknown
// ) {
// 	const { data } = await axios.post(
// 		`${SERVER_URL}/p/guilds/setCustomCommand`,
// 		{ channel_id, embed, authorization: `Bearer ${token}` },
// 		config
// 	);
// 	return data;
// }

export async function getGuildChannels(guild_id: string, token: unknown) {
	const config = {
		timeout: 1000 * 5,
		headers: {
			authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${SERVER_URL}/guilds/channels`,
		{ guild_id },
		config
	);

	return data;
}

export async function createTimer(
	guild_id: string,
	channel_id: string,
	interval: number,
	timer_id: number,
	message: string,
	token: unknown
) {
	const { data } = await axios.put(
		`${SERVER_URL}/p/guilds/timers`,
		{
			guild_id,
			channel_id,
			interval,
			timer_id,
			message,
			authorization: `Bearer ${token}`,
			embed: null,
		},
		config
	);
	return data;
}

export async function getGuildTimers(guild_id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/guilds/timers`,
		{ guild_id },
		config
	);
	return data;
}

export async function getGuildPremium(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/p/guilds/premium`,
		{
			guild_id,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}
export async function deleteGuildTimer(
	guild_id: string,
	timer_id: string,
	token: unknown
) {
	const { data } = await axios.put(
		`${SERVER_URL}/p/guilds/timers/delete`,

		{
			guild_id,
			timer_id,
			authorization: `Bearer ${token}`,
		}
	);
	return data;
}

export async function getGuildEmojis(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/p/guilds/reactionRoles`,
		{
			guild_id,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}

export async function createReactionRoleMessage(
	guild_id: string,
	channel_id: string,
	legend: object,
	token: unknown
) {
	const { data } = await axios.put(
		`${SERVER_URL}/p/guilds/reactionRoles`,
		{
			guild_id,
			channel_id,
			legend,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}


// legend: {
// 	"1": {
// 		emoji: "😊",
// 		message: string,
// 		role_id: string,
// 	}
// }