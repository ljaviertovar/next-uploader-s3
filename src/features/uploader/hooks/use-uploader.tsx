import { useState } from "react"
import axios from "axios"

import { toaster } from "@/components/ui/toaster"

import { RejectedFileDetails } from "@/types"

export default function useUploader() {
	const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
	const [rejectedFiles, setRejectedFiles] = useState<RejectedFileDetails[]>([])
	const [uploading, setUploading] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(0)

	const handleAccepted = (fileDetails: any) => {
		setAcceptedFiles(fileDetails.files)
	}

	const handleRejected = (fileDetails: any) => {
		fileDetails = fileDetails.files
		if (fileDetails.length > 0) {
			setRejectedFiles(fileDetails)
		}
	}

	const handleUpload = async () => {
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
				onUploadProgress: (event: any) => {
					if (event.lengthComputable) {
						const percentCompleted = Math.round((event.loaded * 100) / event.total)
						setUploadProgress(percentCompleted)
					}
				},
			})

			toaster.create({
				title: response.statusText,
				type: "success",
				duration: 6000,
			})
		} catch (error: any) {
			console.error("Failed to upload file", error)
			toaster.create({
				title: error.response.statusText,
				type: "error",
				duration: 6000,
			})
		} finally {
			setAcceptedFiles([])
			setUploading(false)
			setUploadProgress(0)
		}
	}

	return {
		acceptedFiles,
		setAcceptedFiles,
		rejectedFiles,
		setRejectedFiles,
		uploading,
		uploadProgress,
		handleAccepted,
		handleRejected,
		handleUpload,
	}
}
