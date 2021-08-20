/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { SERVER_URL } from 'config';
import { getId } from './discord';

const config = { timeout: 1000 * 10 };
//
// 🌟 ------------------------------------------------------------------- POST REQUESTS ------------------------------------------------------------------- 🌟 //
//

export async function defaultPostRequest(path: string, guild_id: string, authorization: string) {
	return (await axios.post(`${SERVER_URL}/${path}`, { guild_id, authorization: `Bearer ${authorization}` }, config)).data;
}

//
// -------------------------------- 💠 OPEN 💠 --------------------------------
//

export async function getLeaderboards() {
	return await axios.post(`${SERVER_URL}/lb`, config);
}

//
// -------------------------------- 💠 GUILDS 💠 --------------------------------
//

export async function getGuildLeaderboards(guild_id) {
	return await axios.post(`${SERVER_URL}/lb/guild`, { guild_id }, config);
}

//
// -------------------------------- 💠 USERS 💠 --------------------------------
//

export async function getOsuRank(id: string) {
	return await axios.post(`${SERVER_URL}/osu/user`, { id }, config);
}

export async function getUser(token: unknown) {
	return await axios.post(`${SERVER_URL}/u/profile`, { authorization: token }, config);
}

//
// 🍎 ------------------------------------------------------------------- PUT REQUESTS ------------------------------------------------------------------- 🍎 //
//

//
// -------------------------------- 💠 OPEN 💠 --------------------------------
//

//
// -------------------------------- 💠 GUILDS 💠 --------------------------------
//

export async function updateNanoCommands(guild_id: string, commandsToChange: object, token: string) {
	return await axios.put(
		`${SERVER_URL}/g/toggleCommands`,
		{
			guild_id,
			commandsToChange,
			authorization: `Bearer ${token}`,
		},
		config
	);
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
	return await axios.put(
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
}

export async function createTimer(
	guild_id: string,
	channel_id: string,
	interval: number,
	timer_id: number,
	message: string,
	token: string,
	_delete: boolean = false,
	enabled: boolean = true
) {
	return await axios.put(
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
}

export async function deleteGuildTimer(guild_id: string, timer_id: string, token: unknown) {
	return await axios.put(`${SERVER_URL}/g/timers/delete`, { guild_id, timer_id, authorization: `Bearer ${token}` });
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
	return await axios.put(
		`${SERVER_URL}/g/reaction_roles`,
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
}

//
// -------------------------------- 💠 USERS 💠 --------------------------------
//

export async function loginOsu(token: string) {
	const id = await getId(token);
	return await axios.put(`${SERVER_URL}/osu/newUser`, { id }, config);
}
