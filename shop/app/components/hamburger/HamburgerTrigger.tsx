"use client";

type HamburgerTriggerProps = {
	setMenuOn: (value: (prev: boolean) => boolean) => void;
};

export default function HamburgerTrigger({ setMenuOn }: HamburgerTriggerProps) {
	return (
		<div className="flex items-center justify-start">
			<button className="flex lg:hidden" onClick={() => setMenuOn((prev) => !prev)}>
				<i className="ri-menu-line text-2xl"></i>
			</button>
		</div>
	);
}
