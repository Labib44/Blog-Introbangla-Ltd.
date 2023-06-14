import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DeleteModal from '../../Shared/DeleteModal';

const AllBlogItem = ({blog}) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const router = useRouter();


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
        className='shadow rounded cursor-pointer bg-white'>
        <div className='h-48 overflow-hidden'>
            <Image
                src={blog?.image}
                alt={blog?.image}
                width={300}
                height={100}
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
            <h6 className='font-bold text-xl cursor-pointer hover:text-error duration-200 mt-4'>{blog?.title?.slice(0, 50)}</h6>

            {/* <div
                className='text-xs pb-3 pt-1'
                dangerouslySetInnerHTML={{ __html: blog?.description?.slice(0, 250) }}
            >
            </div> */}

            <div className='mt-3 flex '>
                <button
                    onClick={() => router.push(`/admin/edit-blog/${blog?._id}`)}
                    className='bg-warning mr-2 text-white px-3 py-1 rounded text-sm'>Edit Blog</button>

                <label
                    onClick={() => setOpenDeleteModal(!openDeleteModal)}
                    htmlFor="my-modal-4"
                    className='bg-error text-white px-3 py-1 rounded text-sm cursor-pointer'>
                    Delete
                </label>
                {
                    openDeleteModal && (

                        <DeleteModal
                            blog={blog}
                            setOpenDeleteModal={setOpenDeleteModal} />
                    )
                }
            </div>
        </div>
    </div>
    );
};

export default AllBlogItem;