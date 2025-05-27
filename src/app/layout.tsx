import type { Metadata } from 'next'

import { Provider as ChakraProvider } from '@/components/ui/provider'
import { Theme } from '@chakra-ui/react'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
	title: 'AI UploaderS3',
	description: 'Upload your files to S3 and ask for AI processing',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body>
				<ChakraProvider>
					<Theme
						appearance='dark'
						colorPalette='cyan'
					>
						<Toaster />
						{children}
					</Theme>
				</ChakraProvider>
			</body>
		</html>
	)
}
