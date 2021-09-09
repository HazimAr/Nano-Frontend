import { Box, Center, Grid, Heading, HStack, Image, Stack, Text, useBreakpointValue, useToken, VStack } from '@chakra-ui/react';
import { CIRCLE_BUTTONS } from '@components/button';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const classes = [
	{
		name: 'Warrior',
		description: 'The Warrior class has extra hard-hitting physical damage but lacks stamina. They can throw their weapon and have a slam ability which will send enemies flying.',
	},
	{
		name: 'Fire Mage',
		description: 'The Fire Mage is a glass cannon class that can cast a short ranged flame, or bring down a fireball on their enemies. This class can hit very hard with spells, but lacks physical damage.',
	},
	{
		name: 'Night Blade',
		description: 'The Night Blade class is a mix between a melee and a caster class. They can be extremely evasive with their teleport, or bring up a spike wall which can spike their enemies into the air.',
	},
	{
		name: 'Shaman',
		description: 'The Shaman class is a master of the earth. They have an area of effect spell which can bring up a wave of rocks around them. They can also summon rocks beneath their feet to walk on mid-air.',
	},
];

export default function Classes() {
	const [currentClass, setCurrentClass] = useState(classes[0]);
	const primary = useToken('colors', 'brand.primary');

	return (
		<Stack h="100%" py={20} mx={10} justify="center">
			<Stack>
				<Heading
					fontSize="10vw"
					lineHeight="0.85em"
					// color=""
					_hover={{ color: 'brand.primary' }}
					w="100%"
					transition="0.3s linear"
					textAlign={{ base: 'center', lg: 'left' }}
				>
					CLASSES
				</Heading>
				<HStack h="100%" justify="center" spacing={{ base: 0, lg: 5 }} transition="all 0.1s ease-in" flexDir={{ base: 'column', xl: 'row' }}>
					<HStack w="100%" justify="center">
						<CIRCLE_BUTTONS setCurrentClass={setCurrentClass} currentClass={currentClass} classes={classes} direction="left" />

						{classes.map((cur) => {
							return <Image pos="relative" h="auto" w="100%" mr="auto" key={cur.name} src={`/classes/${cur.name}.png`} alt={cur.name} maxW="500px" hidden={cur.name !== currentClass.name} />;
						})}

						<CIRCLE_BUTTONS setCurrentClass={setCurrentClass} currentClass={currentClass} classes={classes} direction="right" />
					</HStack>
					<VStack w="100%">
						<Center display={{ base: 'none', xl: 'block' }} w="50%" h="360px">
							{classes.map((_class) => {
								return (
									<ReactPlayer
										url={`/classes/videos/${_class.name}.mp4`}
										width="100%"
										// height="100%"
										alt="trailer"
										height="fit-content"
										playing={_class.name === currentClass.name}
										loop
										muted
										style={{
											position: 'absolute',
											visibility: _class.name === currentClass.name ? 'visible' : 'hidden',
											maxWidth: '300px',
										}}
									/>
								);
							})}
						</Center>

						<VStack minH="150px" maxW="50ch" align="flex-start">
							<Heading>{currentClass.name}</Heading>
							<Text color="darkgrey">{currentClass.description}</Text>
						</VStack>
						<Grid
							templateColumns={{
								base: 'repeat(2, 1fr)',
								sm: 'repeat(4, 1fr)',
							}}
							gap={0}
						>
							{classes.map((_class) => {
								return <_Class key={_class.name} _class={_class} currentClass={currentClass} primary={primary} setCurrentClass={setCurrentClass} />;
							})}
						</Grid>
					</VStack>
				</HStack>
			</Stack>
		</Stack>
	);
}

function _Class({ _class, currentClass, primary, setCurrentClass }) {
	const size = useBreakpointValue({ base: true, lg: false }) ? 60 : 120;

	return (
		<HStack transition="transform 0.1s ease-in" _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }} onClick={() => setCurrentClass(_class)}>
			<Image src={`/classes/${_class.name}.png`} alt={_class.name} w={{ base: '125px', lg: '200px' }} />
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
				outline={currentClass.name === _class.name ? `2px solid ${primary}` : 'none'}
			/>
		</HStack>
	);
}
