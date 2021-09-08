import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import Button from "@components/button";
import NextChakraLink from "@components/nextChakraLink";

export default function Game(): JSX.Element {
	return (
		<HStack h="100%" justify="center" py={20} mx={10}>
			<Stack justify="center" h="50%" w="35ch">
				<Stack mb={5}>
					<Heading fontWeight="normal" lineHeight="0.9em">
						EASY TO LEARN
					</Heading>
					<Heading fontWeight="normal" lineHeight="0.9em">
						<span>HARD TO MASTER</span>
					</Heading>
				</Stack>

				<Text fontSize="16px">
					Take the Throne is built on PvP encounters. Equip your
					weapon and have a choice at 2 different types of swings, as
					well as class abilities - depending on your situation. If
					you need to be on the defensive, use the block mechanic to
					avoid certain death!
				</Text>

				<NextChakraLink
					href="https://store.steampowered.com/app/1430360/Take_the_Throne"
					isExternal
				>
					<Button w="100%" mt={15}>
						Watch Gameplay
					</Button>
				</NextChakraLink>
			</Stack>
			<Stack spacing={10} pt="100px">
				<Image src="/pls.png" rounded={5} />
			</Stack>
		</HStack>
	);
}
