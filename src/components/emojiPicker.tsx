import { Box } from "@chakra-ui/react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";

export default function EmojiPicker({
	setParentState,
	custom,
}: {
	setParentState: Function;
	custom: any[];
}): JSX.Element {
	const [emoji, setEmoji] = useState();

	useEffect(() => {
		setParentState(emoji);
	}, [emoji]);

	return (
		<Box>
			<Picker
				onSelect={(emoji) => {
					setEmoji(emoji);
				}}
				set="twitter"
				title="Pick your emoji…"
				emoji="point_up"
				theme="dark"
				custom={custom}
			/>
		</Box>
	);
}
