import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

type TermsProps = {
	params: {
		locale: string;
	};
};

export const metadata: Metadata = {
	title: "Terms and Conditions | Ephonix"
};

export default async function TermsPage() {
	const t = useTranslations("information");

	return (
		<main className="mx-auto flex flex-1 flex-col justify-start gap-6 p-6">
			<div className="flex text-4xl font-bold text-red-600">
				<i className="ri-arrow-right-double-fill"></i>
				<h1>{t("terms")}</h1>
			</div>
			<ul>
				<li>
					<h2 className="p-3 font-bold">1. General Provisions</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">2. Definitions</h2>
					<ol className="pl-6">
						<li>Store: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
						<li>Customer: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
						<li>Goods: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
					</ol>
				</li>
				<li>
					<h2 className="p-3 font-bold">3. Rules of Using the Store</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">4. Placing Orders</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">5. Payments</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">6. Delivery</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">7. Complaints and Returns</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">8. Personal Data Protection</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
				<li>
					<h2 className="p-3 font-bold">9. Final Provisions</h2>
					<p className="pl-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu ante
						viverra, non vestibulum lorem luctus. Curabitur a urna in nulla aliquam ultrices ac ut
						ipsum.
					</p>
				</li>
			</ul>
			<hr></hr>
			<p>
				<strong>Last Update:</strong> 14.08.2024
			</p>
			<hr></hr>
		</main>
	);
}
