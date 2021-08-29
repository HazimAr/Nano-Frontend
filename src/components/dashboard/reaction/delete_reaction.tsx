import { Box, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export function DeleteReaction({ reaction, guild_id, reaction_id, token }): JSX.Element {
	const toast = useToast();
	const router = useRouter();

	return (
		<>Delete Button</>
		// {timer.enabled ? (
		// 	<Button
		// 		onClick={async () => {
		// 			const { data } = await createTimer(guild_id, null, null, timer.timer_id, null, token, true, true);
		// 			toast({
		// 				title: 'Success',
		// 				description: data,
		// 				status: 'success',
		// 				duration: 3000,
		// 				isClosable: true,
		// 			});
		// 			router.push(router.asPath);
		// 		}}
		// 		_hover={{ transform: 'scale(1.15)' }}
		// 		_focus={{ transform: 'scale(1.15)' }}
		// 		h="50px"
		// 		w="50px"
		// 		bg="transparent"
		// 		position="absolute"
		// 		right="-5px"
		// 		top="-5px"
		// 	>
		// 		<FcCancel />
		// 	</Button>
		// ) : (
		// 	''
		// )}
	);
}
