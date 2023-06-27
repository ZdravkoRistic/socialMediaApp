import React from "react";
import { Link } from "react-router-dom";

const LinkInfo = ({ title, link, linkTitle }) => {
    return (
        <div className="h-[90px] mt-[30px]  font-bold border border-primary flex flex-col justify-center items-center rounded-lg ">
            <p>{title}</p>
            <Link to={link} className="text-primary">
                {linkTitle}
            </Link>
        </div>
    );
};

export default LinkInfo;