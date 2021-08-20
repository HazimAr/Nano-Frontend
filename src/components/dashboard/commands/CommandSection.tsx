import { Box, VStack, Switch, FormControl } from '@chakra-ui/react';

export function CommandSection({ commands, title }) {
	return (
		<VStack spacing="8px" bg="blackAlpha.700" mt="4" borderRadius="xl">
			<Box fontSize="26px" pb="4" width="100%" mx="auto">
				<Box py="4" bgColor="bg.primaryDark" textAlign="center" borderRadius="xl" color="osu">
					{title} Commands
				</Box>
				{commands.map((cmd) => (
					<FormControl display="flex" alignItems="center" key={cmd.name}>
						<Box fontSize="16px" textAlign="left" px="16" py="4">
							{cmd.name}
						</Box>
						<Switch colorScheme="red" defaultChecked={cmd.enabled} />
					</FormControl>
				))}
			</Box>
		</VStack>
	);
}
