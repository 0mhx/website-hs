import { source } from "@/lib/source";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "blog",
};

export default function Page() {
	const pages = source
		.getPages()
		.sort(
			(a, b) =>
				new Date(b.data.date).getTime() -
				new Date(a.data.date).getTime(),
		);

	return (
		<div className="w-full px-4 py-6 sm:px-6 sm:py-8">
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold text-mauve sm:text-4xl">
						blog
					</h1>

					<p className="text-sm leading-relaxed">
						for the time i need to write something down (probably a
						security writeup)
					</p>
				</div>

				<div className="flex flex-col divide-y divide-border">
					{pages.map((page) => (
						<article key={page.url} className="py-4 first:pt-0">
							<Link
								href={page.url}
								className="block text-lg font-semibold text-blue transition-colors hover:text-sky active:text-red"
							>
								{page.data.title}
							</Link>

							<time
								dateTime={new Date(page.data.date).toISOString()}
								className="mt-1 block text-sm text-muted-foreground"
							>
								{new Date(page.data.date).toLocaleDateString()}
							</time>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
