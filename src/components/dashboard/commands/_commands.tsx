import { Box, VStack } from '@chakra-ui/react';

export function CommandSection({ commands, title }) {
	return (
		<VStack spacing="8px" as="nav" bg="blackAlpha.700">
			<Box fontSize="26px">
				{title} Commands
				<br /> <br />
				{commands.map((cmd) => (
					<Box key={cmd.name} fontSize="16px">
						Name: {cmd.name}
						<br />
						Enabled: {cmd.enabled ? 'true' : 'false'}
					</Box>
				))}
			</Box>
		</VStack>
	);
}
