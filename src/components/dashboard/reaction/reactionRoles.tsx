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
	return (
		<Stack>
			{reactionRoles.map((reactionRole, index) => {
				return (
					<ReactionRole
						key={reactionRole.message}
						reactionRole={reactionRole}
						guild_id={guild_id}
						reaction_role_id={index + 1}
						token={token}
						custom={custom}
						categories={categories}
						availableRoles={availableRoles}
					/>
				);
			})}
		</Stack>
	);
}
