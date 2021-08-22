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

	return (
		<NextLink href={href} passHref>
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
				color={href === router.asPath ? 'hsl(334, 88%, 55%)' : ''}
				_hover={router.asPath === href ? { color: 'brand.primary' } : { color: 'brand.secondary' }}
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
