import {
	Html,
	OrbitControls,
	PerspectiveCamera,
	View,
} from "@react-three/drei";
import IPhone from "./IPhone";
import Lights from "./Lights";
import { Suspense } from "react";
import Loader from "./Loader";

function ModelView({ index, controlRef, item, size }) {
	return (
		<View index={index} style={{ width: "100%", height: "100%" }}>
			<ambientLight intensity={0.3} />
			<OrbitControls
				enableZoom={false}
				enablePan={false}
				rotateSpeed={0.4}
				ref={controlRef}
			/>
			<PerspectiveCamera makeDefault position={[0, 0, 4]} />
			<Lights />
			<group position={[0, 0, 0]}>
				<Suspense
					fallback={
						<Html position={[-0.13, 0.15, 0]}>
							<Loader width={50} height={50} />
						</Html>
					}
				>
					<IPhone
						scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
						item={item}
						size={size}
					/>
				</Suspense>
			</group>
		</View>
	);
}

export default ModelView;
