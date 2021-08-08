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
}: {
	guild_id: string;
	token: unknown;
	reactionRole: any;
	categories: any;
}): JSX.Element {
	const toast = useToast();
	const router = useRouter();
	// const interval = timer.interval / 1000 / 60;
	return (
		<HStack
			justify="space-between"
			bg="rgba(0,0,0,0.2)"
			py={2}
			px={5}
			rounded={5}
		>
			<Stack textAlign="left">
				<Heading size="md">Sends: {timer.message}</Heading>
				<Heading size="md">In: #{timer.channel?.name}</Heading>
				<Heading size="md">
					Every: {interval} {interval > 1 ? "minutes" : "minute"}
				</Heading>
			</Stack>

			<VStack justify="center">
				<EditReactionRole
					token={token}
					reactionRole={reactionRole}
					guild_id={guild_id}
					categories={categories}
				/>
				<Button
					type="delete"
					onClick={async () => {
						const { data } = await axios.post(
							"/api/guilds/timers/delete",
							{
								guild_id,
								timer_id: timer.timer_id,
								token,
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
