/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { SERVER_URL } from 'config';
import { getId } from './discord';

const config = {
	timeout: 1000 * 10,
};

//
// 🌟 ------------------------------------------------------------------- POST REQUESTS ------------------------------------------------------------------- 🌟 //
//
export async function defaultGuildPost(guild_file: string, guild_id: string, authorization: string) {
	return (await axios.post(`${SERVER_URL}/g/${guild_file}`, { guild_id, authorization: `Bearer ${authorization}` }, config)).data;
}
//
// ----------------------------------------------------------------------------------------------------------------------
//
export async function getLeaderboards() {
	return await axios.post(`${SERVER_URL}/lb`, config);
}

export async function getGuildLeaderboards(guild_id) {
	return await axios.post(`${SERVER_URL}/lb/guild`, { guild_id }, config);
}

export async function getOsuRank(id: string) {
	return await axios.post(`${SERVER_URL}/osu/user`, { id }, config);
}

export async function getUser(token: unknown) {
	return await axios.post(`${SERVER_URL}/u/profile`, { authorization: token }, config);
}

//
// -------------------------------- 💠 Guilds 💠 --------------------------------
//

// export async function getGuildAnime(guild_id: string, token: string) {
// 	return await defaultGuildPost('anime', guild_id, token);
// }

export async function getGuildOsu(guild_id: string, token: string) {
	return await defaultGuildPost('osu', guild_id, token);
}

export async function getGuildReactionRoles(guild_id: string, token: string) {
	return await defaultGuildPost('reactionRoles', guild_id, token);
}

export async function getNanoCommands(guild_id: string, token: string) {
	return await defaultGuildPost('toggleCommands', guild_id, token);
}

export async function getCustomCommands(guild_id: string, token: string) {
	return await defaultGuildPost('customCommands', guild_id, token);
}

export async function getGuild(guild_id: string, token: string) {
	return await defaultGuildPost('profile', guild_id, token);
}

export async function getGuildTimers(guild_id: string, token: string) {
	return await defaultGuildPost('timers', guild_id, token);
}

// This 👇 should be using g/guild to get premium 🤔

// export async function getGuildPremium(guild_id: string, token: unknown) {
// 	return await defaultGuildPost('premium', guild_id, `Bearer ${token}`);
// }

//
// 🍎 ------------------------------------------------------------------- PUT REQUESTS ------------------------------------------------------------------- 🍎 //
//
export async function updateNanoCommands(guild_id: string, commandsToChange: object, token: string) {
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

export async function loginOsu(token: string) {
	const id = await getId(token);
	const { data } = await axios.put(`${SERVER_URL}/osu/newUser`, { id }, config);
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

export async function deleteGuildTimer(guild_id: string, timer_id: string, token: unknown) {
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
