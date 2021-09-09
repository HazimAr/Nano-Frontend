import { Heading, HStack, VStack } from '@chakra-ui/react';
import { CUSTOM_BUTTON_1 } from '@components/button';
import NextChakraLink from '@components/nextChakraLink';

export default function Play(): JSX.Element {
	return (
		<HStack h="100%" justify="center" py={20} mx={10}>
			<VStack justify="center" h="50%" spacing={16}>
				{/* <Image src="/gif/customization.gif" w="500px" />
				<Image src="/gif/fun.gif" w="500px" />
				<Image src="/gif/sat.gif" w="500px" /> */}
				<VStack>
					<BigHeading>JOIN THE</BigHeading>

					<BigHeading>THRONE</BigHeading>
				</VStack>
				<NextChakraLink href="https://store.steampowered.com/app/1430360/Take_the_Throne/" isExternal>
					<CUSTOM_BUTTON_1 fontSize={{ base: '3vw', lg: '2vw' }} mb={5}>
						Play Now
					</CUSTOM_BUTTON_1>
				</NextChakraLink>
			</VStack>
		</HStack>
	);
}

function BigHeading({ children }) {
	return (
		<Heading
			fontSize={{ base: '15vw', md: '13vw', xl: '10vw' }}
			lineHeight="0.85em"
			w="fit-content"
			transition="0.3s linear"
			_hover={{
				color: 'red',
			}}
		>
			{children}
		</Heading>
	);
}
