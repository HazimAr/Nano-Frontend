import { Box, Image, useBoolean } from "@chakra-ui/react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";

export default function EmojiPicker({
	setEmoji,
	custom = [],
}: {
	setEmoji: Function;
	custom?: any[];
}): JSX.Element {
	const [open, setOpen] = useBoolean();
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);

	return (
		<Box
			onMouseMove={(e) => {
				if (!open) {
					setMouseX(e.clientX);
					setMouseY(e.clientY);
				}
				console.log(e);
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
				onClick={setOpen.toggle}
			/>

			{open && (
				<Picker
					onSelect={(emoji: any) => {
						if (emoji.native) {
							setEmoji(emoji.native);
							setOpen.toggle();
							return;
						}
						for (const item of custom) {
							if (item.imageUrl === emoji.imageUrl) {
								setEmoji({
									animated: item.animated,
									emoji_id: item.id,
									name: item.name,
									img: item.imageUrl,
								});
								setOpen.toggle();
								return;
							}
						}
					}}
					set="twitter"
					title="Pick your emoji…"
					emoji="point_up"
					theme="dark"
					custom={custom}
					style={{ position: "fixed", top: mouseY, left: mouseX }}
				/>
			)}
		</Box>
	);
}
