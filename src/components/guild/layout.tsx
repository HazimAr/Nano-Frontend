/* eslint-disable import/order */
import theme from '@styles/theme';
import { Box, Flex } from '@chakra-ui/react';
import { useState, ReactNode } from 'react';
import { DiscordUser } from 'types';
// import { MobileTopBar } from './nav/mobiletopbar';
import { Sidebar } from './nav/sidebar';
import { Header } from '@components/home/header';
import NextNprogress from 'nextjs-progressbar';
//
// eslint-disable-next-line import/no-default-export
export default function Layout({ session, cookies, children }: { session: DiscordUser; cookies: any; children: ReactNode }): JSX.Element {
	const [isOpen, setOpen] = useState(false);
	const { theme_color: color = 'red' } = cookies ?? {};
	const [theme_color, set_theme_color] = useState(color);

	function hslToHex(hsl) {
		let [_hsl, h, s, l] = [, , , ,];
		_hsl = hsl.slice(3, hsl.length - 1);

		[h, s, l] = _hsl.split(',');
		h = parseInt(h.replace('(', ''));
		s = parseInt(s.replace('%', ''));
		l = parseInt(l.replace('%', ''));

		l /= 100;
		const a = (s * Math.min(l, 1 - l)) / 100;
		const f = (n) => {
			const k = (n + h / 30) % 12;
			const _color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * _color)
				.toString(16)
				.padStart(2, '0'); // convert to Hex and prefix "0" if needed
		};

		return `#${f(0)}${f(8)}${f(4)}`;
	}

	return (
		<Box h="100%" minH="100vh" w="100%" overflowY="auto" overflowX="hidden" bg={`${theme_color}.dark`}>
			<NextNprogress color={hslToHex(theme.colors[theme_color][50])} startPosition={50} stopDelayMs={200} height={3} showOnShallow={true} options={{ easing: 'ease', speed: 500 }} />
			{/* <MobileTopBar session={session} /> */}
			{/*  */}
			{/* HEADER */}
			<Box pos="fixed" h="70px" w="100%" zIndex={2} bg={`${theme_color}.light`}>
				<Header session={session} isOpen={isOpen} setOpen={setOpen} theme_color={theme_color} set_theme_color={set_theme_color} />
			</Box>
			{/* SIDEBAR */}
			<Box
				pos="fixed"
				w="240px"
				h="100vh"
				zIndex={1}
				bg={`${theme_color}.light`}
				ml={isOpen ? '0px' : '-240px'}
				overflowY="auto"
				overflowX="hidden"
				position="fixed"
				borderWidth="0px"
				display={{ base: 'none', md: 'flex' }}
				outline="0"
				transition="margin-left .1s ease-out"
			>
				<Sidebar session={session} cookies={cookies} isOpen={isOpen} setOpen={setOpen} />
			</Box>
			{/* CHILDREN */}
			<Flex justifyContent="center" pos="relative" zIndex={0} ml={isOpen ? '240px' : '0px'} mt={70} transition="all .1s ease-out">
				{children}
			</Flex>
		</Box>
	);
}
