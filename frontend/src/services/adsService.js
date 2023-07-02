import axios from 'axios';

class AdsService {
	static paymentInit = (body) => axios.post('/ads/paymentInit', body);

	static addAds = (body) => axios.post('/ads/add', body);
}

export default AdsService;
