import React from "react";

const HeadingTitle = ({ title }) => {
    return (
        <div className="h-[90px] text-primary font-bold border border-primary flex justify-center items-center rounded-lg ">
            <h2 className='uppercase text-[24px]'>{title}</h2>
        </div>
    );
};

export default HeadingTitle;