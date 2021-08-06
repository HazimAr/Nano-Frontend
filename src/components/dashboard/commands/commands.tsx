import {
	Grid,
	Heading,
	HStack,
	Stack,
	Switch,
	Text,
	useToast,
} from "@chakra-ui/react";
import Button from "@components/button";
import { useState } from "react";

export default function Commands({ commands }): JSX.Element {
	const [groupState, setGroupState] = useState(null);
	const [changed, setChanged] = useState(null);
	const toast = useToast();

	return (
		<>
			{groupState == null ? (
				<Grid
					templateColumns={{
						base: "",
						md: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
						xl: "repeat(4, 1fr)",
						"2xl": "repeat(5, 1fr)",
					}}
					gap={6}
					h="100%"
				>
					{Object.keys(commands)
						.sort()
						.map((groupId) => {
							const group = commands[groupId];

							return (
								<Stack
									bg="rgba(0,0,0,0.2)"
									rounded={5}
									key={groupId}
									p={5}
									transitionTimingFunction="ease"
									transitionDuration="0.2s"
									_hover={{
										cursor: "pointer",
										color: "brand.secondary",
									}}
									onClick={() => {
										setGroupState(group);
									}}
								>
									<HStack justify="space-between">
										<Heading size="md">
											<Text>{groupId}</Text>
										</Heading>
										<Switch
											size="lg"
											defaultChecked
											color="brand.primary"
										/>
									</HStack>
									<Text>{group.groupDescription}</Text>
									{/* {Object.keys(command).map((commandId) => {
								const checked = command[commandId];

								return (
									<HStack justify="space-between">
										<Text>
											{checked.name} {checked.arguments}
										</Text>
										<Switch
											size="md"
											defaultChecked={checked.enabled}
											color="brand.primary"
										/>
									</HStack>
								);
							})} */}
								</Stack>
							);
						})}
				</Grid>
			) : (
				<Stack>
					{Object.keys(groupState).map((commandId) => {
						const checked = groupState[commandId];
						if (commandId == "groupDescription") return;
						return (
							<HStack justify="space-between">
								<Text>
									{checked.name} {checked.arguments}
								</Text>
								<Switch
									size="md"
									defaultChecked={checked.enabled}
									color="brand.primary"
								/>
							</HStack>
						);
					})}
					<HStack justify="space-between">
						<Button
							onClick={() => {
								setGroupState(null);
							}}
						>
							Back
						</Button>
						<HStack justify="space-between">
							<Button
								onClick={() => {
									setGroupState(null);
									setChanged(null);
								}}
							>
								Cancel
							</Button>
							<Button
								onClick={() => {
									if (changed == null) {
										toast({
											title: "Error",
											description:
												"Looks like nothing was changed",

											status: "error",
											duration: 3000,
											isClosable: true,
										});
										return;
									}
								}}
							>
								Save
							</Button>
						</HStack>
					</HStack>
				</Stack>
			)}
		</>
	);
}
