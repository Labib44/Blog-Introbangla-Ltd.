import Head from 'next/head';
import Image from 'next/image';
import React, { useContext } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import swal from 'sweetalert';
import CreateContext from '../CreateContex';

const PendingCommentItem = ({ blog }) => {

    const {
        refresh,
        setRefresh
    } = useContext(CreateContext);


    const comment = blog?.map((comment) => comment);

    const handleAccept = (id) => {

        fetch(` https://backend.lobdho.com/clickthepoint/api/v1/blog/comment/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: true,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    setRefresh(!refresh);
                    swal('Comment Accepted', {
                        icon: 'success',
                    });
                }
            }
            );
    };

    const handleDelete = (id) => {
        fetch(` https://backend.lobdho.com/clickthepoint/api/v1/blog/comment/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    setRefresh(!refresh);
                    swal('Comment Deleted', {
                        icon: 'success',
                    });
                }
            }
            );
    };


    return (
        <>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>

            {
                blog?.map((item, index) => (
                    <div key={index}>
                        {
                            item?.status === false && (
                                <div className='border  flex'>
                                    <div className='flex items-center w-[30%] border-r  pr-4'>
                                        <Image
                                            src={item?.blogId?.image}
                                            alt={item?.blogId?.title}
                                            width={300}
                                            height={200}
                                            className='rounded-xl object-cover w-36 p-5'
                                        ></Image>
                                        <div>
                                            <h1 className='font-semibold text-xs '>{item?.blogId?.title}</h1>
                                            <p className='text-xs mt-2'>{item?.blogId?.authorName}</p>
                                        </div>
                                    </div>

                                    <div className='flex justify-center items-center w-[20%] border-r'>
                                        <h1 className='text-sm '>{item?.blogId?.category}</h1>
                                    </div>
                                    <div className='flex justify-center items-center w-[40%] border-r'>
                                        <div className='text-center text-sm'>
                                            <p><span className='font-bold'>Name :</span> {item?.name}</p>
                                            <p><span className='font-bold'>Email :</span> {item?.email}</p>
                                            <h1 className='mt-2 '><span className='font-bold'>Comment :</span> {item?.content}</h1>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center w-[10%] border-r'>
                                        {/* <HiDotsHorizontal className='font-bold text-2xl  cursor-pointer'/> */}
                                        <div>
                                            <div>
                                                <button
                                                    onClick={() => handleAccept(item?._id)}
                                                    className='btn btn-xs btn-primary font-bold text-white'>Accept</button>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => handleDelete(item?._id)}
                                                    className='btn btn-xs btn-error mt-2 font-bold text-white'>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
                )
            }
        </>
    );
};

export default PendingCommentItem;