"use client"

import { Box, useDisclosure } from "@chakra-ui/react"
import { DrawerBackdrop, DrawerCloseTrigger, DrawerContent, DrawerRoot } from "@/components/ui/drawer"
import SideNav from "./side-nav"
import PanelHeader from "./panel-header"

interface Props {
	children: React.ReactNode
 }


export default function Panel({ children }: Props) {
	const { open, onOpen, onClose } = useDisclosure()

	return (
		<Box minH='100vh'>
			<SideNav onClose={() => onClose} display={{ base: "none", md: "block" }} />
			{/* <Drawer
				open={isOpen}
				// placement='left'

				// onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer> */}

			<DrawerRoot open={open} placement={"start"}>
				<DrawerBackdrop />
				<DrawerContent>
					<SideNav onClose={onClose} />
					<DrawerCloseTrigger />
				</DrawerContent>
			</DrawerRoot>

			<PanelHeader onOpen={onOpen} />

			<Box ml={{ base: 0, md: 60 }} p='4'>
				{children}
			</Box>
		</Box>
	)
}
