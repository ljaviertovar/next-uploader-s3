import { Flex, Icon, VStack } from '@chakra-ui/react'

import { LuFile } from 'react-icons/lu'

import { RejectedFileDetails } from '@/types'

interface Props {
	rejectedFiles: RejectedFileDetails[]
}

export default function FileRejectedList({ rejectedFiles }: Props) {
	return (
		<VStack
			gap={4}
			align='stretch'
		>
			{rejectedFiles.map(({ file }) => (
				<Flex
					key={file.name}
					gap={3}
					borderWidth={1}
					p={4}
					textStyle={'sm'}
					borderRadius={'l2'}
					bg={'bg.error'}
					borderColor={'border.error'}
					color={'fg.error'}
				>
					<Icon
						fontSize='lg'
						color='fg.error'
					>
						<LuFile />
					</Icon>
					{file.name} - File not allowed or too large.
				</Flex>
			))}
		</VStack>
	)
}
