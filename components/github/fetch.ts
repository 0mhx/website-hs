"use server";
import { graphql } from "@octokit/graphql";

export async function getLatestDevelopmentActivity(): Promise<{
	totalContributions: number;
	contributions: [string, number][];
} | null> {
	try {
		const response = await graphql<{
			user: {
				contributionsCollection: {
					contributionCalendar: {
						totalContributions: number;
						weeks: { contributionDays: { contributionCount: number; date: string }[] }[];
					};
				};
			};
		}>(
			`
        query ($userName: String!) {
          user(login: $userName) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `,
			{
				userName: "0mhx",
				headers: {
					authorization: `token ${process.env.GITHUB_PAT}`,
				},
			},
		);

		const contributionCalendar = response.user.contributionsCollection.contributionCalendar;

		// Flatten the contribution data
		const contributions: [string, number][] = contributionCalendar.weeks.flatMap((week) =>
			week.contributionDays.map((day) => [day.date, day.contributionCount] as [string, number]),
		);

		return {
			totalContributions: contributionCalendar.totalContributions,
			contributions,
		};
	} catch (error) {
		console.warn("getLatestDevelopmentActivity: Error while fetching latest development activity.", error);
		return null;
	}
}
