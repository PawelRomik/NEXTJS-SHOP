import { Grid, Skeleton } from "@radix-ui/themes";

export default function SkeletonProductDisplay() {
	return (
		<>
			<Grid
				width="auto"
				className="shadow-top grid-cols ro-1  gap-10 bg-[rgb(20,20,20)]  p-2 text-white md:grid-cols-2 lg:grid-cols-4 lg:p-6"
			>
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className={`skeleton h-[680px] max-w-[400px] overflow-hidden rounded-[40px] `}
					></div>
				))}
			</Grid>
		</>
	);
}
