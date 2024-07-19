import Loader from "@/components/Loader";

function loading() {
	return (
		<div className="bg-black w-[100vw] h-[100dvh] flex-center">
			<Loader width={100} height={100} />
		</div>
	);
}

export default loading;
