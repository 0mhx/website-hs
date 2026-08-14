"use client";

import { Card } from "fumadocs-ui/components/card";
import { AudioLines, Clock, Code, MessageCircle } from "lucide-react";
import Image from "next/image";
import { type LanyardData, useLanyard } from "react-use-lanyard";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
export const SuspenseFallback = () => (
	<div className="rounded-md bg-fd-muted w-96 h-40 flex justify-center items-center border">loading...</div>
);
export function DiscordStatus() {
	const {
		isLoading,
		isValidating,
		data: { data: status } = {},
	} = useLanyard({
		userId: "1091735539025203220",
		// userId: "1053443057451794585",
		apiUrl: `${process.env.NODE_ENV === "production" ? "www.mashoorah.me" : "localhost:3001"}/lanyard`,
	});
	if (isLoading || isValidating || !status) return <SuspenseFallback />;
	const customStatus = status.activities.find((activity) => activity.type === 4);
	const gameActivity = status.activities.find((activity) => activity.type === 0);
	const listeningActivity = status.activities.find((activity) => activity.type === 2);
	const statusClassMap: Record<LanyardData["discord_status"], string> = {
		online: "text-green",
		idle: "text-yellow",
		dnd: "text-red",
		offline: "text-subtext2",
	};
	return (
		<Card
			className="min-w-72 max-w-96 h-auto"
			title={`${status.discord_user.global_name} (${status.discord_user.username})`}
			icon={
				<Tooltip>
					<TooltipTrigger className="relative block">
						<Image
							src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.png`}
							width={32}
							height={32}
							className="rounded-full border"
							alt="Discord avatar"
						/>
						<span
							className={`absolute bottom-1 right-1 transform translate-x-1/2 translate-y-1/2 ${statusClassMap[status.discord_status]}`}
						>
							●
						</span>
					</TooltipTrigger>
					<TooltipContent>{status.discord_status}</TooltipContent>
				</Tooltip>
			}
		>
			<div className="flex flex-col gap-2">
				{customStatus ? (
					<div className="flex flex-row gap-2 items-center">
						<MessageCircle className="size-4 text-blue" />
						<p className="truncate">
							{customStatus.emoji?.name ? `${customStatus.emoji.name} ` : ""}
							{customStatus.state}
						</p>
					</div>
				) : null}
				{listeningActivity ? (
					<div className="flex flex-row gap-2 items-center">
						<AudioLines className="size-4 text-red" />
						<p className="truncate">
							{listeningActivity.details}
							{listeningActivity.timestamps
								? ` - ${formatListeningTimestamps(listeningActivity.timestamps.start, listeningActivity.timestamps.end)}`
								: ""}
						</p>
					</div>
				) : null}
				<div className="flex flex-row gap-2 items-center">
					{gameActivity ? (
						<>
							<Code className="size-4 text-green" />
							<p className="truncate">
								{gameActivity.name}: {gameActivity.details}
							</p>
							{gameActivity.timestamps ? (
								<>
									<Clock className="size-4 text-yellow  " />
									<p>{formatElapsedTime(gameActivity.timestamps.start)}</p>
								</>
							) : null}
						</>
					) : null}
				</div>
			</div>
		</Card>
	);
}
function formatElapsedTime(startTimestamp: number) {
	const now = Date.now();
	const elapsedMs = now - startTimestamp;
	const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
	const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
	return `${hours}h ${minutes}m`;
}
function formatListeningTimestamps(startTimestamp: number, endTimestamp: number) {
	const now = Date.now();
	const elapsedMs = now - startTimestamp;
	const startMin = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
	const startSec = Math.floor((elapsedMs % (1000 * 60)) / 1000);
	const realEnd = endTimestamp - startTimestamp;
	const endMin = Math.floor(realEnd / (1000 * 60));
	const endSec = Math.floor((realEnd % (1000 * 60)) / 1000);
	return `${startMin}:${startSec.toString().padStart(2, "0")}/${endMin}:${endSec.toString().padStart(2, "0")}`;
}
