import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: discordRemotePatterns(["avatars", "icons"]),
	},
	cacheComponents: true,
};
const mdx = createMDX();
export default mdx(nextConfig);
function discordRemotePatterns(pathnames: string[]) {
	return pathnames.map((pathname) => ({
		pathname: `/${pathname}/**`,
		hostname: "cdn.discordapp.com",
	}));
}
