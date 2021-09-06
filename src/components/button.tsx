/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Box } from '@chakra-ui/react';

export default function Button(props: any): JSX.Element {
	let bg;
	let hover_bg;
	switch (props.type) {
		case 'secondary':
			hover_bg = 'brand.secondary';
			bg = 'brand.primary2';
			break;
		case 'delete':
			bg = 'rgb(237,66,69)';
			hover_bg = 'brand.secondary';
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
			bg={bg ? bg : props.bg}
			_hover={hover_bg ? { background: hover_bg } : props._hover}
			_active={{
				transform: 'scale(0.90)',
			}}
		>
			{props.children}
		</Box>
	);
}
