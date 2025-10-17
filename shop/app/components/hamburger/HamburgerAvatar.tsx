"use client";

import * as Avatar from "@radix-ui/react-avatar";

type HamburgerAvatarProps = {
	username?: string | null;
	image?: string;
};

export default function HamburgerAvatar({ username, image }: HamburgerAvatarProps) {
	return (
		<Avatar.Root className="inline-flex  w-full  select-none items-center justify-center overflow-hidden rounded-full    align-middle">
			<Avatar.Image
				className="size-[150px] rounded-full border-2 border-red-600 bg-[rgb(11,11,11)]   object-cover md:size-[250px]"
				src={image}
				alt="avatar"
			/>
			<Avatar.Fallback
				className="leading-1 relative flex size-[150px] items-center justify-center overflow-hidden rounded-full border-2 border-red-600 bg-[rgb(11,11,11)] text-[15px]  font-medium text-white md:size-[250px]"
				delayMs={600}
			>
				{username ? (
					username.substring(0, 2).toUpperCase()
				) : (
					<i className="ri-user-fill absolute h-full origin-bottom translate-y-[20%] rounded-full  text-9xl  md:translate-y-[30%] md:text-[12rem]"></i>
				)}
			</Avatar.Fallback>
		</Avatar.Root>
	);
}
