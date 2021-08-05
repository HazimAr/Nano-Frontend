import { Heading, HStack, Text, useToast, VStack } from "@chakra-ui/react";
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
	return (
		<HStack
			justify="space-between"
			bg="rgba(0,0,0,0.2)"
			py={2}
			px={5}
			rounded={5}
		>
			<VStack>
				<Heading>{timer.channel?.name}</Heading>
				<Text>{timer.message}</Text>
			</VStack>

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
