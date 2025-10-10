import BundlesBanner from "./BundlesBanner";

export default async function BundlesSection() {
	return (
		<div
			style={{ backgroundImage: `url('/bg3.jpeg')` }}
			className="relative mt-3 h-[600px] w-full  bg-cover bg-center bg-no-repeat shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.6),inset_0_-20px_20px_-10px_rgba(0,0,0,0.6)]"
		>
			<div className="h-full w-full bg-[rgba(0,0,0,0.85)]">
				<BundlesBanner />
			</div>
		</div>
	);
}
