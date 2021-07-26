import { HStack, Text } from "@chakra-ui/react";
import Button from "@components/button";

export default function channel({
	channel,
	selected,
	setSelected,
}: {
	channel: any;
	selected: string;
	setSelected: Function;
}): JSX.Element {
	return (
		<HStack my={3} justify="space-between">
			<Text>{channel.channel_name}</Text>
			{selected !== channel.channel_id ? (
				<Button onClick={() => setSelected(channel.channel_id)}>
					Select
				</Button>
			) : (
				<Text fontSize="xl">Selected</Text>
			)}
		</HStack>
	);
}
