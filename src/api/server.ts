/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { SERVER_URL } from "config";
import { getId } from "./discord";

const config = {
	timeout: 1000 * 10,
};

export async function getLeaderboards() {
	const { data } = await axios.post(`${SERVER_URL}/leaderboards`, config);
	return data;
}

export async function getGuildLeaderboards(guild_id) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/leaderboards`,
		{ guild_id },
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
		`${SERVER_URL}/u/getMongoProfile`,
		{ id },
		config
	);

	return data;
}

export async function getMongoGuild(id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/getMongoGuild`,
		{ id },
		config
	);

	return data;
}

export async function getDiscordGuild(id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/getDiscordGuild`,
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
		`${SERVER_URL}/p/g/customCommand`,
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
	const { data } = await axios.put(`${SERVER_URL}/p/customCommand/delete`, {
		guild_id,
		command_id,
		authorization: `Bearer ${token}`,
	});
	return data;
}

export async function getGuildChannels(guild_id: string, token: unknown) {
	const config = {
		timeout: 1000 * 5,
		headers: {
			authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		`${SERVER_URL}/g/channels`,
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
		`${SERVER_URL}/p/g/timers`,
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
		`${SERVER_URL}/g/timers`,
		{ guild_id },
		config
	);
	return data;
}

export async function getGuildPremium(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/p/g/premium`,
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
		`${SERVER_URL}/p/g/timers/delete`,

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
		`${SERVER_URL}/p/reactionRoles`,
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
	reaction_role_id: string,
	_delete: boolean = false,
	message: string,
	token: unknown,
	role_rows: any[]
) {
	const { data } = await axios.put(
		`${SERVER_URL}/p/reactionRoles`,
		{
			guild_id,
			channel_id,
			reaction_role_id,
			_delete,
			message,
			role_rows,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}

export async function getGuildReactionRoles(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/p/reactionRoles`,
		{
			guild_id,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}

export async function getNanoCommands(guild_id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/nanoCommands`,
		{
			guild_id,
		},
		config
	);
	return data;
}

export async function updateNanoCommands(
	guild_id: string,
	commandsToChange: object,
	token: string
) {
	const { data } = await axios.put(
		`${SERVER_URL}/p/g/nanoCommands`,
		{
			guild_id,
			commandsToChange,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}
