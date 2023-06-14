import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const FeatureBlogItem = ({ blog }) => {
    const router = useRouter();

    const handleClick = (id) => {
        router.push(`/blog-details/${id}`);
    };

    return (
        <div
            onClick={() => handleClick(blog?.path)}
            className=" "
        >
            <div className="border-b-[1px] py-3 flex gap-3 p-0 ">
                <div className="h-28 sm:w-[30%] w-[40%] cursor-pointer">
                    <Image
                        src={blog?.image}
                        width={600}
                        height={600}
                        className=" h-28 w-full rounded shadow object-cover"
                        alt={blog?.image}
                    ></Image>
                </div>
                <div className="p-3 flex items-center cursor-pointer sm:w-[70%] w-[60%]">
                    <div>
                        <h2 className="font-bold my-2 hover:text-[#da334a] cursor-pointer">
                            {blog?.title?.slice(0, 70)}
                        </h2>
                        <p className="text-sm">By- {blog?.authorName} <span className='text-xs'>{blog?.date} </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureBlogItem;