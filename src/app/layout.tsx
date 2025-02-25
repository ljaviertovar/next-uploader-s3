import type { Metadata } from "next"

import ChackraProvider from "./providers/chackra-provider"

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
				<ChackraProvider>{children}</ChackraProvider>
			</body>
		</html>
	)
}
