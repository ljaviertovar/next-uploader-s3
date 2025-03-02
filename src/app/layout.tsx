import type { Metadata } from "next"

import { Provider } from "@/components/ui/provider"
import { Theme } from "@chakra-ui/react"

export const metadata: Metadata = {
	title: "AI UploaderS3",
	description: "Upload your files to S3 and ask for AI processing",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<Provider>
					<Theme appearance='dark' colorPalette='cyan'>
						{children}
					</Theme>
				</Provider>
			</body>
		</html>
	)
}
