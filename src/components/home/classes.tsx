import {
	Box,
	Center,
	Circle,
	Grid,
	Heading,
	HStack,
	Image,
	Stack,
	Text,
	useBreakpointValue,
	useToken,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPlayer from "react-player";

const classes = [
	{
		name: "Warrior",
		description:
			"The Warrior class has extra hard-hitting physical damage but lacks stamina. They can throw their weapon and have a slam ability which will send enemies flying.",
	},
	{
		name: "Fire Mage",
		description:
			"The Fire Mage is a glass cannon class that can cast a short ranged flame, or bring down a fireball on their enemies. This class can hit very hard with spells, but lacks physical damage.",
	},
	{
		name: "Night Blade",
		description:
			"The Night Blade class is a mix between a melee and a caster class. They can be extremely evasive with their teleport, or bring up a spike wall which can spike their enemies into the air.",
	},
	{
		name: "Shaman",
		description:
			"The Shaman class is a master of the earth. They have an area of effect spell which can bring up a wave of rocks around them. They can also summon rocks beneath their feet to walk on mid-air.",
	},
];

export default function Classes() {
	const [currentClass, setCurrentClass] = useState(classes[0]);
	const primary = useToken("colors", "brand.primary");

	function _Class({ _class }) {
		const size = useBreakpointValue({ base: true, lg: false }) ? 60 : 120;

		return (
			<HStack
				transition="transform 0.1s ease-in"
				_hover={{ transform: "scale(1.1)", cursor: "pointer" }}
				onClick={() => setCurrentClass(_class)}
			>
				<Image
					src={`/classes/${_class.name}.png`}
					alt={_class.name}
					w={{ base: "125px", lg: "200px" }}
				/>
				<Box
					bg="brand.primary"
					w={`${size * 0.75}px`}
					h={`${size}px`}
					transform="skew(-20deg)"
					backgroundColor="hsla(240, 20%, 10%, 0.7)"
					backdropFilter="blur(10px)"
					position="absolute"
					zIndex="-1"
					rounded={5}
					outline={
						currentClass.name === _class.name
							? `2px solid ${primary}`
							: "none"
					}
				/>
			</HStack>
		);
	}
	return (
		<Stack h="100%" py={20} mx={10} justify="center">
			<Stack>
				<Heading
					fontSize="10vw"
					lineHeight="0.85em"
					// color=""
					_hover={{ color: "brand.primary" }}
					w="100%"
					transition="0.3s linear"
					textAlign={{ base: "center", lg: "left" }}
				>
					CLASSES
				</Heading>
				<HStack
					h="100%"
					align="center"
					justify="center"
					spacing={{ base: 0, lg: 5 }}
					transition="all 0.1s ease-in"
					flexDir={{ base: "column", xl: "row" }}
				>
					<HStack w="100%" justify="center" spacing={0}>
						<Circle
							borderWidth="2px"
							borderColor="brand.primary"
							p={1.5}
							transition="border-color 0.1s ease-in"
							_hover={{
								cursor: "pointer",
								borderColor: "transparent",
							}}
							onClick={() => {
								setCurrentClass(
									classes.indexOf(currentClass) != 0
										? classes[
												classes.indexOf(currentClass) -
													1
										  ]
										: classes[classes.length - 1]
								);
							}}
						>
							<Circle bg="brand.primary" p={1}>
								<FaArrowLeft />
							</Circle>
						</Circle>

						<Image
							src={`/classes/${currentClass.name}.png`}
							w="100%"
							alt={currentClass.name}
							maxW="500px"
						/>

						<Circle
							borderWidth="2px"
							borderColor="brand.primary"
							p={1.5}
							transition="border-color 0.1s ease-in"
							_hover={{
								cursor: "pointer",
								borderColor: "transparent",
							}}
							onClick={() => {
								setCurrentClass(
									classes.indexOf(currentClass) !=
										classes.length - 1
										? classes[
												classes.indexOf(currentClass) +
													1
										  ]
										: classes[0]
								);
							}}
						>
							<Circle bg="brand.primary" p={1}>
								<FaArrowRight />
							</Circle>
						</Circle>
					</HStack>
					<VStack w="100%">
						<Center display={{ base: "none", md: "block" }} w="50%">
							<ReactPlayer
								url={`/classes/videos/${currentClass.name}.mp4`}
								width="100%"
								alt="trailer"
								height="fit-content"
								playing
								loop
								muted
							/>
						</Center>

						<VStack maxW="50ch" align="flex-start">
							<Heading>{currentClass.name}</Heading>
							<Text color="darkgrey">
								{currentClass.description}
							</Text>
						</VStack>
						<Grid
							templateColumns={{
								base: "repeat(2, 1fr)",
								sm: "repeat(4, 1fr)",
							}}
							gap={0}
						>
							{classes.map((_class) => {
								return (
									<_Class key={_class.name} _class={_class} />
								);
							})}
						</Grid>
					</VStack>
				</HStack>
			</Stack>
		</Stack>
	);
}
