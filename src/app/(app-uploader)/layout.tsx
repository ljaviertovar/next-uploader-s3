import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "AI UploaderS3",
	description: "Upload your files to S3 and ask for AI processing",
}

export default function UploaderLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <main>{children}</main>
}
