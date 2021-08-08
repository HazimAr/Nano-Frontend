import { Box, Image, useDisclosure } from "@chakra-ui/react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";

export default function EmojiPicker({
	setEmoji,
	custom,
}: {
	setEmoji: Function;
	custom: any[];
}): JSX.Element {
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
			w="fit-content"
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

			{isOpen && (
				<Picker
					onSelect={(emoji: any) => {
						if (emoji.native) {
							setEmoji(emoji.native);
							return;
						}
						for (const item of custom) {
							if (item.imageUrl === emoji.imageUrl) {
								setEmoji(
									`<${item.animated ? "a" : ""}:${
										item.name
									}:${item.id}>`
								);
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
			)}
		</Box>
	);
}
