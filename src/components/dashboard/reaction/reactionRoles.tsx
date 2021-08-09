import { Stack } from "@chakra-ui/react";
import ReactionRole from "./reactionRole";

export default function ReactionRoles({
	guild_id,
	token,
	reactionRoles,
	categories,
	availableRoles,
	custom,
}): JSX.Element {
	// console.log(reactionRoles);
	const reactionRoles2 = Object.keys(reactionRoles)
		.map((key) => {
			const reactionRole = reactionRoles[key];
			const newReactionRole = {
				channel_id: reactionRole.channel_id,
				reaction_role_id: key,
				message: reactionRole.message,
			};
			Object.keys(reactionRole).forEach((key2) => {
				try {
					parseInt(key2);
				} catch {
					return;
				}

				const emoji = reactionRole[key2];

				if (emoji?.roles_ids?.length) {
					console.log("test");
					newReactionRole[key2] = emoji;
				}
			});
			console.log(newReactionRole);
			return newReactionRole;
		})
		.filter((reactionRole) => reactionRole.channel_id);
	// console.log(reactionRoles2);
	return (
		<Stack>
			{reactionRoles2.map((reactionRole: any, index) => {
				return (
					<ReactionRole
						key={reactionRole.message}
						guild_id={guild_id}
						reactionRole={reactionRole}
						token={token}
						reaction_role_id={index + 1}
						custom={custom}
						categories={categories}
						availableRoles={availableRoles}
					/>
				);
			})}
		</Stack>
	);
}
