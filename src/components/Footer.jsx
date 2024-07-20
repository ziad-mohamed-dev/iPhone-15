import { footerLinks } from "@/constants";
import Link from "next/link";

function Footer() {
	return (
		<footer className="py-5 sm:px-10 px-5">
			<div className="screen-max-width">
				<div>
					<p className="font-semibold text-gray text-xs">
						More ways to shop:{" "}
						<span className="underline text-blue">
							Find an Apple Store
						</span>{" "}
						or{" "}
						<span className="underline text-blue">
							pther retailer
						</span>{" "}
						near you.
					</p>
					<p className="font-semibold text-gray text-xs">
						Or call 000800-040-1966
					</p>
				</div>
				<div className="bg-neutral-700 my-5 h-[1px] w-full"></div>
				<div className="flex md:flex-row flex-col md:items-center justify-between">
					<p className="font-semibold text-gray text-xs">
						Copyright @{new Date().getFullYear()} Apple Inc. All
						rights reserve.
					</p>
					<div>
						{footerLinks.map((link, i) => (
							<span key={i}>
								<span className="font-semibold text-xs underline text-blue cursor-pointer">
									{link}
								</span>
								{i !== footerLinks.length - 1 && (
									<span className="mx-2 text-gray"> | </span>
								)}
							</span>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
