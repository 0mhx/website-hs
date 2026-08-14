import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Doto, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Nav from "./nav";
const sans = IBM_Plex_Mono({ variable: "--font-sans", subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
	title: { default: "mashoor a", template: "%s - mashoor a" },
	description: "my personal portfolio",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${sans.variable} dark`}>
			<body className="font-sans antialiased bg-base text-text font-medium h-screen flex flex-col overflow-x-hidden selection:bg-surface2/60">
				<TooltipProvider>
					<Nav />
					<main className="mt-20 px-2">{children}</main>
				</TooltipProvider>
				<Analytics />
			</body>
		</html>
	);
}
