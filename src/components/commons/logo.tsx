import Link from 'next/link'

import { Box, HStack, Text } from '@chakra-ui/react'

export default function Logo() {
	return (
		<Link href='/'>
			<HStack alignItems='center'>
				<Box w={8}>
					<img
						src='/img/AIUploaderS3-3.webp'
						alt='AIUploaderS3'
					/>
				</Box>
				<Text
					fontSize='xl'
					fontFamily='monospace'
					fontWeight='bold'
				>
					IAUploaderS3
				</Text>
			</HStack>
		</Link>
	)
}
