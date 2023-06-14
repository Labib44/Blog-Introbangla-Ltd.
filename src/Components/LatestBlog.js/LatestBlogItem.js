import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import {format} from 'date-fns';

const LatestBlogItem = ({blog}) => {
    const router = useRouter();

    const handleDetailsPage = () => {
        router.push(`/blog-details/${blog?.path}`)
    }

    const {publishDate} = blog;

    // date format change to mm/dd/yyyy

    const date = new Date(publishDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const newDate = `${month}/${day}/${year}`;

    const monthName = format(new Date(publishDate), 'MMMM');
    const newDateName = ` ${monthName.slice(0, 3)} ${day}, ${year}`;


    return (
        <div
            onClick={handleDetailsPage}
            className='shadow rounded cursor-pointer bg-white'>
            <div className='h-48 overflow-hidden'>
                <Image
                    src={blog?.image}
                    alt={blog?.image}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                ></Image>
              
            </div>
            <div className='p-5'>
                <div className='text-xs flex justify-between mb-3'>
                    <p className='font-bold'>{blog?.authorName}</p>
                    <p>{newDateName}</p>
                </div>
                {
                    blog?.tags?.map((tag, index) => (
                        
                        <span 
                        key={index}
                        className=' text-xs bg-gray-200 px-2 py-1 rounded-full mr-2'>{tag}</span>
                    ))
                }
                <h6 className='font-semibold text-[18px] cursor-pointer hover:text-error duration-200 mt-4'>{blog?.title}</h6>
                <p className='text-xs mt-2 text-justify'>{blog?.shortDescription?.slice(0,200)}<span className='font-bold'>....</span></p>

                {/* <div
                    className='text-xs pb-3 pt-1'
                    dangerouslySetInnerHTML={{ __html: blog?.description?.slice(0, 250) }}
                >
                </div> */}
            </div>
        </div>
    );
};

export default LatestBlogItem;