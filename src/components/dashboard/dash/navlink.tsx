import {
	HStack,
	Icon,
	Link,
	LinkProps,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

interface NavLinkProps extends LinkProps {
	isActive?: boolean;
	label: string;
	icon: React.ElementType;
}

export const NavLink = (props: NavLinkProps) => {
	const { icon, isActive, label, ...rest } = props;
	const router = useRouter();

	return (
		<Link
			bg={router.asPath === props.href ? "blue.700" : ""}
			display="block"
			py="2"
			px="3"
			borderRadius="md"
			transition="all 0.3s"
			fontWeight="medium"
			fontSize="sm"
			userSelect="none"
			aria-current={isActive ? "page" : undefined}
			color={mode("white.700", "white.400")}
			_hover={{
				bg: mode("blue.200", "blue.700"),
				color: mode("white.900", "white"),
			}}
			// _activeLink={{
			// 	bg: router.asPath === props.href ? "blue.200" : "",
			// 	color: "inherit",
			// }}
			{...rest}
		>
			<HStack spacing="4">
				<Icon as={icon} fontSize="lg" opacity={0.64} />
				<Text as="span">{label}</Text>
			</HStack>
		</Link>
	);
};
