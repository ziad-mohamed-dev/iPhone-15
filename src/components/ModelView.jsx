import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import IPhone from "./IPhone";
import Lights from "./Lights";
import { Suspense } from "react";
import Loader from "./Loader";

function ModelView({ index, controlRef, item, size }) {
	return (
		<View index={index} style={{width:"100%",height:"100%"}}>
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
				<Suspense fallback={<Loader />}>
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
