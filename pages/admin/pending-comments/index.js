import React, { useContext } from 'react';
import CreateContext from '../../../src/Components/CreateContex';
import BlogComment from '../../../src/Components/Dashboard/BlogComment';
import PendingCommentItem from '../../../src/Components/Dashboard/PendingCommentItem';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import useAuthAdmin from '../../../src/hooks/useAuthAdmin';
import LoadingComponents from '../../../src/Shared/LoadingComponents';

const index = () => {
    const {
        blogs,
        loading,
    } = useContext(CreateContext);

    // get blog data which comment is pending
    const pendingBlogs = blogs?.filter((blog) => blog?.comments?.length > 0);
    const comments = pendingBlogs?.map((blog) => blog.comments);

    // const pendingCommentBlog = pendingComments?.map((blog, index) => {
    //     return {
    //         ...blog,
    //     };
    // });


    return (
        <DashboardLayout>
            <>
                {
                    loading ? <LoadingComponents /> : (
                        <div className='px-5 sm:py-10 py-5'>
                            <h1 className='font-semibold text-2xl border-b-[1px] w-72 pb-1 mb-5'>See All pending reviews</h1>
                            <div className='border flex '>
                                <div className='w-[30%] flex justify-center border-r p-3'>
                                    <h1 className='font-semibold'>Blog</h1>
                                </div>
                                <div className='w-[20%] flex justify-center border-r p-3'>
                                    <h1 className='font-semibold'>Category</h1>
                                </div>
                                <div className='w-[40%] flex justify-center border-r p-3'>
                                    <h1 className='font-semibold'>Comment</h1>
                                </div>
                                <div className='w-[10%] flex justify-center border-r p-3'>
                                    <h1 className='font-semibold'>Action</h1>
                                </div>
                            </div>
                            <div className='grid  gap-x-5'>
                                {comments?.map((article) => (
                                    <PendingCommentItem
                                        key={article._id}
                                        blog={article}
                                    ></PendingCommentItem>
                                ))}
                            </div>
                        </div>
                    )
                }
            </>
        </DashboardLayout>
    );
};

export default useAuthAdmin(index);