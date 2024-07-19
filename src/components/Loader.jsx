import { Html } from "@react-three/drei";
import Image from "next/image";

function Loader() {
	return (
		<Html position={[-0.15, 0.15, 0]}>
			<div className="w-[30px] animate-bounce">
				<Image
					src={"/assets/images/apple.svg"}
					width={30}
					height={30}
					alt="apple"
					className="animate-pulse w-auto h-auto"
				/>
			</div>
		</Html>
	);
}

export default Loader;
