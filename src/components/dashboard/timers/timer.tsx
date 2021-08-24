import { useToast, Box, Button } from '@chakra-ui/react';
import { EditTimer, DeleteTimer } from '@components/dashboard/timers/change_timer';
import { useRouter } from 'next/router';
import React from 'react';

export function Timer({ guild_id, token, timer, categories }: { guild_id: string; token: unknown; timer: any; categories: any }): JSX.Element {
	const toast = useToast();
	const router = useRouter();

	return (
		<Box bg="rgba(11,51,15,0.8)" rounded={5} backgroundColor="red_black.gray" h="100%" position="relative" py="2px" my="25px">
			<EditTimer token={token} timer={timer} guild_id={guild_id} categories={categories} />
			<DeleteTimer token={token} timer={timer} guild_id={guild_id} categories={categories} />
		</Box>
	);
}
