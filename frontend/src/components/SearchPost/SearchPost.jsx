import React, { useState } from 'react';

function SearchPost() {
	const [searchTitleInput, setSearchTitleInput] = useState('');

	const handleInputSearch = (e) => {
		setSearchTitleInput(e.target.value);
	};

	const handleSearch = () => {
		console.log(searchTitleInput);
	};

	return (
		<div className='flex flex-col border border-primary p-[20px] rounded-lg'>
			<input
				type='text'
				placeholder='Search post...'
				className='border-2 px-[16px] py-[8px] rounded-lg mb-[10px]'
				value={searchTitleInput}
				onInput={(e) => handleInputSearch(e)}
			/>
			<button
				className='bg-primary text-white rounded-md py-[3px]'
				onClick={handleSearch}>
				Search
			</button>
		</div>
	);
}

export default SearchPost;
