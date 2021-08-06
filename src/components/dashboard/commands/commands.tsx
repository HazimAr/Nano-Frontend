import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Grid,
	Heading,
	HStack,
	Switch,
	Text,
} from "@chakra-ui/react";

export default function Commands({ commands }): JSX.Element {
	console.log(commands);
	return (
		<Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
			{Object.keys(commands).map((commandId) => {
				const command = commands[commandId];
				return (
					<Accordion
						allowToggle
						borderColor="transparent"
						key={command.id}
					>
						<AccordionItem>
							<Heading bg="rgba(0,0,0,0.2)" rounded="md">
								<AccordionButton w="100%">
									<HStack justify="space-between" w="100%">
										<Text>{commandId}</Text>
										<AccordionIcon />
									</HStack>
								</AccordionButton>
							</Heading>
							<AccordionPanel>
								{Object.keys(commands).map((commandId) => {
									const checked = commands[commandId];
									return (
										<HStack justify="space-between">
											<Text>{commandId}</Text>
											<Switch
												size="md"
												defaultIsChecked={
													checked ? true : false
												}
											/>
										</HStack>
									);
								})}
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				);
			})}
		</Grid>
	);
}
