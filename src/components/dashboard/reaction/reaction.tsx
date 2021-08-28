/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { createTimer } from '@api/server';
import { EditReaction, DeleteReaction } from './change_reaction';

export function Reaction({ token, reaction_role_id, categories, guild_id, reaction, customEmojis, availableRoles, premium }): JSX.Element {
	const toast = useToast();
	const router = useRouter();

	return (
		<Box bg="rgba(11,51,15,0.8)" rounded={5} backgroundColor="red_black.gray" h="100%" position="relative" py="2px" my="25px">
			<EditReaction token={token} reaction={reaction} reaction_role_id={reaction_role_id} premium={premium} categories={categories} guild_id={guild_id} customEmojis={customEmojis} availableRoles={availableRoles} />
			<DeleteReaction token={token} reaction={reaction} reaction_role_id={reaction_role_id} premium={premium} categories={categories} guild_id={guild_id} customEmojis={customEmojis} availableRoles={availableRoles} />
		</Box>
	);
}
