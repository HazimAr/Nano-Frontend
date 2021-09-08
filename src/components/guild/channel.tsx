import { HStack, Text } from '@chakra-ui/react';
import Button from '@components/button';

export function Channel({
	curChannel,
	channel,

	setChannel,
}: {
	curChannel: any;
	channel: any;
	setChannel: Function;
}): JSX.Element {
	return (
		<HStack my={3} justify="space-between">
			<Text>{curChannel.channel_name}</Text>
			{channel !== curChannel ? <Button onClick={() => setChannel(curChannel)}>Select</Button> : <Text fontSize="xl">Selected</Text>}
		</HStack>
	);
}
