import { DiscordStatus, SuspenseFallback } from "@/components/discord";
import { Card } from "fumadocs-ui/components/card";
import {
GraduationCap,
	Linkedin,
	type LucideIcon,
	Mail,
	ScanEye,
  Sparkles,
	Twitter,
} from "lucide-react";
import { Suspense } from "react";
import {
	Bluesky,
	Discord,
	GitHub,
	Signal,
} from "./icons";
type Contact = {
	name: string;
	link: string;
	display: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
	color: string;
};
export default function Home() {
	const projects: {
		name: string;
		description: string;
		link: string;
		Icon?: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
	}[] = [
		{
			name: "Indicia",
			description: "osint tool for searching up things",
			link: "indiciateam",
			Icon: ScanEye,
		},
		{
			name: "Stardust",
			description: "isolated, disposable workspaces (kinda dead, hmu if you want to maintain)",
			link: "aetherra/stardust",
			Icon: Sparkles,
		},
		{
			name: "schoology-frontend",
			description: "alternative frontend for schoology (wip, unmaintained)",
			link: "incognitotgt/schoology-frontend",
			Icon: GraduationCap,
		},
	];
	const contact: Contact[] = [
		{
			name: "Email - primary",
			link: "mailto:contact@mashoorah.me",
			display: "contact@mashoorah.me",
			Icon: Mail,
			color: "text-yellow",
		},
		{
			name: "Email - work",
			link: "mailto:m@indicia.app",
			display: "m@indicia.app",
			Icon: Mail,
			color: "text-yellow",
		},
		{
			name: "Discord",
			link: "https://discord.com/users/1091735539025203220",
			display: "0mhx",
			Icon: Discord,
			color: "text-lavender",
		},
		{
			name: "Signal",
			link: "https://signal.me/#eu/Kf52oLQ2pC8glop6IBOjRUYDfeyCZ5TIleAw1VQrgUkWVDcljKdJjoYaWPlip8qg",
			display: "mhx.01",
			Icon: Signal,
			color: "fill-blue",
		},
		{
			name: "GitHub",
			link: "https://github.com/incognitotgt",
			display: "incognitotgt",
			Icon: GitHub,
			color: "text-text",
		},
		{
			name: "Twitter",
			link: "https://twitter.com/mash00r",
			display: "@mash00r",
			Icon: Twitter,
			color: "text-blue",
		},
		{
			name: "Bluesky",
			link: "https://bsky.app/profile/incognitotgt.me",
			display: "incognitotgt.me",
			Icon: Bluesky,
			color: "text-sky",
		},
		{
			name: "Linkedin",
			link: "https://linkedin.com/in/mashoor-ahmed",
			display: "disabled for now",
			Icon: Linkedin,
			color: "text-blue",
		},
	];
	return (
		<div className="p-2 flex flex-col text-md gap-2 md:px-72">
			<div className="flex w-full flex-col gap-4">
					<h2 className="text-2xl text-mauve">about</h2>
					<p className="md:mr-4">
						i'm a 15y software engineer based in the dc area! i currently work as the cofounder and cio at indicia,
          where we build ai powered intelligence solutions for finding information online.
          <br />
          <br />
          in my free time i sometimes tinker with random software, which sometimes has led to finding security vulnerabilities - check out the blog for some of my writeups!
					</p>
					<ul className="list-disc list-inside">
						<li>muslim</li>
						<li>cross country / track</li>
						<li>planning to major in islamic studies + computer science</li>
					</ul>
					<h2 className="text-2xl text-mauve">projects</h2>
					<div className="flex flex-wrap gap-2">
						{projects.map(({ Icon, ...project }) => (
							<Card
								className="w-auto min-w-36 max-w-56"
								title={project.name}
								description={project.description}
								href={`https://github.com/${project.link}`}
								key={project.name}
								icon={Icon && <Icon />}
							/>
						))}
					</div>
					<h2 className="text-2xl text-mauve">contact</h2>
					<div className="flex flex-wrap gap-2 items-center">
						{contact.map(({ name, display, link, Icon, color }) => (
							<Card
								className="min-w-48 max-w-56"
								title={name}
								description={display}
								href={link}
								icon={<Icon className={`size-6 ${color}`} />}
								key={name}
							/>
						))}
					</div>
					<h2 className="text-2xl text-mauve">what im up to right now</h2>
					<Suspense fallback={<SuspenseFallback />}>
						<DiscordStatus />
					</Suspense>
			</div>
		</div>
	);
}
