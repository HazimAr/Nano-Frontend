import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Channel from '@components/dashboard/channel';

export function Channels({ channel, setChannel, categories }) {
	if (typeof channel === 'string') {
		categories.map((category: any) => {
			category.channels.map((curChannel: any) => {
				if (curChannel.channel_id === channel) {
					channel = curChannel;
				}
			});
		});
	}
	return (
		<Stack justify="center">
			<Heading size="md" textAlign="center">
				{channel ? channel.channel_name : 'Select A Channel'}
			</Heading>
			{categories.map((category: any) => {
				return (
					<Accordion allowToggle borderColor="transparent" key={category.id}>
						<AccordionItem>
							<Heading bg="rgba(0,0,0,0.2)" rounded="md">
								<AccordionButton>
									<HStack justify="space-between" w="100%">
										<Text>{category.name ? category.name : 'No Category'}</Text>
										<AccordionIcon />
									</HStack>
								</AccordionButton>
							</Heading>
							<AccordionPanel>
								{category.channels.map((curChannel: any) => {
									return <Channel key={curChannel.channel_id} curChannel={curChannel} channel={channel} setChannel={setChannel} />;
								})}
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				);
			})}
		</Stack>
	);
}
