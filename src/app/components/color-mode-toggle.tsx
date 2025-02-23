"use client"

import { IconButton } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export default function ColorModeToggle() {
	const { theme, setTheme } = useTheme()
	const toggleColorMode = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}
	return (
		<IconButton aria-label='toggle color mode' onClick={toggleColorMode}>
			{theme === "light" ? <MoonIcon /> : <SunIcon />}
		</IconButton>
	)
}
