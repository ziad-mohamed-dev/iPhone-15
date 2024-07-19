import { navLists } from "@/constants";
import { appleImg, bagImg, searchImg } from "@/utils";
import Image from "next/image";

function Navbar() {
	const showNavItems = navLists.map((navItem, i) => {
		return (
			<div
				key={i}
				className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
			>
				{navItem}
			</div>
		);
	});
	return (
		<header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
			<nav className="flex w-full screen-max-width">
				<Image src={appleImg} alt="Apple" width={14} height={18} />
				<div className="flex flex-1 justify-center max-sm:hidden">
					{showNavItems}
				</div>
			</nav>
			<div className="flex items-baseline gap-7 max-sm:justify-end ">
				<Image src={searchImg} alt="searchImg" width={18} height={18} />
				<Image src={bagImg} alt="bagImg" width={18} height={18} />
			</div>
		</header>
	);
}

export default Navbar;
