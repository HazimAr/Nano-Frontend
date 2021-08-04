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
		<Picker
			onSelect={(emoji) => {
				for (const item of custom) {
					if (item.imageUrl === emoji.imageUrl) {
						setEmoji(item);
						break;
					}
				}
			}}
			set="twitter"
			title="Pick your emoji…"
			emoji="point_up"
			theme="dark"
			custom={custom}
		/>
	);
}
