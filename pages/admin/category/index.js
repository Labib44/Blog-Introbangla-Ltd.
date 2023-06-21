import Head from "next/head";
import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { BsImage } from "react-icons/bs";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import LoadingComponents from "../../../src/Shared/LoadingComponents";
import Image from "next/image";

const index = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [update, setUpdate] = useState("");
  // const [catInputValue, setCatInputValue] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingAddCategory, setLoadingAddCategory] = useState(false);
  const [imageShow, setImageShow] = useState("");
  const [state, setState] = useState({
    categoryName: "",
    image: "",
  });

  useEffect(() => {
    setLoading(true);
    fetch("https://api.introbangla.com/api/v1/category")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
        setLoading(false);
      })
      .catch((err) => err);
  }, [update]);

  // const categoryValue = catInputValue;
  // const inputValue = catInputValue;

  // handle image
  const handleImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (state.categoryName && state.image) {
      setLoadingAddCategory(true);
      const image = state.image;
      const formData = new FormData();
      formData.append("image", image);
      fetch("https://api.introbangla.com/api/v1/upload/single-image-upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          fetch("https://api.introbangla.com/api/v1/category", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: state.categoryName,
              imageUrl: result?.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setState({
                categoryName: "",
                image: "",
              });
              setImageShow("");
              setUpdate(Math.random());
              setLoadingAddCategory(false);
            })
            .catch((err) => {
              toast.error("Something went wrong! please try again later!");
              setLoadingAddCategory(false);
            });
        })
        .catch((err) => {
          toast.error("Something went wrong! please try again later!");
          setLoadingAddCategory(false);
        });
    }
  };

  // const blogSubmit = async (data) => {};

  const handleDeleteCategory = (id) => {
    fetch(`https://api.introbangla.com/api/v1/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(Math.random());
      });
  };

  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <DashboardLayout>
        {loading ? (
          <LoadingComponents />
        ) : (
          <div className=" flex justify-center mt-10">
            <div className="p-10 bg-white w-[50%]">
              <h1 className="font-semibold text-xl pb-2 border-b w-52 mb-5">
                All Categories
              </h1>
              {categoryData?.map((item) => (
                <div
                  key={item?._id}
                  className="flex justify-between items-center border-b-2 border-gray-200 py-3"
                >
                  <div className="flex items-center">
                    {item.imageUrl ? (
                      <div className="w-10 h-10 rounded-full  mr-3">
                        <Image
                          src={item.imageUrl}
                          alt={"category image"}
                          width={100}
                          height={100}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                    )}

                    <div>
                      <h1 className="font-semibold">{item?.category}</h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {/* <button className='btn btn-sm btn-outline mr-2'>Edit</button> */}
                    <button
                      onClick={() => handleDeleteCategory(item?._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-10">
                <h1 className="font-semibold text-xl pb-3">Add Category</h1>

                <div>
                  <form onSubmit={handleAddCategory}>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={state.categoryName}
                        onChange={(e) =>
                          setState({
                            ...state,
                            categoryName: e.target.value,
                          })
                        }
                        id="category_name"
                        className="bg-gray-50 border border-primary text-gray-900 text-sm rounded-lg focus:ring-primary focus:outline-none focus:outline-primary focus:border-primary block w-full p-2.5"
                        placeholder="Add Category Name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category_image"
                        className="flex flex-col items-center justify-center w-full h-52 border-2 border-primary border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
                      >
                        <>
                          {imageShow ? (
                            <img className="h-full w-full" src={imageShow} />
                          ) : (
                            <>
                              <span>
                                <BsImage />
                              </span>
                              <span>Select Category Image</span>
                            </>
                          )}
                        </>
                      </label>
                      <input
                        id="category_image"
                        type="file"
                        onChange={handleImage}
                        name="category_image"
                        className="hidden"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        disabled={loadingAddCategory}
                        type="submit"
                        className="text-white bg-primary hover:bg-primary focus:ring-0 focus:ring-primary/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
                      >
                        {loadingAddCategory ? (
                          <>
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="inline w-4 h-4 mr-3 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Add Category"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
                {/* <div className="flex justify-end items-center">
                                    <input
                                        onChange={(e) =>
                                            setCatInputValue(e.target.value)
                                        }
                                        type="text"
                                        id="categoryInput"
                                        name="author"
                                        defaultValue={catInputValue}
                                        className="w-full input input-bordered focus:border-warning duration-300 ease-in-out focus:outline-none rounded-none rounded-l"
                                        placeholder="Category Name"
                                    />
                                    <div
                                        onClick={handleAddCategory}
                                        className="bg-green-500  p-3 font-bold text-white rounded-r cursor-pointer select-none"
                                        type=""
                                    >
                                        ADD
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default index;
