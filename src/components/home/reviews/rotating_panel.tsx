import {
	Box,
	Center,
	Flex,
	Heading,
	HStack,
	Icon,
	ScaleFade,
	Text,
	useControllableState,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft, FaArrowRight, FaCircle } from "react-icons/fa";

const reviews = [
	{
		reviewerName: "Gamespot",
		reviewScore: "9.5/10",
	},
	{
		reviewerName: "IGN",
		reviewScore: "9/10",
	},
	{
		reviewerName: "Steam",
		reviewScore: "9.5/10",
	},
];

export default function RotatingPanel(): JSX.Element {
	const innerPanels = reviews.map((r) => {
		return (
			<Panel
				reviewerName={r.reviewerName}
				reviewScore={r.reviewScore}
				key={r.reviewerName}
			/>
		);
	});
	const [index, setIndex] = useControllableState({
		defaultValue: 0,
		onChange: (_newIndex: number) => {
			// 	console.log(index + " vs " + newIndex);
		},
	});

	return (
		<Box>
			<Box py={8}>
				<Center mb={3}>{innerPanels[index]}</Center>
				<Center>
					<Center
						onClick={() =>
							setIndex(
								index === 0 ? innerPanels.length - 1 : index - 1
							)
						}
						w="fit-content"
						mx={2}
						cursor="pointer"
					>
						<Icon as={FaArrowLeft} boxSize="5vw" />
					</Center>
					{reviews.map((_, idx: number) => {
						return (
							<Center key={"text_" + idx}>
								<Icon
									as={FaCircle}
									boxSize="2vw"
									color={
										idx == index ? "brand.primary" : "white"
									}
									mx={2}
									onClick={() => setIndex(idx)}
									cursor="pointer"
									opacity={0.7}
								/>
							</Center>
						);
					})}
					<Center
						onClick={() =>
							setIndex(
								index === innerPanels.length - 1 ? 0 : index + 1
							)
						}
						w="fit-content"
						mx={2}
						cursor="pointer"
					>
						<Icon as={FaArrowRight} boxSize="5vw" />
					</Center>
				</Center>
			</Box>
		</Box>
	);
}

function Panel({ reviewerName, reviewScore }): JSX.Element {
	return (
		<Box py={5}>
			<ScaleFade in={true} unmountOnExit={false}>
				<Flex
					justifyContent="space-between"
					flexDir={{ base: "column", md: "row" }}
					alignItems="center"
					overflow="auto"
				>
					<HStack align="center">
						<Text
							textAlign="left"
							my={2}
							color="brand.primary"
							fontSize="10vw"
						>
							{reviewScore}
						</Text>
						<Heading fontSize="10vw" textAlign="left">
							{reviewerName}
						</Heading>
					</HStack>
				</Flex>
			</ScaleFade>
		</Box>
	);
}
