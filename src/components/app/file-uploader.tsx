"use client"

import { useState } from "react"

import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "@/components/ui/file-upload"
import { Box, Flex, Icon } from "@chakra-ui/react"

import { LuFile } from "react-icons/lu"

import { RejectedFileDetails } from "@/types"

const fileUpload = {
	maxFiles: 1,
	maxFileSize: 1000000,
	accept: ["application/pdf"],
}

export default function FileUploader() {
	const [rejectedFiles, setRejectedFiles] = useState<RejectedFileDetails[]>([])

	const handleAcepted = (fileDetails: any) => {
		console.log("accepted", { fileDetails })
	}

	const handleRejected = (fileDetails: any) => {
		fileDetails = fileDetails.files
		console.log(fileDetails.map((f: RejectedFileDetails) => f.file))
		if (fileDetails.length > 0) {
			setRejectedFiles(fileDetails)
		}
	}

	return (
		<FileUploadRoot
			maxW='xl'
			alignItems='stretch'
			{...fileUpload}
			onFileAccept={handleAcepted}
			onFileReject={handleRejected}
			onChange={() => {
				setRejectedFiles([])
			}}
		>
			<FileUploadDropzone label='Drag and drop here to upload' description='.pdf up to 5MB' />

			<Box bg={"bg.success"}>
				<FileUploadList clearable />
			</Box>

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
		</FileUploadRoot>
	)
}
