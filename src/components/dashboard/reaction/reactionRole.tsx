import { Heading, HStack, Stack, useToast, VStack } from "@chakra-ui/react";
import Button from "@components/button";
import EditReactionRole from "@components/dashboard/reaction/editReactionRole";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

export default function ReactionRole({
	guild_id,
	token,
	reactionRole,
	categories,
	availableRoles,
	reaction_role_id,
	custom,
}): JSX.Element {
	const toast = useToast();
	const router = useRouter();

	return (
		<HStack
			justify="space-between"
			bg="rgba(0,0,0,0.2)"
			py={2}
			px={5}
			rounded={5}
		>
			<Stack textAlign="left">
				<Heading size="md">
					Users recieve:{" "}
					{reactionRole.roles.map((role) => {
						return `${role.name} `;
					})}
				</Heading>
				<Heading size="md">When reacted: #{reactionRole.emoji}</Heading>
			</Stack>

			<VStack justify="center">
				<EditReactionRole
					token={token}
					reactionRoleOg={reactionRole}
					customEmojis={custom}
					guild_id={guild_id}
					reaction_role_id={reaction_role_id}
					categories={categories}
					availableRoles={availableRoles}
				/>
				<Button
					type="delete"
					onClick={async () => {
						const { data } = await axios.post(
							"/api/guilds/reactionRoles",
							{
								guild_id,
								reaction_role_id: reactionRole.timer_id,
								token,
								_delete: true,
							}
						);
						toast({
							title: "Success",
							description: data,
							status: "success",
							duration: 3000,
							isClosable: true,
						});
						router.push("/dashboard/timers");
					}}
				>
					Delete
				</Button>
			</VStack>
		</HStack>
	);
}
