import { Image } from "@chakra-ui/react";
import { useScrollSections } from "@lib/scroll";
import React from "react";

export default function Logo({ size }: { size?: string }): JSX.Element {
	const sections = useScrollSections();
	return (
		<Image
			src="logo.png"
			alt="logo"
			w={size ? size : "150px"}
			py={2}
			onClick={sections[0]?.onClick}
			_hover={{ cursor: "pointer" }}
			transition="width 0.1s ease-in"
		/>
	);
}
