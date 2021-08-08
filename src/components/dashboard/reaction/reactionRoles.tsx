import { Stack } from "@chakra-ui/react";
import ReactionRole from "./reactionRole";

export default function ReactionRoles({
	guild_id,
	token,
	reactionRoles,
	categories,
}: {
	guild_id: string;
	token: unknown;
	reactionRoles: any[];
	categories: any;
}): JSX.Element {
	return (
		<Stack>
			{reactionRoles.map((reactionRole) => {
				return (
					<ReactionRole
						key={reactionRole.message}
						reactionRole={reactionRole}
						guild_id={guild_id}
						token={token}
						categories={categories}
					/>
				);
			})}
		</Stack>
	);
}