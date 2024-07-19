function Loader({ width, height }) {
	return (
		<div className="animate-bounce">
			<div
				style={{
					backgroundImage: 'url("/assets/images/apple.svg")',
					width: width,
					height: height,
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
					backgroundPosition: "center",
				}}
				className="animate-pulse"
			></div>
		</div>
	);
}

export default Loader;
