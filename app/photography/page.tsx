import { graphql } from "@octokit/graphql";
import exifr from "exifr";
import { cacheLife } from "next/cache";
import PhotoGrid from "./photo-grid";

export const metadata = {
	title: "photography",
	description: "a collection of my photography work",
};

export default async function Page() {
	"use cache";
	cacheLife("days");
	const list = await graphql<{
		repository: {
			object: {
				entries: {
					name: string;
					type: string;
					object?: {
						entries: {
							name: string;
							type: string;
						}[];
					} | null;
				}[];
			} | null;
		} | null;
	}>(
		`
    query FetchRepoFiles(
      $owner: String!
      $name: String!
      $expression: String!
    ) {
      repository(owner: $owner, name: $name) {
        object(expression: $expression) {
          ... on Tree {
            entries {
              name
              type
              object {
                ... on Tree {
                  entries {
                    name
                    type
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
		{
			owner: "0mhx",
			name: "photography",
			expression: "main:",
			headers: {
				authorization: `token ${process.env.GITHUB_TOKEN}`,
			},
		},
	);

	const entries = list.repository?.object?.entries ?? [];

	const files = entries
		.filter((entry) => entry.type === "blob")
		.map((entry) => ({
			url: `https://raw.githubusercontent.com/0mhx/photography/refs/heads/main/${entry.name}`,
			title: entry.name,
		}));
	const dated = await Promise.all(
		files.map(async (file) => {
			try {
				const exif = await exifr.parse(file.url, { pick: ["DateTimeOriginal"] });
				const taken = exif?.DateTimeOriginal instanceof Date ? exif.DateTimeOriginal.getTime() : 0;
				return { ...file, taken };
			} catch {
				return { ...file, taken: 0 };
			}
		}),
	);
	dated.sort((a, b) => b.taken - a.taken);
	return (
		<div className="w-full px-4 py-6 sm:px-6 sm:py-8">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold text-mauve sm:text-4xl">photography</h1>

					<p className="text-sm leading-relaxed">random photos of outdoor scenes - use indicia to find the location!</p>
				</div>

				<PhotoGrid files={dated} />
			</div>
		</div>
	);
}
