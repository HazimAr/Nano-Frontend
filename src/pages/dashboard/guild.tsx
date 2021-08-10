/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getGuild } from "@api/server";
import {
	Avatar,
	Flex,
	Grid,
	Heading,
	HStack,
	Stack,
	Text,
	VStack
} from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakra";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Custom({
	session,
	guild
}: {
	session: DiscordUser;

	guild: any;
}): JSX.Element {
	return (
		<Layout session={session}>
			<Stack align="center" mt={5} spacing={5}>

			</Stack>
		</Layout>
	);
}

function Panel({ name, description, href }): JSX.Element {
	return (
		<VStack
			p={5}
			w="100%"
			maxW="400px"
			justify="space-between"
			bg="rgba(0,0,0,0.2)"
			rounded={5}
			transitionTimingFunction="ease"
			transitionDuration=".2s"
			_hover={{
				transform: "scale(0.9)",
				cursor: "pointer",
				color: "brand.secondary",
			}}
		>
			<NextChakraLink href={`/dashboard${href}`}>
				<Heading>{name}</Heading>
				<Text color="grey">{description}</Text>
			</NextChakraLink>
		</VStack>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	if (!session?.accessToken) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
		return { props: { session } };
	}

	if (!context.req.cookies.guild) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session } };
	}

	const guild_id = context.req.cookies.guild;
	const guild = getGuild(guild_id, session.accessToken)

	return {
		props: {
			session,
			guild,
			guild_id,
		},
	};
}
