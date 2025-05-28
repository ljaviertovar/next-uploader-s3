'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Box, Flex, BoxProps, Link as ChakraLink, CloseButton, Icon } from '@chakra-ui/react'
import Logo from '../commons/logo'

import { NavItem as NavItemType } from '@/types'

import { NAV_ITEMS } from '@/data/constants'

interface SideNav extends BoxProps {
	onClose: () => void
}

export default function SideNav({ onClose, ...rest }: SideNav) {
	const pathname = usePathname()
	const selected = NAV_ITEMS.find(item => item.href === pathname)

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
			<Flex
				direction={'column'}
				gap={2}
				p={4}
			>
				{NAV_ITEMS.map(item => (
					<NavItem
						key={item.label}
						selected={selected?.href === item.href}
						{...item}
					/>
				))}
			</Flex>
		</Box>
	)
}

const NavItem = ({ label, icon, href, selected }: NavItemType & { selected: boolean }) => {
	return (
		<ChakraLink
			asChild
			w='full'
		>
			<NextLink href={href}>
				<Flex
					css={{
						width: 'full',
						padding: '4',
						alignItems: 'center',
						borderRadius: 'md',
						backgroundColor: selected ? 'bg' : 'transparent',
						color: selected ? 'cyan.fg' : 'fg',
						fontWeight: 'semibold',
						fontSize: 'md',
					}}
					_hover={{
						color: 'cyan.fg',
						backgroundColor: 'bg',
					}}
				>
					{icon && (
						<Icon
							mr='4'
							size={'sm'}
							as={icon}
						/>
					)}
					{label}
				</Flex>
			</NextLink>
		</ChakraLink>
	)
}
