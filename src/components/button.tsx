/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import { Box, Circle, useToken } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

export function CUSTOM_BUTTON_1(props: any): JSX.Element {
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
			as="button"
			transition="all 0.2s ease"
			px="16px"
			py="4px"
			rounded={5}
			fontSize="16px"
			fontWeight="semibold"
			bg={bg || props.bg || 'osu'}
			_hover={hover_bg ? { background: hover_bg } : props._hover}
			_active={{
				transform: 'scale(0.90)',
			}}
			{...props}
		>
			{props.children}
		</Box>
	);
}

export function CIRCLE_BUTTONS(props) {
	const { setCurrentClass, currentClass, classes, direction } = props;

	return (
		<Circle
			as="button"
			borderWidth="2px"
			borderColor="brand.primary"
			p={1.5}
			transition="border-color 0.1s ease-in"
			_hover={{
				cursor: 'pointer',
				borderColor: 'transparent',
			}}
			onClick={() => {
				direction === 'left' && setCurrentClass(classes.indexOf(currentClass) === 0 ? classes[classes.length - 1] : classes[classes.indexOf(currentClass) - 1]);
				direction === 'right' && setCurrentClass(classes.indexOf(currentClass) != classes.length - 1 ? classes[classes.indexOf(currentClass) + 1] : classes[0]);
			}}
			mr={direction === 'left' ? 'auto' : ''}
		>
			<Circle bg="brand.primary" p={1}>
				{direction === 'left' ? <FaArrowLeft /> : <FaArrowRight />}
			</Circle>
		</Circle>
	);
}

export function SLIDING_BUTTON(props) {
	const primary = useToken('colors', 'brand.primary');
	const [hovered, setHover] = useState(false);

	return (
		<Box
			as="button"
			// lineHeight="1.2"
			transition="all 0.2s ease"
			position="relative"
			display="block"
			px="16px"
			py="4px"
			rounded={5}
			fontSize="16px"
			fontWeight="semibold"
			overflow="hidden"
			// borderWidth="1px"
			border={`2px solid ${primary}`}
			onMouseOver={() => {
				setTimeout(() => {
					setHover(true);
				}, 300);
			}}
			onMouseLeave={() => {
				setTimeout(() => {
					setHover(false);
				}, 300);
			}}
			_before={{
				content: '""',
				background: primary,
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '100%',
				height: '0%',
				transform: 'translate(-50%, -50%) rotate(45deg)',
				zIndex: -1,
				transition: 'all 0.6s ease',
			}}
			_hover={{ _before: { height: '300%' }, cursor: 'pointer', bg: hovered && primary }}
			_active={{
				transform: 'scale(0.90)',
			}}
			{...props}
		>
			{props.children}
		</Box>
	);
}
