import { Box, Heading, HStack, ListItem, Spacer, UnorderedList, useToken, VStack } from '@chakra-ui/react';
import { SLIDING_BUTTON } from '@components/button';
import { useScrollSections } from '@lib/scroll';
import { GiBroadsword } from 'react-icons/gi';
import NextChakraLink from '@components/nextChakraLink';
import Logo from './logo';

export function LANDING_PAGE_SIDEBAR(props: any): JSX.Element {
	const sections = useScrollSections();
	const primary = useToken('colors', 'brand.primary');
	return (
		<Box {...props}>
			<VStack spacing={5} h="100vh" position="fixed" w="300px" justify="center" backgroundColor="hsla(240, 20%, 10%, 0.7)" backdropFilter="blur(10px)">
				<VStack h="90%" spacing="100px">
					<Logo />
					<UnorderedList listStyleType="none" spacing={10}>
						{sections.map(({ id, onClick, selected }) => (
							<ListItem
								key={id}
								onClick={onClick}
								transition="ease 0.2s"
								_hover={{
									color: `${primary}`,
									cursor: 'pointer',
								}}
								color={selected && 'brand.primary'}
								selected={selected}
							>
								<HStack justify="flex-end">
									<GiBroadsword
										style={{
											opacity: `${selected ? 1 : 0}`,
											visibility: `${selected ? 'visible' : 'hidden'}`,
											transition: 'visibility 0s, opacity .7s linear',
										}}
									/>
									<Heading size="md" fontWeight="normal" w="100px">
										{id}
									</Heading>
								</HStack>
							</ListItem>
						))}
					</UnorderedList>
					<Spacer />
					<NextChakraLink href="https://store.steampowered.com/app/1430360/Take_the_Throne/" isExternal>
						<SLIDING_BUTTON mb={5}>Play Now</SLIDING_BUTTON>
					</NextChakraLink>
				</VStack>
			</VStack>
			<Box minW="300px" h="100vh" />
		</Box>
	);
}
