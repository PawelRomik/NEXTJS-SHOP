export default function SkeletonProductDisplay() {
	return (
		<div
			aria-live="polite"
			aria-busy="true"
			className="h-[300px] flex-[0_0_100%] lg:h-[400px] lg:flex-[1_0_33%]"
		>
			<span className="inline-flex h-full w-full animate-pulse select-none rounded-md bg-black leading-none">
				‌
			</span>
			<br />
		</div>
	);
}
