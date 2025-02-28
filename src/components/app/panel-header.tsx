import { Avatar, Box, Button, Flex, FlexProps, HStack, Text, VStack } from "@chakra-ui/react"
import { MenuContent, MenuItem, MenuRoot, MenuSeparator, MenuTrigger } from "@/components/ui/menu"

import Logo from "../logo"

import { ChevronDown, LogOut, Menu, UserIcon } from "lucide-react"

interface Props extends FlexProps {
	onOpen: () => void
}

export default function PanelHeader({ onOpen, ...rest }: Props) {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 8 }}
			height='20'
			alignItems='center'
			bg={"bg.panel"}
			borderBottomWidth='1px'
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<Button onClick={onOpen} display={{ base: "flex", md: "none" }} variant='ghost' aria-label='open menu'>
				<Menu />
			</Button>

			<Box display={{ base: "flex", md: "none" }}>
				<Logo />
			</Box>

			<HStack gap={{ base: "0", md: "6" }}>
				<Flex alignItems={"center"}>
					<MenuRoot>
						<MenuTrigger asChild>
							<HStack cursor='pointer'>
								<Avatar.Root>
									<Avatar.Fallback name='Clark Kent' />
									<Avatar.Image src='/img/avatars/01.png' />
								</Avatar.Root>
								<VStack display={{ base: "none", md: "flex" }} alignItems='flex-start' gap='1px' ml='2'>
									<Text fontSize='sm'>Clark Kent</Text>
									<Text fontSize='xs' color='gray.600'>
										Admin
									</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }} w={"1rem"}>
									<ChevronDown />
								</Box>
							</HStack>
						</MenuTrigger>
						<MenuContent>
							<MenuItem value='profile'>
								<UserIcon size={"16px"} /> Profile
							</MenuItem>
							<MenuSeparator />
							<MenuItem value='sign-up'>
								<LogOut size={"16px"} /> Sign Up
							</MenuItem>
						</MenuContent>
					</MenuRoot>
				</Flex>
			</HStack>
		</Flex>
	)
}
