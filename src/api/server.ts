/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { getId } from './discord';

// Can't destructure non-standard js process.env
// https://nextjs.org/docs/basic-features/environment-variables
const HOST_DOMAIN = process.env.HOST_DOMAIN;
//
const config = { timeout: 1000 * 10 };
//
// 🌟 ------------------------------------------------------------------- POST REQUESTS ------------------------------------------------------------------- 🌟 //
//

export async function defaultPostRequest(path: string, guild_id: string, authorization: string) {
	return (await axios.post(`${HOST_DOMAIN}/${path}`, { guild_id, authorization: `Bearer ${authorization}` }, config)).data;
}

//
// -------------------------------- 💠 OPEN 💠 --------------------------------
//

export async function getLeaderboards() {
	return axios.post(`${HOST_DOMAIN}/leaderboards`, config);
}

//
// -------------------------------- 💠 GUILDS 💠 --------------------------------
//

export async function getGuildLeaderboards(guild_id) {
	return axios.post(`${HOST_DOMAIN}/lb/guild`, { guild_id }, config);
}

//
// -------------------------------- 💠 USERS 💠 --------------------------------
//

export async function getOsuRank(id: string) {
	return axios.post(`${HOST_DOMAIN}/osu/user`, { id }, config);
}

export async function getUser(token: unknown) {
	return axios.post(`${HOST_DOMAIN}/u/profile`, { authorization: token }, config);
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

export async function updateNanoCommands(guild_id: string, group_name: string, commandsToChange: any, token: string) {
	return axios.put(
		`${HOST_DOMAIN}/g/groups/${group_name.endsWith('_rp') ? 'role_playing' : group_name}/commands`,
		{
			guild_id,
			group_name,
			commandsToChange,
			authorization: `Bearer ${token}`,
		},
		config
	);
}

export async function createCustomCommand({ guild_id, trigger, response, command_id, enabled = true }, token: string, _delete = false) {
	return axios.put(
		`${HOST_DOMAIN}/g/custom_commands`,
		{
			guild_id,
			trigger,
			response,
			enabled,
			command_id,
			authorization: `Bearer ${token}`,
			_delete,
		},
		config
	);
}

export async function createTimer(guild_id: string, channel_id: string, interval: number, timer_id: number, message: string, token: string, _delete = false, enabled = true) {
	return axios.put(
		`${HOST_DOMAIN}/g/timers`,
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

export async function createReactionRoleMessage(guild_id: string, channel_id: string, reaction_role_id: string, message: string, token: string, role_rows: any[], _delete = false, _edit = false, enabled = true) {
	return axios.put(
		`${HOST_DOMAIN}/g/reaction_roles`,
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
	return axios.put(`${HOST_DOMAIN}/osu/newUser`, { id }, config);
}
