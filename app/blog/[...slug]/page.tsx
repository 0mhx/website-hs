import { source } from "@/lib/source";
import type { Metadata } from "next";

import { Card, Cards } from "fumadocs-ui/components/card";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Heading } from "fumadocs-ui/components/heading";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);

	if (!page) notFound();

	const { body: MDX } = page.data;

	return (
		<div className="w-full px-4 py-6 sm:px-6 sm:py-8">
			<DocsBody className="mx-auto mb-8 w-full max-w-3xl">
				<header className="mb-8">
					<h1 className="mb-2 text-3xl leading-tight text-mauve">{page.data.title}</h1>

					<time dateTime={new Date(page.data.date).toISOString()} className="text-sm text-subtext0">
						{new Date(page.data.date).toLocaleDateString()}
					</time>
				</header>

				<MDX
					components={{
						h1: (props) => <Heading as="h1" {...props} />,
						h2: (props) => <Heading as="h2" {...props} />,
						h3: (props) => <Heading as="h3" {...props} />,
						h4: (props) => <Heading as="h4" {...props} />,
						h5: (props) => <Heading as="h5" {...props} />,
						h6: (props) => <Heading as="h6" {...props} />,
						Card: (props) => <Card {...props} />,
						Cards: (props) => <Cards {...props} />,
						Step: (props) => <Step {...props} />,
						Steps: (props) => <Steps {...props} />,
						Tab: (props) => <Tab {...props} />,
						Tabs: (props) => <Tabs {...props} />,
						// @ts-expect-error get out
						img: (props) => <ImageZoom {...props} />,
						pre: ({ ref: _ref, ...props }) => (
							<CodeBlock {...props}>
								<Pre>{props.children}</Pre>
							</CodeBlock>
						),
					}}
				/>
			</DocsBody>
		</div>
	);
}

export async function generateStaticParams() {
	return source.getPages().map((page) => ({
		slug: page.slugs,
	}));
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
	const params = await props.params;
	const page = source.getPage(params.slug);

	if (page == null) notFound();

	return {
		title: page?.data.title,
		description: page?.data.description,
		openGraph: {
			title: page?.data.title,
			description: page?.data.description,
			url: `https://mashoorah.me/blog/${page?.slugs.join("/")}`,
			siteName: "mashoor a",
		},
	} satisfies Metadata;
}
