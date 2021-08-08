/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuildChannels, getGuildReactionRoles } from "@api/server";
import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import CreateReaction from "@components/dashboard/reaction/createReaction";
import ReactionRoles from "@components/dashboard/reaction/reactionRoles";
import { getSession } from "next-auth/client";

export default function Custom({
	session,
	categories,
	reactionRoles,
	guild_id,
}): JSX.Element {
	console.log(reactionRoles);
	return (
		<Layout session={session}>
			<Stack spacing={5}>
				<Heading>Reaction Roles</Heading>
				<Text>
					Setup reaction roles so when one of you server members
					reacts to a message they will recieve a role
				</Text>
				<CreateReaction
					reaction_role_id={
						reactionRoles.reaction_roles?.length + 1 ?? 1
					}
					token={session.accessToken}
					guild_id={guild_id}
					categories={categories}
					availableRoles={reactionRoles.roles}
					customEmojis={reactionRoles.emojis}
				/>
				{reactionRoles.reaction_roles?.length ? (
					<ReactionRoles
						reactionRoles={reactionRoles.reaction_roles}
						availableRoles={reactionRoles.roles}
						
						guild_id={guild_id}
						token={session.accessToken}
						categories={categories}
					/>
				) : (
					<Center
						style={{ outlineStyle: "dashed", outlineWidth: 2 }}
						color="grey"
						py={5}
					>
						<Text color="white" mx={5}>
							You don't have any reaction roles setup. Click on
							the "Add Reaction Role" button to add one.
						</Text>
					</Center>
				)}
			</Stack>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
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

	const reactionRoles = await getGuildReactionRoles(
		guild_id,
		session.accessToken
	);
	const categories = await getGuildChannels(guild_id, session.accessToken);

	return { props: { session, categories, reactionRoles, guild_id } };
}
