"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import HamburgerTrigger from "./HamburgerTrigger";
import HamburgerMenu from "./HamburgerMenu";

export default function Hamburger() {
	const [menuOn, setMenuOn] = useState(false);
	const t = useTranslations("categories");
	const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

	const path = usePathname();

	useEffect(() => {
		setMenuOn(false);
	}, [path]);

	return (
		<>
			<HamburgerTrigger setMenuOn={setMenuOn} />
			{menuOn && (
				<HamburgerMenu
					openCategoryId={openCategoryId}
					setOpenCategoryId={setOpenCategoryId}
					onClose={() => setMenuOn(false)}
				/>
			)}
		</>
	);
}
