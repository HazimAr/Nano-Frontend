import { Box, useDisclosure } from "@chakra-ui/react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import Button from "./button";

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
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);
	return (
		<Box
			onMouseMove={(e) => {
				if (!isOpen) {
					setMouseX(e.clientX);
					setMouseY(e.clientY);
				}
			}}
		>
			<Button onClick={isOpen ? onClose : onOpen}>
				{isOpen ? "Close" : "Open"}
			</Button>
			{isOpen ? (
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
					position="absolute"
					top={mouseY}
					left={mouseX}
				/>
			) : null}
		</Box>
	);
}
