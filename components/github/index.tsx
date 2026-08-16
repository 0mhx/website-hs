// yes i used chatgpt web for this i hate working with graphs
"use client";

import { eachDayOfInterval, format, isBefore, parseISO, startOfWeek, subMonths } from "date-fns";
import { use, useEffect, useMemo, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import type { getLatestDevelopmentActivity } from "./fetch";

const SURFACE_0 = "#313244";
const ACCENT = "#a6e3a1";

const CELL_SIZE = 16;
const CELL_GAP = 3;

const WEEKS_DESKTOP = 18;
const WEEKS_MOBILE = 16;
const MOBILE_QUERY = "(max-width: 767px)";

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mql = window.matchMedia(query);
		setMatches(mql.matches);

		const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, [query]);

	return matches;
}

function getContributionColor(count: number) {
	if (count <= 0) {
		return SURFACE_0;
	}

	if (count <= 2) {
		return "rgba(166, 227, 161, 0.40)";
	}

	if (count <= 9) {
		return "rgba(166, 227, 161, 0.60)";
	}

	if (count <= 19) {
		return "rgba(166, 227, 161, 0.80)";
	}

	return ACCENT;
}

export const GitContributionGraph = ({
	dataPromise,
}: {
	dataPromise: ReturnType<typeof getLatestDevelopmentActivity>;
}) => {
	const { contributions: rawData, today } = use(dataPromise) || {
		contributions: [],
	};

	const [activeDate, setActiveDate] = useState<string | null>(null);

	const { weeks, contributionMap } = useMemo(() => {
		if (!rawData?.length) {
			return {
				weeks: [],
				contributionMap: new Map<string, number>(),
			};
		}

		const sorted = [...rawData].sort((a, b) => parseISO(a[0]).getTime() - parseISO(b[0]).getTime());
		const latestDate = today ? parseISO(today) : parseISO(sorted[sorted.length - 1][0]);
		const cutoff = subMonths(latestDate, 4);
		const filtered = sorted.filter(([date]) => {
			const parsed = parseISO(date);
			return !isBefore(parsed, cutoff) && !isBefore(latestDate, parsed);
		});
		const firstDate = parseISO(filtered[0][0]);

		const calendarStart = startOfWeek(firstDate, {
			weekStartsOn: 0,
		});
		const allDays = eachDayOfInterval({
			start: calendarStart,
			end: latestDate,
		});

		const contributionMap = new Map<string, number>();

		for (const [date, count] of filtered) {
			contributionMap.set(date, count);
		}

		const weeks: Date[][] = [];

		for (let i = 0; i < allDays.length; i += 7) {
			weeks.push(allDays.slice(i, i + 7));
		}

		return {
			weeks,
			contributionMap,
		};
	}, [rawData, today]);

	const isMobile = useMediaQuery(MOBILE_QUERY);
	const visibleWeeks = weeks.slice(isMobile ? -WEEKS_MOBILE : -WEEKS_DESKTOP);

	if (!weeks.length) {
		return (
			<div className="block rounded-xl border bg-fd-card p-4 text-fd-card-foreground transition-colors @max-lg:col-span-full">
				<div className="flex h-[165px] items-center justify-center text-sm text-muted-foreground">
					no contribution data
				</div>
			</div>
		);
	}

	return (
		<TooltipProvider delayDuration={0}>
			<div
				className="
					w-full
					overflow-hidden
					rounded-xl
					border
					bg-fd-card
					px-4
					py-1
					text-fd-card-foreground
					shadow-lg
					shadow-black/10
					transition-colors
					@max-lg:col-span-full
				"
			>
				<div className="w-full overflow-none">
					<div className="relative flex h-[165px] w-full items-center justify-center">
						{/* Contribution grid */}
						<div
							style={{
								display: "grid",
								gridTemplateColumns: `repeat(${visibleWeeks.length}, ${CELL_SIZE}px)`,
								gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
								gridAutoFlow: "column",
								columnGap: CELL_GAP,
								rowGap: CELL_GAP,
							}}
						>
							{visibleWeeks.map((week, weekIndex) =>
								week.map((date, dayIndex) => {
									const dateString = format(date, "yyyy-MM-dd");

									const count = contributionMap.get(dateString) ?? 0;

									const isActive = activeDate === dateString;

									return (
										<Tooltip
											key={`${weekIndex}-${
												// biome-ignore lint/suspicious/noArrayIndexKey: doesnt matter
												dayIndex
											}`}
											open={isActive}
										>
											<TooltipTrigger asChild>
												<div
													onMouseEnter={() => setActiveDate(dateString)}
													onMouseLeave={() => setActiveDate(null)}
													className="
														cursor-pointer
														rounded-[3px]
														transition-transform
														duration-100
														hover:z-10
														hover:scale-[1.18]
													"
													style={{
														width: CELL_SIZE,
														height: CELL_SIZE,
														backgroundColor: getContributionColor(count),
													}}
												/>
											</TooltipTrigger>

											<TooltipContent
												side="top"
												sideOffset={6}
												className="
													rounded-md
													border
													border-border/60
													bg-popover
													px-2.5
													py-1.5
													text-xs
													font-medium
													text-popover-foreground
													shadow-lg
												"
											>
												{count} {count === 1 ? "contribution" : "contributions"} · {dateString}
											</TooltipContent>
										</Tooltip>
									);
								}),
							)}
						</div>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
};
