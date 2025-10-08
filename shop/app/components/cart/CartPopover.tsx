"use client";

import { useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { removeItem, increaseQuantity, resetCart, removeAllOfItem } from "../../redux/cardReducer";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "../../lib/utils/formatPrice";
import { useCurrency } from "../../context/CurrencyProvider";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getApolloClient } from "../../../apollo-client";
import { GET_PRODUCTS_BY_IDS } from "../../queries/productPage";

type RootState = {
	cart: {
		products: any[];
		count: number;
	};
};

type productId = {
	id: string;
	attributes: {
		uuid: string;
		name: string;
		desc: string;
		price: number;
		salePrice: number;
		onSale: boolean;
		images: {
			data: {
				attributes: {
					url: string;
				};
			}[];
		};
		quantity: number;
	};
};

type product = {
	id: string;
	uuid: string;
	name: string;
	desc: string;
	price: number;
	salePrice: number;
	onSale: boolean;
	image: string;
	quantity: number;
};

export default function CartPopover() {
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState(false);
	const productsIds = useSelector((state: RootState) => state.cart.products);
	const count = useSelector((state: RootState) => state.cart.count);
	const dispatch = useDispatch();
	const { exchangeRate } = useCurrency();
	const pathname = usePathname();
	const router = useRouter();
	const locale = useLocale();

	const [products, setProducts] = useState<product[]>([]);

	useEffect(() => {
		async function fetchFullProducts() {
			if (productsIds.length === 0) {
				setProducts([]);
				return;
			}

			try {
				const client = await getApolloClient();
				const { data } = await client.query({
					query: GET_PRODUCTS_BY_IDS,
					variables: {
						ids: productsIds.map((p) => p.id),
						locale: locale
					}
				});

				setProducts(
					data.products.data.map((p: productId) => {
						const cartItem = productsIds.find((item) => item.id === p.attributes.uuid);
						return {
							id: p.id,
							uuid: p.attributes.uuid,
							name: p.attributes.name,
							price: p.attributes.salePrice ? p.attributes.salePrice : p.attributes.price,
							onSale: p.attributes.salePrice ? true : false,
							image: p.attributes.images.data[0].attributes.url,
							desc: p.attributes.desc,
							quantity: cartItem?.quantity ?? 0
						};
					})
				);
			} catch (e) {
				setProducts([]);
			}
		}

		fetchFullProducts();
	}, [productsIds, locale]);

	const totalPrice = () => {
		let total = 0;
		products.forEach((item) => {
			total += item.quantity * parseFloat(formatPrice(item.price, exchangeRate));
		});
		return total.toFixed(2);
	};

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const prevTotalQuantity = useRef(products.reduce((sum, item) => sum + item.quantity, 0));

	useEffect(() => {
		const currentTotalQuantity = productsIds.reduce((sum, item) => sum + item.quantity, 0);

		if (currentTotalQuantity > prevTotalQuantity.current && !pathname.endsWith("/cart")) {
			setIsOpen(true);
		}

		prevTotalQuantity.current = currentTotalQuantity;
	}, [productsIds, pathname]);

	const handleClick = () => {
		if (isMobile) {
			router.push("/cart");
		}
	};

	return (
		<Popover.Root open={isOpen} defaultOpen={false} onOpenChange={(open) => setIsOpen(open)}>
			<Popover.Trigger asChild>
				<div onClick={handleClick} className="flex items-center justify-center">
					<button
						className="inline-flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full outline-none"
						aria-label="Update dimensions"
					>
						<i className="ri-shopping-cart-2-line relative text-3xl">
							{count > 0 && (
								<span className="z-3 absolute left-[10px]  top-0 flex h-[15px] w-[30px] items-center justify-center rounded-full bg-red-700 py-2 font-sans text-sm font-bold text-white">
									{count < 10 ? count : "9+"}
								</span>
							)}
						</i>
					</button>
				</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					onInteractOutside={(event) => {
						if ((event.target as HTMLElement).closest(".ignore-popover-close")) {
							event.preventDefault();
						}
					}}
					className="hidden w-[100vw] origin-top animate-showNav border-[3px] border-red-600 bg-[rgb(20,20,20)] lg:flex  lg:w-auto  "
				>
					<div className="z-50 uppercase text-white">
						<h1 className="mb-7 bg-[rgb(12,12,12)] p-3 text-center text-2xl font-bold lg:px-10">
							{t("cart.content")}
						</h1>
						<div className=" px-5">
							{products?.slice(0, 3).map((item) => (
								<div
									className="item mb-7 flex w-full items-center justify-between gap-5 bg-[rgb(12,12,12)] px-5"
									key={item.uuid}
								>
									<Image
										className="h-[100px] max-h-[100px] w-[80px] max-w-[80px] object-contain"
										src={process.env.NEXT_PUBLIC_STRAPI_PATH + item.image}
										width={80}
										height={100}
										alt={t("cart.productImage")}
									/>
									<div className="details">
										<h1 className="text-lg font-medium">{item.name}</h1>
										<div className="flex items-center justify-between gap-2">
											<p className="text-red-600">
												{item.quantity} x{" "}
												{t("product.price", { amount: formatPrice(item.price, exchangeRate) })}
											</p>
											{item.onSale && (
												<div className="ml-2 flex items-center justify-center bg-red-600 px-2 font-bold uppercase">
													{t("cart.sale")}
												</div>
											)}
										</div>
									</div>
									<div className="flex items-center justify-center gap-2">
										<button
											className="delete cursor-pointer text-2xl"
											onClick={() => dispatch(removeItem(item.uuid))}
										>
											<i className="ri-indeterminate-circle-line text-[rgb(100,100,100)]  transition hover:text-red-600"></i>
										</button>
										<button
											className="delete cursor-pointer text-2xl"
											onClick={() => dispatch(increaseQuantity(item.uuid))}
										>
											<i className="ri-add-circle-line text-[rgb(100,100,100)] transition hover:text-red-600"></i>
										</button>
										<button
											className="delete cursor-pointer text-2xl"
											onClick={() => dispatch(removeAllOfItem(item.uuid))}
										>
											<i className="ri-delete-bin-line text-[rgb(100,100,100)] transition hover:text-red-600"></i>
										</button>
									</div>
								</div>
							))}
							{products.length > 0 ? (
								<>
									<div className="total mb-5 flex justify-end gap-3   text-lg font-medium uppercase">
										{products.length > 3 && (
											<p className="mr-auto flex items-center justify-end gap-1 bg-[rgb(12,12,12)] p-2 px-4 py-2 text-sm font-bold text-white">
												<span>{products.length - 1}+</span>
												<span> More</span>
											</p>
										)}
										<div className="flex items-center justify-center gap-3 bg-[rgb(12,12,12)] px-4 py-2">
											<span>{t("cart.subtotal")}</span>
											<span className="text-red-600">
												{t("product.price", { amount: totalPrice() })}
											</span>
										</div>
									</div>
									<Link href="/cart">
										<button className="mx-auto mb-5 flex w-full cursor-pointer items-center justify-center gap-5 border-none bg-red-600 p-3 font-bold uppercase text-white transition hover:bg-red-500">
											{t("cart.checkout")}
										</button>
									</Link>
									<div className="my-3 flex items-center justify-end gap-3">
										<p
											className=" cursor-pointer bg-[rgb(12,12,12)] px-4 py-3 text-xs font-bold transition hover:bg-red-600"
											onClick={() => dispatch(resetCart())}
										>
											{t("cart.resetBtn")}
										</p>
									</div>
								</>
							) : (
								<p className="w-full pb-5 text-center font-bold">{t("cart.noProducts")}</p>
							)}
						</div>
					</div>
					<Popover.Close
						className="absolute right-[5px] top-[5px] z-50 inline-flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full text-red-600 outline-none hover:text-red-400 "
						aria-label="Close"
					>
						<i className="ri-close-circle-line"></i>
					</Popover.Close>
					<Popover.Arrow width={20} height={10} className="fill-red-600" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
