/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeaderboards } from "@api/server";
import { Box } from "@chakra-ui/react";
import {
	Messages,
	Rank,
	Tokens,
	Votes,
} from "@components/dashboard/leaderboards/types";
import { useState } from "react";
import Select from "react-select";

const options = [
	{ value: "rank", label: "Rank" },
	{ value: "votes", label: "Votes" },
	{ value: "messages", label: "Messages" },
	{ value: "tokens", label: "Tokens" },
];

/* secondary: "#f6a", primary: "#7549ac", primary2: "#fab107", */

const customStyles = {
	option: (provided: any, state: { isSelected: any }) => ({
		...provided,
		borderBottom: "1px solid white",
		backgroundColor: state.isSelected ? "#fab107" : "#7549ac",
	}),

	singleValue: (provided: any, state: { isDisabled: any }) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";

		return { ...provided, opacity, transition };
	},
};

export default function Custom({ leader }: { leader: any }): JSX.Element {
	// guild_id = BigInt(guild_id);
	const [sort, setSort] = useState(options[0]);

	return (
		<Box maxW="700px" w="100%">
			<Select
				// @ts-ignore
				onChange={setSort}
				defaultValue={sort}
				options={options}
				styles={customStyles}
				isSearchable={false}
				style={{ minWidth: "0" }}
			/>
			<Box>
				{sort.value === "rank" ? (
					<Rank leaderboards={leader.xp} />
				) : sort.value === "votes" ? (
					<Votes leaderboards={leader.votes} />
				) : sort.value === "messages" ? (
					<Messages leaderboards={leader.messages} />
				) : (
					<Tokens leaderboards={leader.tokens} />
				)
                }
			</Box>
		</Box>
	);
}

export async function getServerSideProps() {
	const leader = await getLeaderboards();
	return { props: { leader } };
}
