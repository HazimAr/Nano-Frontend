/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { SERVER_URL } from "config";
import { getId } from "./discord";

const config = {
	timeout: 1000 * 10,
};

export async function getLeaderboards() {
	const { data } = await axios.post(`${SERVER_URL}/lb`, config);
	return data;
}

export async function getGuildLeaderboards(guild_id) {
	const { data } = await axios.post(
		`${SERVER_URL}/lb/guild`,
		{ guild_id },
		config
	);
	return data;
}

export async function getOsuRank(id: string) {
	const { data } = await axios.post(`${SERVER_URL}/osu/user`, { id }, config);

	return data;
}

export async function getUser(token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/u/profile`,
		{ authorization: `Bearer ${token}` },
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

export async function getCustomCommands(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/customCommands`,
		{ guild_id, authorization: `Bearer ${token}` },
		config
	);
	return data;
}

export async function getGuild(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/profile`,
		{ guild_id, authorization: `Bearer ${token}` },
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
	_delete: boolean = false,
	enabled: boolean = true
) {
	const { data } = await axios.put(
		`${SERVER_URL}/g/customCommands`,
		{
			guild_id,
			trigger,
			response,
			_delete,
			enabled,
			command_id,
			authorization: `Bearer ${token}`,
		},
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
	token: unknown,
	_delete: boolean = false,
	enabled: boolean = true
) {
	const { data } = await axios.put(
		`${SERVER_URL}/g/timers`,
		{
			guild_id,
			channel_id,
			interval,
			timer_id,
			message,
			enabled,
			authorization: `Bearer ${token}`,
			_delete,
		},
		config
	);
	return data;
}

export async function getGuildTimers(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/timers`,
		{ guild_id, authorization: `Bearer ${token}` },
		config
	);
	return data;
}

export async function getGuildPremium(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/premium`,
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
		`${SERVER_URL}/g/timers/delete`,

		{
			guild_id,
			timer_id,
			authorization: `Bearer ${token}`,
		}
	);
	return data;
}

export async function createReactionRoleMessage(
	guild_id: string,
	channel_id: string,
	reaction_role_id: string,
	message: string,
	token: unknown,
	role_rows: any[],
	_delete: boolean = false,
	_edit: boolean = false,
	enabled: boolean = true
) {
	const { data } = await axios.put(
		`${SERVER_URL}/g/reactionRoles`,
		{
			guild_id,
			channel_id,
			reaction_role_id,
			_delete,
			_edit,
			message,
			enabled,
			role_rows,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}

export async function getGuildReactionRoles(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/reactionRoles`,
		{
			guild_id,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}

export async function getNanoCommands(guild_id: string, token: unknown) {
	const { data } = await axios.post(
		`${SERVER_URL}/g/toggleCommands`,
		{
			guild_id,
			authorization: `Bearer ${token}`,
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
		`${SERVER_URL}/g/toggleCommands`,
		{
			guild_id,
			commandsToChange,
			authorization: `Bearer ${token}`,
		},
		config
	);
	return data;
}
