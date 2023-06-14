import React, { useContext } from 'react';
import CreateContext from '../../../src/Components/CreateContex';
import AllBlogItem from '../../../src/Components/Dashboard/AllBlogItem';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import useAuthAdmin from '../../../src/hooks/useAuthAdmin';
import LoadingComponents from '../../../src/Shared/LoadingComponents';

const index = () => {
    const {
        blogs,
        loading
    } = useContext(CreateContext);

    return (
        <DashboardLayout>
            <>
                {
                    loading ? <LoadingComponents /> : (
                        <div className='px-5 sm:py-10 py-5'>
                            <h1 className='font-semibold text-2xl border-b-[1px] w-28 pb-1 mb-5'>All Blogs</h1>
                            <div className='grid md:grid-cols-3 gap-x-5 gap-y-7'>
                                {blogs?.map((article) => (
                                    <AllBlogItem
                                        key={article._id}
                                        blog={article}
                                    ></AllBlogItem>
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