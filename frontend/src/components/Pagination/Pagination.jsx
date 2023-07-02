import React, { useEffect } from 'react';

import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Pagination() {
	const { count } = useSelector((state) => state.postsStore);

	const [searchParams, setSearchParams] = useSearchParams();

	let page = searchParams.get('page')
		? parseInt(searchParams.get('page'))
		: 1;
	let limit = searchParams.get('limit')
		? parseInt(searchParams.get('limit'))
		: 9;

	useEffect(() => {
		handleSearchParams(page);
	}, [searchParams]);

	const handleSearchParams = (page) => {
		setSearchParams({ page, limit });
	};

	// handleNextPage
	const handleNextPage = () => {
		if (page < Math.ceil(count / limit)) {
			handleSearchParams(page + 1);
		}
	};

	const pageOfPagination = () => {
		let numOfPages = Math.ceil(count / limit);

		return Array(numOfPages)
			.fill(1)
			.map((el, index) => {
				return (
					<button
						className={`${page === el + index ? 'bg-primary' : null}`}
						key={index}
						name={el + index}
						onClick={handleCurrPage}>
						{el + index}
					</button>
				);
			});
	};

	const handleCurrPage = (e) => {
		handleSearchParams(e.target.name);
	};

	// handlePrevPage
	const handlePrevPage = () => {
		if (page > 1) {
			handleSearchParams(page - 1);
		}
	};

	return (
		<div className='w-full flex justify-center my-[25px] items-center gap-3'>
			<BsFillArrowLeftCircleFill
				className=' mr-[5px] w-[30px] h-[30px] cursor-pointer'
				onClick={handlePrevPage}
			/>
			{pageOfPagination()}
			<BsFillArrowRightCircleFill
				className=' mr-[5px] w-[30px] h-[30px] cursor-pointer'
				onClick={handleNextPage}
			/>
		</div>
	);
}

export default Pagination;
