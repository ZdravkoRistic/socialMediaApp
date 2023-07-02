import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import React from 'react';

function PaymentElementComponent({ ck }) {
	const stripe = useStripe();
	const elements = useElements();

	const handlePay = () => {
		if (!stripe && !elements && !ck) return;

		stripe.confirmPayment({
			elements: elements,
			confirmParams: {
				return_url: 'http://localhost:3000/finishpayment',
			},
		});
	};

	return (
		<div>
			<PaymentElement />
			<button
				type='submit'
				className='bg-primary mt-[10px] px-[10px] py-[5px] text-white rounded-md'
				onClick={handlePay}>
				Pay
			</button>
		</div>
	);
}

export default PaymentElementComponent;
