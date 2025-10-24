import Link from "next/link";

export default function CategoryButton({ label, href }: { label: string; href: string }) {
	return (
		<Link href={href} className="mb-5 flex w-full flex-col items-end">
			<button className=" w-[200px] rounded-lg bg-red-600 p-3 font-bold text-white hover:bg-red-500">
				{label}
			</button>
		</Link>
	);
}
