import React from 'react';
import {Link} from "react-router-dom";

function DropDownSelect({dropdown, handleDropdown}) {

    return (
        <div>
            <div
                 className={`z-10 absolute right-10 mt-[50px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${dropdown ? '' : 'hidden'}`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                        <Link to="/posts"
                              onClick={handleDropdown}
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >My posts</Link>
                    </li>
                </ul>
                <div className="py-2">
                    <Link to="/profile"
                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                </div>
            </div>
        </div>
    );
}

export default DropDownSelect;