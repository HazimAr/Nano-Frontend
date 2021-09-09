import { HStack, Text } from '@chakra-ui/react';
import { CUSTOM_BUTTON_1 } from '@components/button';

export function Channel({ curChannel, channel, setChannel }: { curChannel: any; channel: any; setChannel: Function }): JSX.Element {
	return (
		<HStack my={3} justify="space-between">
			<Text>{curChannel.channel_name}</Text>
			{channel === curChannel ? <Text fontSize="xl">Selected</Text> : <CUSTOM_BUTTON_1 onClick={() => setChannel(curChannel)}>Select</CUSTOM_BUTTON_1>}
		</HStack>
	);
}
