import { createProgram } from "@api/program";
import {
	Button,
	chakra,
	Checkbox,
	CheckboxGroup,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	IconButton,
	Input,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import Pop from "@components/pop";
import { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import {
	GiRunningNinja,
	GiWeightLiftingDown,
	GiWeightLiftingUp,
} from "react-icons/gi";

const CWeightlifting = chakra(GiWeightLiftingUp);
const CPowerlifting = chakra(GiWeightLiftingDown);
const CBodybuilding = chakra(FaDumbbell);
const CCardio = chakra(GiRunningNinja);
export default function CreateForm(props: any) {
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");

	const [exp, setExp]: any = useState([]);
	const [privacy, setPrivacy] = useState(false);
	const [tags, setTags]: any = useState([]);

	function handleTags(t: string) {
		if (tags.includes(t)) {
			setTags(tags.filter((item: any) => item != t));
			return;
		}

		setTags((tag: any) => [...tag, t]);
	}

	function handleExp(t: string) {
		if (exp.includes(t)) {
			setExp(exp.filter((item: any) => item != t));
			return;
		}

		setExp((ex: any) => [...ex, t]);
	}

	return (
		<Container>
			<Heading as="h3" size="lg" mb={4} opacity="0.7">
				Create your template
			</Heading>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createProgram(
						name,
						desc,
						exp.toString(),
						privacy,
						tags.toString()
					).then((e) => {
						console.log(e);
					});
					props.setToggle();
				}}
			>
				<VStack spacing={2} alignItems="center">
					<FormControl>
						<FormLabel htmlFor="name">Name</FormLabel>
						<Input
							placeholder=""
							value={name}
							_placeholder={{ color: "gray.400" }}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="description">Summary</FormLabel>
						<Textarea
							placeholder=""
							value={desc}
							_placeholder={{ color: "white" }}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</FormControl>
					<HStack>
						<CheckboxGroup>
							<Checkbox
								colorScheme="green"
								isChecked={exp.includes("beginner")}
								onChange={() => handleExp("beginner")}
							>
								Beginner
							</Checkbox>
							<Checkbox
								colorScheme="blue"
								isChecked={exp.includes("intermediate")}
								onChange={() => handleExp("intermediate")}
							>
								Intermediate
							</Checkbox>
							<Checkbox
								colorScheme="red"
								isChecked={exp.includes("advanced")}
								onChange={() => handleExp("advanced")}
							>
								Advanced
							</Checkbox>
						</CheckboxGroup>
					</HStack>

					<HStack spacing={2} alignItems="center" wrap="wrap">
						<VStack>
							<IconButton
								aria-label="gains"
								size="lg"
								variant="outline"
								icon={<CBodybuilding />}
								_focus={{ outline: "none" }}
								onClick={() => handleTags("bodybuilding")}
								bg={
									tags.includes("bodybuilding")
										? "purple.500"
										: ""
								}
							/>
							<Text fontSize="10px">BodyBuilding</Text>
						</VStack>
						<VStack>
							<IconButton
								aria-label="gains"
								size="lg"
								variant="outline"
								icon={<CWeightlifting />}
								_focus={{ outline: "none" }}
								onClick={() => handleTags("weightlifting")}
								bg={
									tags.includes("weightlifting")
										? "purple.500"
										: ""
								}
							/>
							<Text fontSize="10px">Weightlifting</Text>
						</VStack>

						<VStack>
							<IconButton
								aria-label="gains"
								size="lg"
								variant="outline"
								icon={<CPowerlifting />}
								_focus={{ outline: "none" }}
								onClick={() => handleTags("powerlifting")}
								bg={
									tags.includes("powerlifting")
										? "purple.500"
										: ""
								}
							/>
							<Text fontSize="10px">Powerlifting</Text>
						</VStack>
						<VStack>
							<IconButton
								aria-label="gains"
								size="lg"
								variant="outline"
								icon={<CCardio />}
								_focus={{ outline: "none" }}
								onClick={() => handleTags("cardio")}
								bg={tags.includes("cardio") ? "purple.500" : ""}
							/>
							<Text fontSize="10px">Cardio</Text>
						</VStack>
					</HStack>
					<Flex align="center">
						<Checkbox
							mx={1}
							colorScheme="red"
							isChecked={privacy}
							onChange={() => setPrivacy(!privacy)}
						>
							private
						</Checkbox>
						<Pop
							// placement="right-start"
							title="howdy"
							description="Set to private if you do not want anyone to view your program"
						/>
					</Flex>
				</VStack>

				<Button type="submit" my={4} bg="purple.500">
					Create
				</Button>
			</form>
		</Container>
	);
}
