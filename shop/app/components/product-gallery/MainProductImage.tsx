import React from "react";

export default function MainProductImage({ src }: { src: string }) {
	return (
		<div className="flex h-full max-h-[300px] w-full items-center justify-start p-5 lg:max-h-[500px]">
			<div
				style={{
					backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_PATH + src})`
				}}
				className="mirror after:z-3 h-full w-full bg-contain bg-center bg-no-repeat"
			/>
		</div>
	);
}
