/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Box } from "@chakra-ui/react";

export default function Button(props: any): JSX.Element {
	return (
		<Box
			{...props}
			as="button"
			// lineHeight="1.2"
			transition="all 0.1s ease"
			px="16px"
			py="4px"
			borderRadius="md"
			fontSize="16px"
			fontWeight="semibold"
			bg="brand.primary"
			_hover={{ bg: "brand.secondary" }}
			_active={{
				transform: "scale(0.90)",
			}}
		>
			{props.children}
		</Box>
	);
}
