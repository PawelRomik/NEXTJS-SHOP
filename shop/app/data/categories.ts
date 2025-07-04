export type SubCategory = {
	name: string;
	slug: keyof IntlMessages["categories"];
};

export type Category = {
	id: number;
	name: string;
	slug: keyof IntlMessages["categories"];
	subCategories?: SubCategory[];
};

export const userCategories: Category[] = [
	{ id: 0, name: "Settings", slug: "settings" },
	{ id: 1, name: "Order History", slug: "orders" }
];

export const categories: Category[] = [
	{
		id: 0,
		name: "Shop",
		slug: "shop",
		subCategories: [
			{ name: "New", slug: "new" },
			{ name: "Sale", slug: "sale" },
			{ name: "Bundles", slug: "bundles" }
		]
	},
	{
		id: 1,
		name: "Components",
		slug: "components",
		subCategories: [
			{ name: "Processor (CPU)", slug: "processor" },
			{ name: "Motherboard", slug: "motherboard" },
			{ name: "Memory (RAM)", slug: "memory" },
			{ name: "Storage (HDD/SSD)", slug: "storage" },
			{ name: "Graphics Card (GPU)", slug: "graphics" },
			{ name: "Power Supply Unit", slug: "power" },
			{ name: "Cooling System", slug: "cooling" },
			{ name: "Case", slug: "case" }
		]
	},
	{
		id: 2,
		name: "Accessories",
		slug: "accessories",
		subCategories: [
			{ name: "Keyboard", slug: "keyboard" },
			{ name: "Mouse", slug: "mouse" },
			{ name: "Mousepad", slug: "mousepad" },
			{ name: "Headphones", slug: "headphones" },
			{ name: "Microphone", slug: "microphone" },
			{ name: "Monitor", slug: "monitor" },
			{ name: "Webcam", slug: "webcam" },
			{ name: "Speakers", slug: "speakers" }
		]
	},
	{
		id: 3,
		name: "Support",
		slug: "support"
	}
];
