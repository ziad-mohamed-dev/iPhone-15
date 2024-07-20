import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState();
	const [loading, setLoading] = useState(false);
	const handleError = (error) => {
		setLoading(false);
		setErrorMessage(error.message);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const { error: submitError } = await elements.submit();
		if (submitError) {
			handleError(submitError);
			return;
		}
		const res = await fetch("api/create-intent", {
			method: "POST",
			body: JSON.stringify({ amount: 999 }),
		});
		const clientSecret = await res.json();
		const result = await stripe.confirmPayment({
			clientSecret,
			elements,
			confirmParams: {
				return_url: "http://localhost:3000",
			},
		});
		if (result.error) {
			console.log(result.error.message);
		} else {
		}
	};
	return (
		<div className="bg-zinc screen-max-width h-[100dvh] flex-center">
			<form className="w-full px-8" onSubmit={handleSubmit}>
				<PaymentElement />
				<button className="btn block m-auto">Submit</button>
			</form>
		</div>
	);
}

export default CheckoutForm;
