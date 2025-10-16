import { PL, US } from "country-flag-icons/react/3x2";

const FLAGS: Record<string, JSX.Element> = {
	pl: <PL title="Polski" className="w-[1.5rem]" />,
	en: <US title="English" className="w-[1.5rem]" />
};

export default function Flag({ country }: { country: string }) {
	return FLAGS[country] ?? FLAGS["en"];
}
