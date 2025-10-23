import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

export default function UserTrigger() {
	return (
		<DropdownMenu.Trigger className="text-3xl outline-none">
			<Avatar.Root className="inline-flex size-[34px] select-none items-center justify-center overflow-hidden  align-middle">
				<i className="ri-user-line"></i>
			</Avatar.Root>
		</DropdownMenu.Trigger>
	);
}
