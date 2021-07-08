/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { SERVER_URL } from "config";
import { getId } from "./discord";

const config = {
	timeout: 1000 * 5,
};

async function getLeaderboards(token: string, id: string) {
	const { data } = await axios.post(
		`${SERVER_URL}/leaderboards`,
		{ authorization: `Bearer ${token}`, guildId: id },
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

export { getLeaderboards, getOsuRank, loginOsu, getUser };
