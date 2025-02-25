'use client'

import { Box, useDisclosure } from "@chakra-ui/react"
import { DrawerBackdrop, DrawerCloseTrigger, DrawerContent, DrawerRoot } from "@/components/ui/drawer"
import SideNav from "./side-nav"

export default function Panel() {
	const { open, onOpen, onClose } = useDisclosure()

	return (
		<Box
			minH='100vh'
		>
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
				{/* <DrawerTrigger asChild>
					<Button variant='outline' size='sm'>
						Open ({placement})
					</Button>
				</DrawerTrigger> */}
				<DrawerContent>
					<SideNav onClose={onClose} />
					<DrawerCloseTrigger />
				</DrawerContent>
			</DrawerRoot>

			{/* <MobileNav onOpen={onOpen} /> */}
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{/* Content */}
				holi
			</Box>
		</Box>
	)
}
