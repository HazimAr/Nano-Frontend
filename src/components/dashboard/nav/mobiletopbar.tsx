/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	IconButton,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { DiscordUser } from "types";
import { Logo } from "./logo";
import { Sidebar } from "./sidebar";
import { useMobileMenuState } from "./usemobilemenustate";

export function MobileTopBar({
	session,
}: {
	session: DiscordUser;
}): JSX.Element {
	// @ts-ignore
	const { isOpen, onClose, onOpen } = useMobileMenuState();
	return (
		<Flex
			align="center"
			justify="space-between"
			py="2"
			px="4"
			bg="linear-gradient(to right,#7549ac 60%, #f6a)"
			display={{ base: "flex", md: "none" }}
			borderBottomWidth="1px"
			w="100vw"
		>
			<Logo />
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
					bg="linear-gradient(#7549ac 60%, #f6a)"
					shadow="none"
					position="relative"
					maxW="64"
				>
					<Sidebar
						width="full"
						height="full"
						bg="inherit"
						border="0"
						session={session}
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
	);
}
