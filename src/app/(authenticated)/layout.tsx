import { Metadata } from 'next'

import Panel from '@/components/app/panel'

export const metadata: Metadata = {
	title: 'AI UploaderS3',
	description: 'Upload your files to S3 and ask for AI processing',
}

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Panel>{children}</Panel>
}
