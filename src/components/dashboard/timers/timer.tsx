import { HStack, useToast, Box, Button } from '@chakra-ui/react';
import { EditTimer } from '@components/dashboard/timers/editTimer';
import { useRouter } from 'next/router';
import React from 'react';
import { createTimer } from '@api/server';
import { FcCancel } from 'react-icons/fc';

export function Timer({ guild_id, token, timer, categories }: { guild_id: string; token: unknown; timer: any; categories: any }): JSX.Element {
	const toast = useToast();
	const router = useRouter();

	return (
		<Box bg="rgba(11,51,15,0.8)" rounded={5} backgroundColor="red_black.gray" h="100%" position="relative" py="2px" my="25px">
			<EditTimer token={token} timer={timer} guild_id={guild_id} categories={categories} />
			{timer.enabled ? (
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
					_hover={{ transform: 'scale(1.15)' }}
					_focus={{ transform: 'scale(1.15)' }}
					h="50px"
					w="50px"
					bg="transparent"
					position="absolute"
					right="-5px"
					top="-5px"
				>
					<FcCancel />
				</Button>
			) : (
				''
			)}
		</Box>
	);
}
