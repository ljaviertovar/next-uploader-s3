import NextLink from 'next/link'

import { Box, Flex, BoxProps, Link as ChakraLink, CloseButton, Icon } from '@chakra-ui/react'
import Logo from '../commons/logo'

import { NavItem as NavItemType } from '@/types'

import { NAV_ITEMS } from '@/data/constants'

interface SideNav extends BoxProps {
	onClose: () => void
}

export default function SideNav({ onClose, ...rest }: SideNav) {
	return (
		<Box
			transition='3s ease'
			bg={'bg.panel'}
			borderRightWidth={1}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
		>
			<Flex
				h={20}
				alignItems='center'
				justifyContent='space-between'
				borderBottomWidth='1px'
				px={8}
			>
				<Logo />
				<CloseButton
					display={{ base: 'flex', md: 'none' }}
					onClick={onClose}
				/>
			</Flex>
			<Box
				py={4}
				px={8}
			>
				{NAV_ITEMS.map(item => (
					<NavItem
						key={item.label}
						{...item}
					/>
				))}
			</Box>
		</Box>
	)
}

const NavItem = ({ label, icon, href }: NavItemType) => {
	return (
		<ChakraLink
			asChild
			w='full'
		>
			<NextLink href={href}>
				<Flex
					css={{
						width: 'full',
						paddingX: '4',
						paddingY: '2',
						alignItems: 'center',
						borderRadius: 'md',
						cursor: 'pointer',
						backgroundColor: 'bg',
						color: 'cyan.fg',
						fontWeight: 'semibold',
						fontSize: 'md',
					}}
					_hover={{
						color: 'cyan.fg',
					}}
				>
					{icon && (
						<Icon
							mr='4'
							fontSize='sm'
							as={icon}
						/>
					)}
					{label}
				</Flex>
			</NextLink>
		</ChakraLink>
	)
}
