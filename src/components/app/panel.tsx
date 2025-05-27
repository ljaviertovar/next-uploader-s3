'use client'

import { Box, useDisclosure } from '@chakra-ui/react'
import { DrawerBackdrop, DrawerContent, DrawerRoot } from '@/components/ui/drawer'

import SideNav from '@/components/app/side-nav'
import PanelHeader from '@/components/app/panel-header'

interface Props {
	children: React.ReactNode
}

export default function Panel({ children }: Props) {
	const { open, onOpen, onClose } = useDisclosure()

	return (
		<Box minH='100vh'>
			<SideNav
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<DrawerRoot
				open={open}
				placement={'start'}
				size={'sm'}
			>
				<DrawerBackdrop />
				<DrawerContent>
					<SideNav onClose={onClose} />
				</DrawerContent>
			</DrawerRoot>

			<PanelHeader onOpen={onOpen} />

			<Box
				ml={{ base: 0, md: 60 }}
				as={'main'}
				p={4}
				css={{
					height: 'calc(100vh - 80px)',
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
