import Image from "next/image";
import Link from "next/link";
import logo from "./icon.jpg";
export default function Nav() {
	return (
		<nav className="h-16 fixed bg-mantle/80 p-4 flex flex-row justify-between border-b border-mauve w-full backdrop-blur-xl gap-4 z-20">
			{" "}
			<Link
				href="/"
				className="inline-flex justify-center items-center py-4 hover:bg-surface2/70 rounded-md duration-200"
			>
				<Image src={logo} className="size-8 rounded-md mr-2" alt="tgt icon" />
				<h1 className="text-2xl font-bold text-subtext0 sm:block hidden">mashoor</h1>
			</Link>
			<div className="flex flex-row gap-4 justify-center items-center">
				<Link href="/blog" className="text-blue hover:text-sky active:text-red font-bold">
					blog
				</Link>
			</div>
		</nav>
	);
}
