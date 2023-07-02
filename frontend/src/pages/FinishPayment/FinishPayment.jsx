import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdsService from '../../services/adsService';

function FinishPayment() {
	const [searchParams, setSearchParams] = useSearchParams();

	let finishAds =
		searchParams.get('redirect_status') &&
		searchParams.get('redirect_status');

	let adsOrder = JSON.parse(localStorage.getItem('sm_ads'));

	useEffect(() => {
		if (finishAds === 'succeeded') {
			AdsService.addAds(adsOrder)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	}, []);

	return <div>FinishPayment</div>;
}

export default FinishPayment;
