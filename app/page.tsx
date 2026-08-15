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
import Link from "next/link";

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
		color: string;
	}[] = [
		{
			name: "indicia (current)",
			description: "ai powered open source intelligence",
			link: "indiciateam",
      Icon: ScanEye,
			color: "text-teal",
		},
		{
			name: "stardust",
			description:
				"isolated, disposable workspaces (kinda dead, hmu if you want to maintain)",
			link: "aetherra/stardust",
      Icon: Sparkles,
			color: "text-yellow",
		},
		{
			name: "schoology-frontend",
			description:
				"alternative frontend for schoology (wip, unmaintained)",
			link: "0mhx/schoology-frontend",
      Icon: GraduationCap,
			color: "text-blue",
		},
	];

	const contact: Contact[] = [
		{
			name: "email - primary",
			link: "mailto:contact@mashoorah.me",
			display: "contact@mashoorah.me",
			Icon: Mail,
			color: "text-yellow",
		},
		{
			name: "email - work",
			link: "mailto:m@indicia.app",
			display: "m@indicia.app",
			Icon: Mail,
			color: "text-yellow",
		},
		{
			name: "discord",
			link: "https://discord.com/users/1091735539025203220",
			display: "0mhx",
			Icon: Discord,
			color: "text-lavender",
		},
		{
			name: "signal",
			link: "https://signal.me/#eu/Kf52oLQ2pC8glop6IBOjRUYDfeyCZ5TIleAw1VQrgUkWVDcljKdJjoYaWPlip8qg",
			display: "mhx.01",
			Icon: Signal,
			color: "fill-blue",
		},
		{
			name: "github",
			link: "https://github.com/0mhx",
			display: "0mhx",
			Icon: GitHub,
			color: "text-text",
		},
		{
			name: "twitter/x",
			link: "https://twitter.com/mash00r",
			display: "@mash00r",
			Icon: Twitter,
			color: "text-blue",
		},
		{
			name: "bluesky",
			link: "https://bsky.app/profile/incognitotgt.me",
			display: "incognitotgt.me",
			Icon: Bluesky,
			color: "text-sky",
		},
		{
			name: "linkedin",
			link: "https://linkedin.com/in/mashoor-ahmed",
			display: "disabled for now",
			Icon: Linkedin,
			color: "text-blue",
		},
	];

	return (
		<div className="w-full px-4 py-4 sm:px-6 sm:py-6">
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-8 text-sm">
				<section className="flex flex-col gap-4">
					<p className="leading-relaxed">
						i'm a 15y software engineer based in the dc area! i currently work as the cofounder and cio at <Link href="https://indicia.app" rel="noopener" target="_blank" className="text-blue hover:text-sky active:text-red font-bold">indicia</Link>,
          where we build ai powered intelligence solutions for finding information online.
          <br />
          <br />
          in my free time i sometimes tinker with random software, which sometimes has led to finding security vulnerabilities - check out my <Link href="/blog" className="text-blue hover:text-sky active:text-red font-bold">blog</Link> for some insane stuff
					</p>

					<ul className="list-inside list-disc space-y-1">
						<li>muslim; school msa board</li>
						<li>cross country / track</li>
						<li>planning to major in islamic studies + computer science</li>
          </ul>
          <br />
					feel free to contact me regarding anything on the platforms below
				</section>

				<section className="flex flex-col gap-4">
					<h2 className="text-2xl text-mauve font-bold">projects</h2>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{projects.map(({ Icon,color, ...project }) => (
							<Card
								className={`w-full ${color}`}
								title={project.name}
								description={project.description}
								href={`https://github.com/${project.link}`}
								key={project.name}
                icon={Icon && <Icon className={color} />}
							/>
						))}
					</div>
				</section>

				<section className="flex flex-col gap-4">
					<h2 className="text-2xl text-mauve font-bold">contact</h2>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{contact.map(({ name, display, link, Icon, color }) => (
							<Card
								className="w-full"
								title={name}
								description={display}
								href={link}
								icon={<Icon className={`size-6 ${color}`} />}
								key={name}
							/>
						))}
					</div>
				</section>

				<section className="flex flex-col gap-4">
					<h2 className="text-2xl text-mauve font-bold">
						what im up to right now
					</h2>

					<div className="w-full overflow-hidden">
						<Suspense fallback={<SuspenseFallback />}>
							<DiscordStatus />
						</Suspense>
					</div>
				</section>
			</div>
		</div>
	);
}
