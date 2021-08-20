/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPostRequest } from '@api/server';
import { Center, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Layout from '@components/dashboard/layout';
import CreateReaction from '@components/dashboard/reaction/createReaction';
import ReactionRoles from '@components/dashboard/reaction/reactionRoles';
import { getSession } from 'next-auth/client';

export default function Custom({ session, reactionRoles, guild_id }): JSX.Element {
	const categories = reactionRoles.categories;
	let reaction_role_id: Number = 1;

	const guild = reactionRoles.mongoGuildObject;

	Object.keys({ ...reactionRoles.reaction_roles }).forEach((reactionRoleId) => {
		if (reaction_role_id) return;
		const reactionRole = reactionRoles.reaction_roles[reactionRoleId];
		if (reactionRole?.channel_id) return;
		reaction_role_id = parseInt(reactionRoleId);
	});

	return (
		<Layout session={session}>
			<Stack spacing={5}>
				<Heading>Reaction Roles</Heading>
				<Text>Setup reaction roles so when one of your server members reacts to a message they will receive a role</Text>

				<CreateReaction
					reaction_role_id={reaction_role_id}
					token={session.accessToken}
					guild_id={guild_id}
					categories={categories}
					availableRoles={reactionRoles.roles}
					customEmojis={reactionRoles.emojis}
					reactionRolesLength={reactionRoles.reaction_roles ? Object.keys(reactionRoles.reaction_roles).length : 0}
					premium={guild?.premium}
				/>
				<HStack justify="space-between">
					<Heading size="md">Your Reaction Roles</Heading>
					<Heading size="md">
						{reactionRoles.reaction_roles ? Object.keys(reactionRoles.reaction_roles).filter((r) => !r).length : 0}/
						{guild?.premium === 0 ? 1 : 5}
					</Heading>
				</HStack>
				<Divider my={5} />
				{reactionRoles.reaction_roles?.['1']?.['1']?.fetchedRoles?.length ? (
					<ReactionRoles
						custom={reactionRoles.emojis}
						reactionRoles={reactionRoles.reaction_roles}
						availableRoles={reactionRoles.roles}
						guild_id={guild_id}
						token={session.accessToken}
						categories={categories}
					/>
				) : (
					<Center style={{ outlineStyle: 'dashed', outlineWidth: 2 }} color="grey" py={5}>
						<Text color="white" mx={5}>
							You don't have any reaction roles setup. Click on the "Add Reaction Role" button to add one.
						</Text>
					</Center>
				)}
			</Stack>
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

	if (!context.req.url.split('/')[2]) {
		context.res.writeHead(307, {
			Location: '/dashboard',
		});
		context.res.end();
		return { props: { session } };
	}

	const [, , guild_id] = context.req.url.split('/');

	const reactionRoles = await defaultPostRequest('g/reaction_roles', guild_id, session.token);

	return { props: { session, reactionRoles, guild_id } };
}
