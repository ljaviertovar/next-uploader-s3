import Panel from "@/components/app/panel"

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Panel/>
	)
}
