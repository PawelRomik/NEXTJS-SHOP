import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function UserMenuCloseButton() {
	return (
		<DropdownMenu.Item
			asChild
			className="group absolute right-0 top-2 flex h-[25px] cursor-pointer select-none items-start rounded-[3px] p-[5px] px-[15px] text-[18px] leading-none text-red-600 outline-none transition hover:text-red-400"
			aria-label="Close"
		>
			<i className="ri-close-circle-line"></i>
		</DropdownMenu.Item>
	);
}
