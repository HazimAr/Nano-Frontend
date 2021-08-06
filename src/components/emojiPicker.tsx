import { Box, Image, useDisclosure } from "@chakra-ui/react";
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
	const [emoji, setEmoji] = useState() as any;
	useEffect(() => {
		setParentState(emoji);
	}, [emoji]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);
	return (
		<Box
			onMouseMove={(e) => {
				console.log(e);
				if (!isOpen) {
					setMouseX(e.clientX);
					setMouseY(e.clientY);
				}
			}}
		>
			<Image
				filter="grayscale(100%)"
				transitionTimingFunction="ease"
				transitionDuration="0.2s"
				_hover={{
					filter: "grayscale(0%)",
					cursor: "pointer",
					transform: "scale(1.1)",
				}}
				w={7}
				src="/emoji.png"
				onClick={isOpen ? onClose : onOpen}
			/>

			{isOpen ? (
				<Picker
					onSelect={(emoji: any) => {
						if (emoji.native) {
							setEmoji(emoji);
							return;
						}
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
					style={{ position: "absolute", top: mouseY, left: mouseX }}
				/>
			) : null}
		</Box>
	);
}
