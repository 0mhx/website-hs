import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
	const referer = request.headers.get("referer");
	const ip = request.headers.get("x-forwarded-for");
	const headers = Object.fromEntries(request.headers);
	const sus = referer?.includes("schoology.com") || ip?.startsWith("69.67.8") || request.cookies.has("strig");
	if (sus) {
		if (!request.cookies.has("strig"))
			request.cookies.set({
				name: "strig",
				value: crypto.randomUUID(),
			});
		await fetch(process.env.DISCORD_HOOK_URL as string, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content: "@everyone schoology referer or bcps ip detected!!!",
				embeds: [
					{
						fields: Object.entries(headers)
							.filter(
								([k]) =>
									!k.includes("sec-") && !k.includes("cookie") && !k.includes("accept") && !k.includes("x-vercel"),
							)
							.map(([k, v]) => ({
								name: k,
								value: `\`${v}\``,
								inline: true,
							})),
					},
					{
						fields: [
							{
								name: "cookies",
								value: `\`${JSON.stringify(Object.fromEntries(request.cookies))}\``,
							},
						],
					},
				],
			}),
    });
		if (referer?.includes("schoology.com")) {
			return NextResponse.redirect(
				"https://docs.google.com/document/d/1TyjXtO0YSKPCv8LT1SZbSwEsWOZ3hYzFPm6WYtmHx7g/edit?tab=t.0",
			);
		}
	}
	// const { os } = userAgent(request)
	// if (os.name?.includes('chrome')) {
	//   await fetch(process.env.DISCORD_HOOK_URL as string, {
	// 	method: "post",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify({
	// 		content: "cros ua",
	// 		embeds: [
	// 			{
	// 				fields: Object.entries(headers)
	// 					.filter(([k]) => !k.includes("sec-") && !k.includes("cookie") && !k.includes("accept") && !k.includes('x-vercel'))
	// 					.map(([k, v]) => ({
	// 						name: k,
	// 						value: `\`${v}\``,
	// 						inline: true,
	// 					})),
	// 			},
	// 		],
	// 	}),
	// });
	// }
	return NextResponse.next();
}
