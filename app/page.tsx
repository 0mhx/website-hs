import { DiscordStatus, SuspenseFallback } from "@/components/discord";
import { GitContributionGraph } from "@/components/github";
import { getLatestDevelopmentActivity } from "@/components/github/fetch";
import { Card } from "fumadocs-ui/components/card";
import {
	BrickWall,
	EyeOff,
	Fingerprint,
	GraduationCap,
	Linkedin,
	type LucideIcon,
	Mail,
	ScanEye,
	Sparkles,
	Twitter,
} from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { Bluesky, Discord, GitHub, Signal } from "./icons";

type Contact = {
	name: string;
	link: string;
	display: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
	color: string;
};

type Misc = {
	name: string;
	description: string;
	link: string;
	Icon?: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
	color: string;
};

export default async function Home() {
	"use cache";
	cacheLife("hours");
	const contribs = getLatestDevelopmentActivity();
	const projects: Misc[] = [
		{
			name: "indicia (current)",
			description: "ai powered open source intelligence",
			link: "indiciateam",
			Icon: ScanEye,
			color: "text-teal",
		},
		{
			name: "stardust",
			description: "isolated, disposable workspaces (kinda dead, hmu if you want to maintain)",
			link: "aetherra/stardust",
			Icon: Sparkles,
			color: "text-yellow",
		},
		{
			name: "schoology-frontend",
			description: "alternative frontend for schoology (wip, unmaintained)",
			link: "0mhx/schoology-frontend",
			Icon: GraduationCap,
			color: "text-blue",
		},
	];

	const featured: Misc[] = [
		{
			name: "CVE-2026-30368",
			description: "how crappy auth allowed me to control any computer with lightspeed classroom",
			link: "/blog/lightspeed",
			color: "text-red",
			Icon: Fingerprint,
		},
		{
			name: "bypass schoology client side security",
			description: "simple script that allows you to fetch the members list of a course even if it's hidden",
			link: "https://gist.github.com/0mhx/8f7505becdd385665b548846d33844ea",
			color: "text-sky",
			Icon: EyeOff,
		},
		{
			name: "CVE-2025-61430",
			description: "vuln i found by accident that allows me to see other dns requests at my school",
			link: "/blog/simpledns-vuln",
			color: "text-green",
			Icon: BrickWall,
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
			color: "text-sky",
		},
		{
			name: "bluesky",
			link: "https://bsky.app/profile/incognitotgt.me",
			display: "incognitotgt.me",
			Icon: Bluesky,
			color: "text-teal",
		},
		{
			name: "linkedin",
			link: "https://linkedin.com/in/mashoor-ahmed",
			display: "disabled for now",
			Icon: Linkedin,
			color: "text-blue",
		},
		{
			name: "email - work",
			link: "mailto:m@indicia.app",
			display: "m@indicia.app",
			Icon: Mail,
			color: "text-yellow",
		},
	];

	return (
		<div className="w-full px-4 py-4 sm:px-6 sm:py-6">
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-8 text-sm">
				<section className="flex flex-col gap-4">
					<p className="leading-relaxed">
						i'm a 15y software engineer based in the dc area! i currently work as the cofounder and cio at{" "}
						<Link
							href="https://indicia.app"
							rel="noopener"
							target="_blank"
							className="text-blue hover:text-sky active:text-red font-bold"
						>
							indicia
						</Link>
						, where we build ai powered intelligence solutions for finding information online.
						<br />
						<br />
						in my free time i sometimes find holes in random software - check out my{" "}
						<Link href="/blog" className="text-blue hover:text-sky active:text-red font-bold">
							blog
						</Link>{" "}
						for some insane stuff i found
					</p>

					<ul className="list-inside list-disc space-y-1">
						<li>muslim; school msa board</li>
						<li>cross country / track</li>
						<li>planning to major in islamic studies + computer science</li>
					</ul>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="text-2xl text-mauve font-bold">projects</h2>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{projects.map(({ Icon, color, ...project }) => (
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
					<h2 className="text-2xl text-mauve font-bold">featured</h2>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{featured.map(({ Icon, color, ...item }) => (
							<Card
								className={`w-full ${color}`}
								title={item.name}
								description={item.description}
								href={item.link}
								key={item.name}
								icon={Icon && <Icon className={color} />}
							/>
						))}
					</div>
        </section>
        <section className="flex flex-col gap-4">
					<h2 className="text-2xl text-mauve font-bold">activity</h2>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<DiscordStatus />
						<GitContributionGraph dataPromise={contribs} />
					</div>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="text-2xl text-mauve font-bold">contact</h2>
					<p>feel free to contact me regarding anything</p>
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
			</div>
		</div>
	);
}
