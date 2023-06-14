import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import LoadingComponents from '../../../src/Shared/LoadingComponents';

const index = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [update, setUpdate] = useState('');
    const [catInputValue, setCatInputValue] = useState();
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch(" https://backend.lobdho.com/clickthepoint/api/v1/category")
            .then(res => res.json())
            .then(data => {
                setCategoryData(data)
                setLoading(false)
            })
            .catch(err => (err))
    }, [update])

    const categoryValue = catInputValue
    const inputValue = catInputValue

    const handleAddCategory = (e) => {
        if (catInputValue) {
            fetch(" https://backend.lobdho.com/clickthepoint/api/v1/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { category: categoryValue }
                ),
            })
                .then((res) => res.json())
                .then((result) => {
                    setCatInputValue('')
                    setUpdate(Math.random());
                });
        }
    }

    const blogSubmit = async (data) => {

    }

    const handleDeleteCategory = (id) => {

        fetch(` https://backend.lobdho.com/clickthepoint/api/v1/category/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setUpdate(Math.random());
            });
    }



    return (
        <>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <DashboardLayout>

                {
                    loading ? <LoadingComponents /> : (
                        <div className=' flex justify-center mt-10'>

                            <div className='p-10 bg-white w-[50%]'>

                                <h1 className='font-semibold text-xl pb-2 border-b w-52 mb-5'>All Categories</h1>
                                {
                                    categoryData?.map(item => (
                                        <div key={item?._id} className='flex justify-between items-center border-b-2 border-gray-200 py-3'>
                                            <div className='flex items-center'>
                                                <div className='w-10 h-10 rounded-full bg-gray-200 mr-3'></div>
                                                <div>
                                                    <h1 className='font-semibold'>{item?.category}</h1>
                                                </div>
                                            </div>
                                            <div className='flex items-center'>
                                                {/* <button className='btn btn-sm btn-outline mr-2'>Edit</button> */}
                                                <button
                                                    onClick={() => handleDeleteCategory(item?._id)}
                                                    className='btn btn-sm btn-outline btn-error'>Delete</button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className=' mt-10'>
                                    <h1 className='font-semibold text-xl pb-3'>Add Category</h1>

                                    <div className="flex justify-end items-center">

                                        <input
                                            onChange={(e) => setCatInputValue(e.target.value)}
                                            type="text"
                                            id="categoryInput"
                                            name="author"
                                            defaultValue={catInputValue}
                                            className="w-full input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none rounded-none rounded-l"
                                            placeholder="Category Name"
                                        />
                                        <div
                                            onClick={handleAddCategory}
                                            className="bg-green-500  p-3 font-bold text-white rounded-r cursor-pointer select-none" type="">ADD</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </DashboardLayout>
        </>
    );
};

export default index;