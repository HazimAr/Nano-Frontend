import { Heading, HStack, Stack, useToast, VStack } from "@chakra-ui/react";
import Button from "@components/button";
import EditTimer from "@components/dashboard/timers/editTimer";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

export default function Timer({
	guild_id,
	token,
	timer,
	categories,
}: {
	guild_id: string;
	token: unknown;
	timer: any;
	categories: any;
}): JSX.Element {
	const toast = useToast();
	const router = useRouter();
	const interval = timer.interval / 1000 / 60;
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
				<EditTimer
					token={token}
					timer={timer}
					guild_id={guild_id}
					categories={categories}
				/>
				<Button
					type="delete"
					onClick={async () => {
						const { data } = await axios.put("/api/guilds/timers", {
							guild_id,
							timer_id: timer.timer_id,
							token,
							_delete: true,
						});
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
