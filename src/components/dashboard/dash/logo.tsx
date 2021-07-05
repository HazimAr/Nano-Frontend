import { Flex, Heading, Image, Link } from "@chakra-ui/react";
import React from "react";

export function Logo(): JSX.Element {
	return (
		<Link
			href="/dashboard"
			_hover={{ color: "brand.secondary" }}
			_focus={{}}
		>
			<Flex align="center">
				<Image src="/logo.png" w={30} rounded="50%" />
				<Heading size="md" ml={2.5}>
					Nano
				</Heading>
			</Flex>
		</Link>
	);
}
