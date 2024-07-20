"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function Checkout() {
	const options = {
		mode: "payment",
		amount: 999,
		currency: "usd",
		appearance: {
			variables: {
				colorText: "#ffffff",
			},
			rules: {
				".Input": {
					color: "#000000",
				},
			},
		},
	};

	return (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm />
		</Elements>
	);
}

export default Checkout;
