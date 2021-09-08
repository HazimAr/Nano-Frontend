/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	Box,
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	IconButton,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import Logo from "./logo";
import Sidebar from "./sidebar";
import { useMobileMenuState } from "./usemobilemenustate";

export default function MobileTopBar({ size }): JSX.Element {
	// @ts-ignore
	const { isOpen, onClose, onOpen } = useMobileMenuState();
	return (
		<Box display={{ base: "flex", md: "none" }} zIndex={100}>
			<Flex
				align="center"
				justify="space-between"
				py="2"
				px={10}
				backgroundColor="hsla(240, 20%, 10%, 0.7)"
				backdropFilter="blur(10px)"
				borderBottomWidth="1px"
				w="100%"
				position="fixed"
			>
				<Logo size={size} />
				<IconButton
					onClick={onOpen}
					variant="unstyled"
					display="flex"
					cursor="pointer"
					aria-label="Menu"
					icon={<HiOutlineMenu fontSize="1.5rem" />}
				/>
				<Drawer
					size="xs"
					placement="left"
					isOpen={isOpen}
					blockScrollOnMount={false}
					onClose={onClose}
				>
					<DrawerOverlay />
					<DrawerContent
						backgroundColor="hsla(240, 20%, 10%, 0.7)"
						shadow="none"
						position="relative"
						maxW="64"
					>
						<Sidebar
							width="full"
							height="full"
							bg="inherit"
							border="0"
							onClick={onClose}
						/>
						<DrawerCloseButton
							bg="brand.secondary"
							_hover={{ bg: "brand.primary2" }}
							_active={{ bg: "brand.primary2" }}
							rounded="0"
							position="absolute"
							color="white"
							right="-8"
							top="0"
						/>
					</DrawerContent>
				</Drawer>
			</Flex>
			<Box w="100vw" h="150px" />
		</Box>
	);
}
