import { Box, Text } from "@chakra-ui/react"

export default function Home() {
	return (
		<Box as='main' p={4}>
			<Text fontSize='2xl' mb={4}>
				Bienvenido a mi sitio web
			</Text>
			<Text>
				Este es el contenido principal de la página. Aquí puedes añadir cualquier información relevante, imágenes, o
				cualquier otro contenido que desees mostrar a los visitantes de tu sitio web.
			</Text>
		</Box>
	)
}
