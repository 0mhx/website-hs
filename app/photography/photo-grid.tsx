"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import exifr from "exifr/dist/lite.esm.mjs";
import Image from "next/image";
import { useState } from "react";

export type Photo = {
	url: string;
	title: string;
};

type ExifRow = {
	label: string;
	value: string;
};

function formatShutter(exposureTime: number): string {
	if (exposureTime >= 1) return `${exposureTime}s`;
	return `1/${Math.round(1 / exposureTime)}s`;
}

function buildRows(exif: Record<string, unknown>): ExifRow[] {
	const rows: ExifRow[] = [];
	const make = exif.Make as string | undefined;
	const model = exif.Model as string | undefined;
	if (make || model) {
		rows.push({ label: "camera", value: [make, model].filter(Boolean).join(" ") });
	}
	if (exif.LensModel) rows.push({ label: "lens", value: String(exif.LensModel) });
	if (typeof exif.FNumber === "number") rows.push({ label: "aperture", value: `f/${exif.FNumber}` });
	if (typeof exif.ExposureTime === "number") rows.push({ label: "shutter", value: formatShutter(exif.ExposureTime) });
	if (typeof exif.ISO === "number") rows.push({ label: "iso", value: String(exif.ISO) });
	if (typeof exif.FocalLength === "number") rows.push({ label: "focal length", value: `${exif.FocalLength}mm` });
	if (exif.DateTimeOriginal instanceof Date) {
		rows.push({ label: "taken", value: exif.DateTimeOriginal.toLocaleString() });
	}
	if (typeof exif.latitude === "number" && typeof exif.longitude === "number") {
		rows.push({
			label: "gps",
			value: `${exif.latitude.toFixed(5)}, ${exif.longitude.toFixed(5)}`,
		});
	}
	return rows;
}

function PhotoDialog({ photo, priority = false }: { photo: Photo; priority?: boolean }) {
	const [rows, setRows] = useState<ExifRow[] | null>(null);
	const [failed, setFailed] = useState(false);

	const loadExif = async () => {
		if (rows || failed) return;
		try {
			const exif = await exifr.parse(photo.url);
			setRows(exif ? buildRows(exif) : []);
		} catch {
			setFailed(true);
		}
	};

	return (
		<Dialog
			onOpenChange={(open) => {
				if (open) void loadExif();
			}}
		>
			<DialogTrigger className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-md ring-1 ring-border transition hover:ring-mauve">
				<Image
					src={photo.url}
					alt={photo.title}
					fill
					sizes="(max-width: 640px) 50vw, (max-width: 1088px) 33vw, 320px"
					priority={priority}
					className="object-cover transition duration-300 group-hover:scale-105"
				/>
			</DialogTrigger>
			<DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden p-0 max-sm:top-[calc(50%+2rem)] max-sm:max-h-[calc(100dvh-6rem)] sm:max-w-4xl">
				<DialogTitle className="sr-only">{photo.title}</DialogTitle>
				<div className="flex max-h-[inherit] flex-col md:grid md:grid-cols-[3fr_2fr]">
					<div className="relative h-[40dvh] w-full shrink-0 bg-black/40 md:h-[85dvh]">
						<Image
							src={photo.url}
							alt={photo.title}
							fill
							sizes="(max-width: 896px) calc(100vw - 2rem), 537px"
							className="object-contain"
						/>
					</div>
					<div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4">
						<h3 className="text-base font-bold text-mauve break-all">{photo.title}</h3>
						{rows === null && !failed && <p className="text-sm text-subtext0">loading metadata…</p>}
						{failed && <p className="text-sm text-subtext0">couldn't load metadata</p>}
						{rows !== null && rows.length === 0 && <p className="text-sm text-subtext0">no exif metadata</p>}
						{rows !== null && rows.length > 0 && (
							<dl className="flex flex-col divide-y divide-border text-sm">
								{rows.map((row) => (
									<div key={row.label} className="flex items-baseline justify-between gap-4 py-2">
										<dt className="shrink-0 text-subtext0">{row.label}</dt>
										<dd className="text-right break-all">{row.value}</dd>
									</div>
								))}
							</dl>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default function PhotoGrid({ files }: { files: Photo[] }) {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{files.map((file, index) => (
				<PhotoDialog key={file.url} photo={file} priority={index < 6} />
			))}
		</div>
	);
}
