import React from 'react';
import { FiChevronDown } from "react-icons/fi";

const DropDownMenu = () => {
    return (
        <div>
            <div className="group relative cursor-pointer py-2">
                <div className="flex items-center bg-white px-2">
                    <a className="menu-hover my-2 py-2 font-medium hover:text-primary lg:mx-4" onClick="">About</a>
                    <span>
                        <FiChevronDown></FiChevronDown>
                    </span>
                </div>
                <div className="invisible absolute z-50 flex w-44 flex-col bg-gray-100 py-1 px-4 text-primary group-hover:visible"
                    onClick="">

                    <a href="/" className="mt-2 block  py-1 text-black hover:text-primary md:mx-2">Product One</a>
                    <a href="/" className="mt-2 block  py-1 text-black hover:text-primary md:mx-2">Product Two</a>
                    <a href="/" className="mt-2 block  py-1 text-black hover:text-primary md:mx-2">Product Three</a>


                </div>
            </div>
        </div>
    );
};

export default DropDownMenu;