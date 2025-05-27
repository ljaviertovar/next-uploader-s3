import { Heading, VStack } from '@chakra-ui/react'
import FileUploader from '@/features/uploader/components/file-uploader'

export default function UploaderPage() {
	return (
		<VStack gap={{ base: 4, md: 8 }}>
			<Heading
				size={{ base: 'xl', md: '3xl' }}
				mb={4}
				py={{ base: 4, md: 8 }}
				letterSpacing={'tight'}
			>
				Upload your files to your Bucket
			</Heading>
			<FileUploader />
		</VStack>
	)
}
