import NextLink from "next/link"

import { Box, Flex, Text, BoxProps, Link as ChakraLink, CloseButton, Icon } from "@chakra-ui/react"

import { NAV_ITEMS } from "@/constants"
import { NavItem as NavItemType } from "@/types"

interface SideNav extends BoxProps {
	onClose: () => void
}

export default function SideNav({ onClose, ...rest }: SideNav) {
	return (
		<Box
			transition='3s ease'
			// bg={useColorModeValue("white", "gray.900")}
			bg={"gray.900"}
			borderWidth='1px'
			borderRight='1px'
			// borderRightColor={useColorModeValue("gray.200", "gray.700")}
			borderRightColor={"gray.700"}
			w={{ base: "full", md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
		>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
				<Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
					IAUploaderS3
				</Text>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{NAV_ITEMS.map(item => (
				<NavItem key={item.label} {...item}/>
			))}
		</Box>
	)
}

const NavItem = ({ label, icon, href }: NavItemType) => {
	return (
		<ChakraLink asChild>
			<NextLink href={href}>
				<Flex
					align='center'
					p='4'
					mx='4'
					borderRadius='lg'
					cursor='pointer'
					_hover={{
						bg: "cyan.400",
						color: "white",
					}}
				>
					{icon && (
						<Icon
							mr='4'
							fontSize='16'
							_groupHover={{
								color: "white",
							}}
							as={icon}
						/>
					)}
					{label}
				</Flex>
			</NextLink>
		</ChakraLink>
	)
}
