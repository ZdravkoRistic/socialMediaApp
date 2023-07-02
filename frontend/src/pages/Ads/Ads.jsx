import { useFormik } from 'formik';
import React from 'react';
import { FileParser } from '../../utils/FileParser';

import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Ads() {
	const navigation = useNavigate();

	const formik = useFormik({
		initialValues: {
			title: '',
			body: '',
			image: '',
			startDate: '',
			endDate: '',
			price: null,
			duration: null,
		},
		// validacija
		onSubmit: (values) => {
			let startDateAds = moment(values.startDate);
			let endDateAds = moment(values.endDate);

			let differenceValue = endDateAds.diff(startDateAds, 'days');

			FileParser(values.image)
				.then((res) => {
					if (differenceValue > 0 && differenceValue < 3) {
						localStorage.setItem(
							'sm_ads',
							JSON.stringify({
								...values,
								image: res,
								duration: differenceValue,
								price: 400,
							})
						);
					} else if (differenceValue >= 3) {
						localStorage.setItem(
							'sm_ads',
							JSON.stringify({
								...values,
								image: res,
								duration: differenceValue,
								price: 1000,
							})
						);
					} else {
						return toast.warning('Bad information...');
					}

					navigation('/payment');
				})
				.catch((err) => console.log(err));
		},
	});

	return (
		<div>
			<form
				onSubmit={formik.handleSubmit}
				className='w-[50%] border mx-auto mt-[20px] flex flex-col p-[10px]'>
				<label>Insert Title</label>
				<input
					type='text'
					placeholder='insert title'
					name='title'
					onChange={formik.handleChange}
					values={formik.title}
					className='border px-[10px] py-[5px] rounded-md'
				/>

				<label>Insert Body</label>
				<input
					type='text'
					placeholder='insert body'
					name='body'
					onChange={formik.handleChange}
					values={formik.body}
					className='border px-[10px] py-[5px] rounded-md'
				/>

				<label>Insert Image</label>
				<input
					type='file'
					name='image'
					onChange={(e) =>
						formik.setFieldValue(e.target.name, e.target.files[0])
					}
				/>

				<label>Insert Start Date</label>
				<input
					type='date'
					name='startDate'
					onChange={formik.handleChange}
					values={formik.startDate}
					className='border px-[10px] py-[5px] rounded-md'
				/>

				<label>Insert End Date</label>
				<input
					type='date'
					name='endDate'
					onChange={formik.handleChange}
					values={formik.endDate}
					className='border px-[10px] py-[5px] rounded-md'
				/>

				<button
					type='submit'
					className='mt-[15px] px-[10px] py-[5px] bg-primary text-white rounded-md'>
					Create Ads
				</button>
			</form>
		</div>
	);
}

export default Ads;
