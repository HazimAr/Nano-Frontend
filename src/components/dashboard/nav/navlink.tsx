import { HStack, Icon, Link, LinkProps, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type NavLinkProps = {
	isActive?: boolean;
	label: string;
	icon: React.ElementType;
	href: string;
} & LinkProps;

export function NavLink(props: NavLinkProps): JSX.Element {
	const { icon, isActive, label, href, ...rest } = props;
	const router = useRouter();
	const pathCheck = router.asPath.split('/')[router.asPath.split('/').length - 1];
	return (
		<NextLink href={`/${router.asPath.split('/')[1]}/${router.asPath.split('/')[2]}/${href}`} passHref>
			<Link
				display="block"
				py="2"
				px="3"
				borderRadius="md"
				transition="all 0.3s"
				fontWeight="medium"
				fontSize="sm"
				userSelect="none"
				aria-current={isActive ? 'page' : undefined}
				color={href === '' && (!Number.isNaN(pathCheck) || pathCheck === href) ? 'hsl(334, 88%, 55%)' : ''}
				// {mode('white.700', 'white.400')}
				// _hover={{
				// 	bg: mode("blue.200", "blue.700"),
				// 	color: mode("white.900", "white"),
				// }}
				_hover={router.asPath === href ? { color: 'brand.primary' } : { color: 'brand.secondary' }}
				// _activeLink={{
				// 	bg: router.asPath === href ? "blue.200" : "",
				// 	color: "inherit",
				// }}
				{...rest}
			>
				<HStack spacing="4">
					<Icon as={icon} fontSize="lg" opacity={0.64} />
					<Text as="span">{label}</Text>
				</HStack>
			</Link>
		</NextLink>
	);
}
