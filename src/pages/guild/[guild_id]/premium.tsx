/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Layout from '@components/guild/layout';
import { getSession } from 'next-auth/client';
// import { useState } from "react";
import { DiscordUser } from 'types';

export default function Custom({ session }: { session: DiscordUser }): JSX.Element {
	// const [plan, setPlan] = useState("month");
	function Plan({ plan, price, per, save }: any) {
		return (
			<Box textAlign="center">
				<Text fontSize="xs">{plan}</Text>
				<Box py={5}>
					<Heading>${price}</Heading>
					<Text fontSize="xs">{per}</Text>
				</Box>
				<Box fontSize="sm" bg="brand.primary2" opacity="50%" rounded="50px">
					<Text>{save}</Text>
				</Box>
			</Box>
		);
	}
	return (
		<Layout session={session}>
			<Flex justify="center">
				<Plan plan="Monthly" price={5} per="per month" save="0%" />
				<Plan plan="Yearly" price={3} per="per month" save="20%" />
				<Plan plan="Quarterly" price={4} per="per month" save="10%" />
			</Flex>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	return { props: { session } };
}
