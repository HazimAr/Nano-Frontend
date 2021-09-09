// /* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// import { Box, Flex, Image, Text } from '@chakra-ui/react';
// import Container from '@components/container';
// import ContainerInside from '@components/containerInside';
// import HeadFoot from '@components/home/headfoot';
// import { getSession } from 'next-auth/client';
// import { DiscordUser } from 'types';

// export default function Home({ session }: { session: DiscordUser }): JSX.Element {
// 	return (
// 		// @ts-ignore
// 		<HeadFoot session={session}>
// 			<Container bg="bg.secondary">
// 				<ContainerInside>
// 					<Flex justify="space-between" align="center">
// 						<Box w="100%">
// 							<Text>
// 								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus repudiandae, dolor autem dignissimos, quis eos unde quam aperiam nobis atque labore? Quibusdam autem praesentium, nostrum delectus officiis
// 								reiciendis minus error.
// 							</Text>
// 						</Box>
// 						<Box w="100%">
// 							<Image src="/undraw/game.svg" w={600} alt="game controller" />
// 						</Box>
// 					</Flex>
// 				</ContainerInside>
// 			</Container>
// 		</HeadFoot>
// 	);
// }

// export async function getServerSideProps(context: any) {
// 	const session: any = await getSession(context);
// 	// if (session) {
// 	// 	context.res.writeHead(307, {
// 	// 		Location: '/guild',
// 	// 	});
// 	// 	context.res.end();
// 	// 	return { props: { session } };
// 	// }

// 	return { props: { session } };
// }

import { Center, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import Hero from '@components/home/about';
import { Classes } from '@components/home/classes';
import Info from '@components/home/info';
import Play from '@components/home/play';
import MobileTopBar from '@components/home/nav/mobiletopbar';
import { LANDING_PAGE_SIDEBAR } from '@components/home/nav/landing_page_sidebar';
import NextChakraLink from '@components/nextChakraLink';
import { ScrollingProvider, Section } from '@lib/scroll';

export default function Index({ size }): JSX.Element {
	return (
		<ScrollingProvider>
			<HStack
				background="linear-gradient(rgba(34, 34, 50, 0.90), rgba(34, 34, 50, 0.90)), url('/logo.png')"
				// backgroundSize="cover"
				backgroundPosition="center"
				backgroundRepeat="no-repeat"
			>
				<Flex h="100vh" flexDirection="column" w="100%">
					<MobileTopBar size={size} />
					<Flex direction="row-reverse">
						<LANDING_PAGE_SIDEBAR display={{ base: 'none', md: 'flex' }} />
						<Stack w="100%" spacing={0}>
							<FullSection id="Hero">
								<Hero />
							</FullSection>

							{/* <FullSection id="Game Play">
								<Game />
							</FullSection> */}

							<FullSection id="Classes">
								<Classes />
							</FullSection>

							<FullSection id="Info">
								<Info />
							</FullSection>
							<Section id="Play Now">
								<Play />
							</Section>
							<Center>
								<NextChakraLink href="https://webdefy.tech" isExternal>
									<Heading textAlign="center" size="md" _hover={{ color: 'brand.primary' }} transition="all 0.2s ease">
										Made with ❤️ by
										<br />
										Hazim Arafa
									</Heading>
								</NextChakraLink>
							</Center>
						</Stack>
					</Flex>
				</Flex>
			</HStack>
		</ScrollingProvider>
	);
}

function FullSection({ id, children }): JSX.Element {
	return (
		<Section id={id} style={{ minHeight: '100vh' }}>
			{children}
		</Section>
	);
}
