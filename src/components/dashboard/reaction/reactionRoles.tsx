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
	console.log(reactionRoles);
	const reactionRoles2 = Object.keys(reactionRoles)
		.map((key) => {
			const reactionRole = reactionRoles[key];
			const newReactionRole = {
				channel_id: reactionRole.channel_id,
				reaction_role_id: key,
				message: reactionRole.message,
			};
			Object.keys(reactionRole).forEach((key) => {
				key += 1;
				try {
					parseInt(key);
				} catch {
					return;
				}
				const emoji = reactionRole[key];
				if (emoji?.roles?.length) newReactionRole[key] = emoji;
			});
			return newReactionRole;
		})
		.filter((reactionRole) => reactionRole[1]);
	console.log(reactionRoles2);
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
