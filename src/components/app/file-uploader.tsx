"use client"

import { useState } from "react"
import axios from "axios"

import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "@/components/ui/file-upload"
import { Box, Button, Flex, HStack, Icon, Progress, VStack } from "@chakra-ui/react"

import { LuFile } from "react-icons/lu"

import { RejectedFileDetails } from "@/types"
import { toaster } from "@/components/ui/toaster"

const fileUpload = {
	maxFiles: 1,
	maxFileSize: 10000000,
	accept: ["application/pdf"],
}

export default function FileUploader() {
	const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
	const [rejectedFiles, setRejectedFiles] = useState<RejectedFileDetails[]>([])
	const [uploading, setUploading] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(0)

	const handleAccepted = (fileDetails: any) => {
		setAcceptedFiles(fileDetails.files)
	}

	const handleRejected = (fileDetails: any) => {
		console.log("Rejected file", fileDetails)
		fileDetails = fileDetails.files
		if (fileDetails.length > 0) {
			setRejectedFiles(fileDetails)
		}
	}

	const handleUpload = async () => {
		console.log("Uploading file", acceptedFiles)
		setUploading(true)
		setUploadProgress(0)

		const formData = new FormData()
		acceptedFiles.forEach(file => {
			formData.append("file", file)
		})

		try {
			const response = await axios.post("/api/s3/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: event => {
					if (event.lengthComputable) {
						const percentCompleted = Math.round((event.loaded * 100) / event.total)
						setUploadProgress(percentCompleted)
					}
				},
			})

			console.log("File uploaded successfully", response)

			toaster.create({
				title: response.statusText,
				type: "success",
				duration: 6000,
			})
		} catch (error) {
			console.error("Failed to upload file", error)
			toaster.create({
				title: "Failed to upload file",
				type: "error",
				duration: 6000,
			})
		} finally {
			setAcceptedFiles([])
			setUploading(false)
			setUploadProgress(0)
		}
	}

	console.log({ uploadProgress })

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
			<FileUploadDropzone label='Drag and drop here to upload' description='.pdf up to 10MB' />
			<Progress.Root value={uploadProgress} size={"xs"} w='full'>
				<Progress.Track>
					<Progress.Range />
				</Progress.Track>
			</Progress.Root>

			<Box bg={"bg.success"}>
				<FileUploadList clearable />
			</Box>

			<FileRejectedList rejectedFiles={rejectedFiles} />

			<HStack justifyContent={"center"} w={"full"} mt={{ base: 6, md: 8 }}>
				<Button size='sm' disabled={!acceptedFiles.length || uploading} onClick={() => handleUpload()}>
					{uploading ? "Uploading files..." : "Upload files"}
				</Button>
			</HStack>
		</FileUploadRoot>
	)
}

const FileRejectedList = ({ rejectedFiles }: { rejectedFiles: RejectedFileDetails[] }) => {
	return (
		<VStack gap={4} align='stretch'>
			{rejectedFiles.map(({ file }) => (
				<Flex
					key={file.name}
					gap={3}
					borderWidth={1}
					p={4}
					textStyle={"sm"}
					borderRadius={"l2"}
					bg={"bg.error"}
					borderColor={"border.error"}
					color={"fg.error"}
				>
					<Icon fontSize='lg' color='fg.error'>
						<LuFile />
					</Icon>
					{file.name} - File not allowed or too large.
				</Flex>
			))}
		</VStack>
	)
}
