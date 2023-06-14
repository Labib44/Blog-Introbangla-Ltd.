import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const PopularBlogRight = ({ blog }) => {
    const router = useRouter()

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
            className='flex items-center gap-2 border-b-[1px] py-3 cursor-pointer'
        >
            <div className='w-[35%]'>
                <Image
                    src={blog?.image}
                    alt={blog?.image}
                    width={600}
                    height={600}
                    className='w-full h-20 object-cover'
                >

                </Image>
                
            </div>
            <div className='w-[65%] p-2'>
                <h2 className='text-sm font-semibold hover:text-[#da334a]'>{blog?.title?.slice(0, 50)}</h2>
                <p className='text-xs mt-2 font-light'>{newDateName}</p>
            </div>
        </div>
    );
};

export default PopularBlogRight;