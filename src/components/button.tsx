/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Box } from "@chakra-ui/react";

// function Button(props: any): JSX.Element {
// 	return (
// 		<Box
// 			{...props}
// 			as="button"
// 			// lineHeight="1.2"
// 			transition="all 0.2s ease"
// 			px="16px"
// 			py="4px"
// 			borderRadius="md"
// 			fontSize="16px"
// 			fontWeight="semibold"
// 			bg="brand.primary"
// 			_hover={{ bg: "brand.secondary" }}
// 			_active={{
// 				transform: "scale(0.90)",
// 			}}
// 		>
// 			{props.children}
// 		</Box>
// 	);
// }

export default function Button(props: any): JSX.Element {
	let bg;
	let hover;
	switch (props.type) {
		default:
			bg = "brand.primary";
			hover = "brand.secondary";
			break;
		case "secondary":
			hover = "brand.secondary";
			bg = "brand.primary2";
			break;
		case "delete":
			bg = "rgb(237,66,69)";
			hover = "brand.secondary";
			break;
	}
	return (
		<Box
			{...props}
			as="button"
			// lineHeight="1.2"
			transition="all 0.2s ease"
			px="16px"
			py="4px"
			rounded={5}
			fontSize="16px"
			fontWeight="semibold"
			bg={bg}
			_hover={{ background: hover }}
			_active={{
				transform: "scale(0.90)",
			}}
		>
			{props.children}
		</Box>
	);
}

// export { Button, Button2 };
