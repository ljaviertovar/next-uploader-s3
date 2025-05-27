'use client'

import { Box, Button, HStack, Progress } from '@chakra-ui/react'
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from '@/components/ui/file-upload'

import FileRejectedList from './file-rejected-list'

import useUploader from '../hooks/use-uploader'

const fileUpload = {
	maxFiles: 1,
	maxFileSize: 10000000,
	accept: ['application/pdf'],
}

export default function FileUploader() {
	const {
		acceptedFiles,
		setAcceptedFiles,
		rejectedFiles,
		setRejectedFiles,
		uploading,
		uploadProgress,
		handleAccepted,
		handleRejected,
		handleUpload,
	} = useUploader()

	return (
		<FileUploadRoot
			maxW='xl'
			alignItems='stretch'
			{...fileUpload}
			onFileAccept={handleAccepted}
			onFileReject={handleRejected}
			onChange={details => {
				const target = details.target as HTMLInputElement
				const files: FileList = target.files as FileList

				setAcceptedFiles(Array.from(files))
				setRejectedFiles([])
			}}
		>
			<FileUploadDropzone
				label='Drag and drop here to upload'
				description='.pdf up to 10MB'
			/>

			<Progress.Root
				value={uploadProgress}
				size={'xs'}
				w='full'
			>
				<Progress.Track>
					<Progress.Range />
				</Progress.Track>
			</Progress.Root>

			{acceptedFiles.length > 0 && (
				<Box bg={'bg.success'}>
					<FileUploadList clearable />
				</Box>
			)}

			<FileRejectedList rejectedFiles={rejectedFiles} />

			<HStack
				justifyContent={'center'}
				w={'full'}
				mt={{ base: 6, md: 8 }}
			>
				<Button
					size='sm'
					disabled={!acceptedFiles.length || uploading}
					onClick={() => handleUpload()}
				>
					{uploading ? 'Uploading files...' : 'Upload files'}
				</Button>
			</HStack>
		</FileUploadRoot>
	)
}
