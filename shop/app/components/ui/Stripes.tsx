type StripesProps = {
	direction: boolean;
};

export default async function Stripes({ direction }: StripesProps) {
	return direction ? (
		<div className=" absolute right-5 top-0 flex h-[50%] w-[40px] origin-top-left -rotate-45 items-center justify-center md:bottom-0 md:top-auto md:h-[120%] md:w-[80px] md:origin-center md:rotate-180  lg:bottom-auto lg:right-[5%] lg:top-auto lg:h-[200%] lg:w-[200px] lg:origin-center lg:rotate-[-20deg]">
			<div className="h-full w-full bg-white"></div>
			<div className="hidden h-full w-full lg:block"></div>
			<div className="hidden h-full w-full bg-red-500 lg:block"></div>
			<div className="h-full w-full"></div>
			<div className="h-full w-full bg-red-600"></div>
		</div>
	) : (
		<div className="absolute left-5 top-0 flex h-[50%] w-[40px] origin-top-right rotate-45 items-center justify-center md:h-[120%] md:w-[80px] md:rotate-0  lg:left-[5%] lg:top-auto lg:h-[200%] lg:w-[200px] lg:origin-center lg:rotate-[20deg]">
			<div className="h-full w-full bg-white"></div>
			<div className="hidden h-full w-full lg:block"></div>
			<div className="hidden h-full w-full bg-red-500 lg:block"></div>
			<div className="h-full w-full"></div>
			<div className="h-full w-full bg-red-600"></div>
		</div>
	);
}
