import Image from 'next/image';
import React from 'react';
import img from '../assets/profile.jpg'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import CommentDeleteModal from '../Shared/CommentDeleteModal';
import { useState } from 'react';

const Comment = ({ comment,setFetchData }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <>
            {
                comment.status && (
                    <div className="flex gap-1 mb-5 w-full">
                        <div className="w-[4%]">
                            <Image
                                src={img}
                                alt={img}
                                width={50}
                                height={50}
                                className="rounded-full border w-full"
                            ></Image>
                        </div>
                        <div className="w-[92%]">
                            <div className="flex items-center gap-2 w-[100%]">
                                <div className="bg-[#f5f9ff] py-2 pl-3 pr-5 rounded border">
                                    <h6 className="font-bold text-sm cursor-pointer">{comment?.name}</h6>
                                    <p className="text-sm">{comment?.content}</p>
                                </div>
                                <label
                                    onClick={() => setOpenDeleteModal(!openDeleteModal)}
                                    htmlFor="my-modal-5"
                                    className="cursor-pointer">
                                    <RiDeleteBin6Fill className="text-xl text-error" />
                                </label>
                                {
                                    openDeleteModal && (

                                        <CommentDeleteModal
                                            comment={comment}
                                            setFetchData={setFetchData}
                                            setOpenDeleteModal={setOpenDeleteModal} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Comment;