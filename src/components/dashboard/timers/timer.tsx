import { HStack, useToast, Box, Button } from '@chakra-ui/react';
import { EditTimer } from '@components/dashboard/timers/editTimer';
import { useRouter } from 'next/router';
import React from 'react';
import { createTimer } from '@api/server';
import { GiTrashCan } from 'react-icons/gi';

export function Timer({ guild_id, token, timer, categories }: { guild_id: string; token: unknown; timer: any; categories: any }): JSX.Element {
	const toast = useToast();
	const router = useRouter();

	return (
		<HStack justify="space-between" bg="rgba(0,0,0,0.2)" p={5} rounded={5} backgroundColor="red_black.gray" h="100%">
			<EditTimer token={token} timer={timer} guild_id={guild_id} categories={categories} />
			<Button
				onClick={async () => {
					const { data } = await createTimer(guild_id, null, null, timer.timer_id, null, token, true, true);
					toast({
						title: 'Success',
						description: data,
						status: 'success',
						duration: 3000,
						isClosable: true,
					});
					router.push(router.asPath);
				}}
				_hover={{ transform: 'scale(.9)' }}
				h="50px"
				w="50px"
				color="black"
				ml="5px"
			>
				<GiTrashCan />
			</Button>
		</HStack>
	);
}
