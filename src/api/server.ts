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

async function getOsuRank(token: string) {
	// const id = await getId(token);
	const { data } = await axios.post(
		`${SERVER_URL}/osu/user`,
		{ id: "82998275019378688" },
		config
	);
	return data;
}

async function loginOsu(token: string) {
	const id = await getId(token);
	console.log(id);
	const { data } = await axios.put(
		`${SERVER_URL}/osu/newUser`,
		{ id: await getId(token) },
		config
	);
	return data;
}

export { getLeaderboards, getOsuRank, loginOsu };
