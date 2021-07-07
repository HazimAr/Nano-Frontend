/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { SERVER_URL } from "config";

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

async function getOsuRank(id: number) {
	const { data } = await axios.post(`${SERVER_URL}/osu/user`, { id }, config);
	return data;
}

async function loginOsu(id: number) {
	const { data } = await axios.post(
		`${SERVER_URL}/osu/login`,
		{ id },
		config
	);
	return data;
}

export { getLeaderboards, getOsuRank, loginOsu };
