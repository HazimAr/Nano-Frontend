import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Grid,
	Heading,
	HStack,
	Text,
} from "@chakra-ui/react";

export default function Commands({ commands }): JSX.Element {
	commands = [
		{
			id: "1312312",
			name: "osu",
			description: "all osu commands",
			command: "test",
			icon: "test",
		},
		{
			id: "1312312",
			name: "osu",
			description: "all osu commands",
			command: "test",
			icon: "test",
		},
		{
			id: "1312312",
			name: "osu",
			description: "all osu commands",
			command: "test",
			icon: "test",
		},
		{
			id: "1312312",
			name: "osu",
			description: "all osu commands",
			command: "test",
			icon: "test",
		},
	];
	return (
		<Grid templateColumns="repeat(3, 1fr)" gap={6}>
			{commands.map((command) => {
				return (
					<Accordion
						allowToggle
						borderColor="transparent"
						key={command.id}
					>
						<AccordionItem>
							<Heading bg="rgba(0,0,0,0.2)" rounded="md">
								<AccordionButton>
									<HStack justify="space-between" w="100%">
										<Text>
											{command.name
												? command.name
												: "No Category"}
										</Text>
										<AccordionIcon />
									</HStack>
								</AccordionButton>
							</Heading>
							<AccordionPanel></AccordionPanel>
						</AccordionItem>
					</Accordion>
				);
			})}
		</Grid>
	);
}
