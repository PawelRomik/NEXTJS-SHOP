type CategoryImagesProps = {
	attributes: {
		url: string;
	};
};

export default function CategoryImages({
	showcase
}: {
	showcase?: { data?: CategoryImagesProps[] };
}) {
	if (!showcase?.data?.length) return null;

	return (
		<div className="z-[3] flex items-center justify-around bg-contain">
			{showcase.data.slice(0, 3).map((item) => (
				<div
					key={item.attributes.url}
					style={{
						backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_PATH}${item.attributes.url})`
					}}
					className="mirror h-[100px] w-[100px] bg-contain bg-center bg-no-repeat md:h-[200px] md:w-[200px] lg:h-[400px] lg:w-[400px]"
				/>
			))}
		</div>
	);
}
