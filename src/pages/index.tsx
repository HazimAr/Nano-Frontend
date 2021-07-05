/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import HeadFoot from "@components/home/headfoot";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Home({ session }: DiscordUser): JSX.Element {
	return (
		<HeadFoot session={session}>
			<Container bg="bg.secondary">
				<ContainerInside>
					<Flex justify="space-between" align="center">
						<Box w="100%">
							<Text>
								Lorem, ipsum dolor sit amet consectetur
								adipisicing elit. Repellendus repudiandae, dolor
								autem dignissimos, quis eos unde quam aperiam
								nobis atque labore? Quibusdam autem praesentium,
								nostrum delectus officiis reiciendis minus
								error.
							</Text>
						</Box>
						<Box w="100%">
							<Image src="/undraw/game.svg" w={400} />
						</Box>
					</Flex>
				</ContainerInside>
			</Container>
		</HeadFoot>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	return { props: { session } };
}
