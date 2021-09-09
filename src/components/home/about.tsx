import { Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { SLIDING_BUTTON } from '@components/button';
import NextChakraLink from '@components/nextChakraLink';
import { createElement } from 'react';
import { FaDiscord, FaSpotify, FaSteam, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import ReactPlayer from 'react-player';

export default function About(): JSX.Element {
	return (
		<HStack justify="center" align="center" flexDir={{ base: 'column', xl: 'row' }} spacing={{ base: 0, xl: 10 }} h="100%" py={20} mx={10}>
			<Stack justify="center" h="100%" spacing={0}>
				<GradientHeading gradient="linear-gradient(135deg, #007cf0 0%, #00dfd8 100%)">LEGENDS</GradientHeading>
				<GradientHeading gradient="linear-gradient(135deg, #7928ca 0%, #ff0080 100%)">NEVER</GradientHeading>
				<GradientHeading gradient="linear-gradient(to right, #ff4d4d 0%, #f9cb28 100%)">DIE</GradientHeading>
			</Stack>

			<Stack spacing={10} pt="25px">
				<HStack justify="space-evenly">
					<Social icon={FaDiscord} href="https://discord.gg/4aZHrFCad9" />

					<Social icon={FaYoutube} href="https://www.youtube.com/channel/UCOa02RGlEpQuf6RiJvq9bhQ" />

					<Social icon={FaSteam} href="https://store.steampowered.com/app/1430360/Take_the_Throne" />

					<Social icon={FaTwitter} href="https://twitter.com/take_throne" />

					<Social icon={FaSpotify} href="https://open.spotify.com/artist/5SDGzQ2qJXZ8Gi4ZOCKnss?si=Iz6m9NUwS_2_N46C9MBQjA" />
				</HStack>

				<ReactPlayer url="/teaser.mp4" width="100%" alt="trailer" height="fit-content" playing loop muted />

				<Stack>
					<Heading fontWeight="normal">
						BECOME A <span>LEGEND</span>
					</Heading>
					<Text maxW="50ch" w="100%">
						Take the Throne is a new Massive Multiplayer Online Battle Royale game with up to 30 players in a free-for-all bloody fight to be crowned and take the throne! Take the Throne is built on PvP encounters and is filled with
						comedic physics-based gameplay.
					</Text>
					<NextChakraLink href="https://store.steampowered.com/app/1430360/Take_the_Throne" w="fit-content" isExternal>
						<SLIDING_BUTTON zIndex={1}>Play Now</SLIDING_BUTTON>
					</NextChakraLink>
				</Stack>
			</Stack>
		</HStack>
	);
}

function Social({ href, icon }: { href: string; icon: IconType }) {
	const iconElement = createElement(icon, { size: '35px' });
	return (
		<Link
			href={href}
			transition="color 0.2s linear"
			_hover={{
				color: 'brand.primary',
				cursor: 'pointer',
			}}
			isExternal
			fontSize="0px"
		>
			I love lighthouse
			{iconElement}
		</Link>
	);
}

function GradientHeading(props: { gradient: string; children: JSX.Element | string }): JSX.Element {
	return (
		<Heading
			fontSize={{ base: '15vw', xl: '10vw' }}
			lineHeight="0.85em"
			w="fit-content"
			transition="0.3s linear"
			_hover={{
				background: props.gradient,
				backgroundClip: 'text',
			}}
		>
			{props.children}
		</Heading>
	);
}
