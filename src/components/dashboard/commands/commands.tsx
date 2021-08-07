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
import axios from "axios";
import { useState } from "react";

export default function Commands({ commands, guild_id, token }): JSX.Element {
	const [groupState, setGroupState] = useState(null);
	const [changed, setChanged] = useState({});
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
										{/* <Switch
											size="lg"
											defaultChecked
											color="brand.primary"
											_hover={{
												cursor: "pointer",
												color: "white",
											}}
										/> */}
									</HStack>
									<Text color="grey">
										{group.groupDescription}
									</Text>
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
						let enabled = checked.enabled === 1;

						return (
							<HStack
								justify="space-between"
								bg="rgba(0,0,0,0.2)"
								rounded={5}
								key={commandId}
								p={5}
							>
								<Text>
									{checked.name} {checked.arguments}
								</Text>
								<Switch
									size="md"
									defaultChecked={checked.enabled}
									color="brand.primary"
									onChange={() => {
										enabled = !enabled;

										const temp = changed;
										temp[commandId] = enabled ? 1 : 0;
										console.log(temp);
										setChanged(temp);
									}}
								/>
							</HStack>
						);
					})}
					<HStack justify="space-between">
						<Button
							onClick={() => {
								setGroupState(null);
								setChanged({});
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={async () => {
								if (changed === {}) {
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
								const { data } = await axios.put(
									"/api/guilds/nanoCommands",
									{
										guild_id,
										commandsToChange: changed,
										token,
									}
								);
								toast({
									title: "Success",
									description: data,

									status: "success",
									duration: 3000,
									isClosable: true,
								});
							}}
						>
							Save
						</Button>
					</HStack>
				</Stack>
			)}
		</>
	);
}
