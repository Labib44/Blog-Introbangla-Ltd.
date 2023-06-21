import React, { useContext } from "react";
import CreateContext from "../Components/CreateContex";
import { toast } from "react-hot-toast";
import swal from "sweetalert";

const CommentDeleteModal = ({ comment, setFetchData, setOpenDeleteModal }) => {
    const { _id } = comment;
    const { setRefresh, refresh } = useContext(CreateContext);

    //   const handleDelete = () => {
    //     // delete method
    //     setOpenDeleteModal(false);
    //     fetch(`https://backend.lobdho.com/blog/api/v1/blog/${_id}`, {
    //       method: "DELETE",
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data) {
    //           toast.success("Blog deleted successfully");
    //           setRefresh(!refresh);
    //         }
    //       });
    //   };

    const handleDelete = () => {
        setOpenDeleteModal(false);
        fetch(`https://api.introbangla.com/api/v1/blog/comment/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    setFetchData(Math.random())
                    swal('Comment Deleted', {
                        icon: 'success',
                    });
                }
            }
            );
    };

    return (
        <div>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <label htmlFor="my-modal-5" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">
                        Are you sure you want to delete this Comment?
                    </h3>
                    <div className="flex justify-center items-center gap-3 mt-5">
                        <button
                            onClick={() => handleDelete()}
                            className="btn-error rounded-md btn-sm font-bold text-white"
                        >
                            Yes
                        </button>
                        <label
                            onClick={() => setOpenDeleteModal(false)}
                            className="btn btn-success font-bold text-white rounded-md btn-sm"
                        >
                            No
                        </label>
                    </div>
                </label>
            </label>
        </div>
    );
};

export default CommentDeleteModal;
