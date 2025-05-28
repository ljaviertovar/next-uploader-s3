import { Heading, VStack } from '@chakra-ui/react'
import Files from '@/features/files'

export default function UploaderPage() {
	return (
		<VStack gap={{ base: 4, md: 8 }}>
			<Heading
				size={{ base: 'xl', md: '3xl' }}
				mb={4}
				py={{ base: 4, md: 8 }}
				letterSpacing={'tight'}
			>
				My Files
			</Heading>
			<Files />
		</VStack>
	)
}
