import React, { useContext } from 'react';
import CreateContext from '../Components/CreateContex';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';
import Head from 'next/head';

const DeleteModal = ({ blog, setOpenDeleteModal }) => {

    const { _id } = blog;
    const {
        setRefresh,
        refresh
    } = useContext(CreateContext);

    const handleDelete = () => {
        // delete method 
        setOpenDeleteModal(false)
        fetch(` https://backend.lobdho.com/clickthepoint/api/v1/blog/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setRefresh(!refresh)
                    swal("Blog Deleted Successfully!", {
                        icon: "success",
                    });
                }
            }
            )
    }

    return (
        <>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <div>
                {/* The button to open modal */}


                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="text-lg font-bold text-center">Are you sure you want to delete this Blog?</h3>
                        <div className='flex justify-center items-center gap-3 mt-5'>
                            <button onClick={() => handleDelete()} className='btn-error rounded-md btn-sm font-bold text-white'>Yes</button>
                            <label onClick={() => setOpenDeleteModal(false)} className='btn btn-success font-bold text-white rounded-md btn-sm'>No</label>
                        </div>
                    </label>
                </label>
            </div>
        </>
    );
};

export default DeleteModal;