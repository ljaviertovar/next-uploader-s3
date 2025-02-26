import Link from "next/link"

import { Text } from "@chakra-ui/react"

export default function Logo() {
	return (
		<Link href='/'>
			<Text fontSize='xl' fontFamily='monospace' fontWeight='bold'>
				IAUploaderS3
			</Text>
		</Link>
	)
}
