import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

type UserAvatarProps = {
	username?: string | null;
	imageUrl?: string | null;
};

export default function UserAvatar({ username, imageUrl }: UserAvatarProps) {
	return (
		<DropdownMenu.Item
			asChild
			className="group relative flex select-none items-start rounded-[3px] bg-[rgb(12,12,12)]  p-5 text-[14px] leading-none outline-none "
		>
			<div className="flex w-full flex-col items-center justify-center gap-3 ">
				<Avatar.Root className="inline-flex size-[70px] select-none items-center justify-center overflow-hidden rounded-full border-2 border-red-600 align-middle">
					<Avatar.Image
						className="size-full rounded-[inherit] object-cover"
						src={imageUrl ?? ""}
						alt="avatar"
					/>
					<Avatar.Fallback
						className="leading-1 flex size-full items-center justify-center bg-zinc-800 text-[15px] font-medium text-white"
						delayMs={600}
					>
						{username?.substring(0, 2).toUpperCase() ?? "??"}
					</Avatar.Fallback>
				</Avatar.Root>
				<p className="text-[12px]">
					<span className="font-bold uppercase italic">{username}</span>
				</p>
			</div>
		</DropdownMenu.Item>
	);
}
