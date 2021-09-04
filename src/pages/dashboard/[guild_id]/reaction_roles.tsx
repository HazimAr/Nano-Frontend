/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Heading, HStack, Stack, Text, Box } from '@chakra-ui/react';
import Layout from '@components/dashboard/layout';
import { DeleteReaction } from '@components/dashboard/reaction/delete_reaction';
import { EditReaction } from '@components/dashboard/reaction/edit_reaction';
import { getSession } from 'next-auth/client';

export default function ReactionRoles({ session, api_response, guild_id }): JSX.Element {
	const { emojis, roles, mongoGuild, categories } = api_response ?? {};
	const { premium } = mongoGuild ?? {};

	console.log(api_response);

	const arr = [];
	let reactions_len = 0;
	let next_id = 1;

	for (let i = 1; i < 6; i++) {
		if (mongoGuild?.reactionRoles?.[i]?.['1']?.role_ids?.[0]) {
			mongoGuild.reactionRoles[i].reaction_index = i;
			arr.push(mongoGuild.reactionRoles[i]);
			reactions_len++;
		} else {
			arr.push({ not_set: true, reaction_index: i });
			next_id = i;
		}
	}
	arr.reverse();

	return (
		<Layout session={session}>
			<Stack spacing={5} w="100%" mt="50px" px="50px">
				<HStack justify="space-between">
					<Heading>Reaction Roles</Heading>
					<Text>
						{reactions_len}/{premium === 0 ? 1 : 5}
					</Text>
				</HStack>
				<Text>Message to react to that gives specific roles.</Text>

				<Box>
					{arr.map((reaction) => (
						<Box key={reaction.reaction_index} bg="rgba(11,51,15,0.8)" rounded={5} backgroundColor="red_black.gray" h="100%" position="relative" py="2px" my="25px">
							<EditReaction token={session.accessToken} reaction={reaction} reaction_role_id={next_id} premium={premium} categories={categories} guild_id={guild_id} customEmojis={emojis} availableRoles={roles} />
							<DeleteReaction token={session.accessToken} reaction={reaction} reaction_role_id={next_id} premium={premium} categories={categories} guild_id={guild_id} customEmojis={emojis} availableRoles={roles} />
						</Box>
					))}
				</Box>
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session: any = await getSession(context);
	const { guild_id } = context.req.cookies;

	if (!session) {
		context.res.writeHead(307, {
			Location: '/',
		});
		context.res.end();
		return { props: { session } };
	}

	return {
		props: {
			session,
			api_response: await defaultPostRequest('g/reaction_roles', guild_id, session.accessToken),
			guild_id,
		},
	};
}
