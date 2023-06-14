import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
import axios from 'axios'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth'
import FetchUrls from "../../src/hooks/fetchUrls";
import CreateContext from "../../src/Components/CreateContex";
import { updateProfile } from "firebase/auth";
import auth from "../../src/Shared/firebaseInit";

const Register = () => {
  const [loadings, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { setUpdate } = useContext(CreateContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
    control,
  } = useForm();
  const router = useRouter();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);


  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updatePhoneNumber, updating, updateError] = useUpdateProfile(auth);

  const onSubmitForm = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    const { name, email, password } = data

    axios
      .post(FetchUrls('auth/user/signup'), {
        name,
        email,
        password,
        uid: user?.user?.uid
      })
      .then((res) => {
        if (res.status === 201) {
          router.push('/')
          toast.success('User register Successfully!')
          setUpdate(Math.random());
          localStorage.setItem("user", JSON.stringify(res.data.user));
          // localStorage.setItem("token", JSON.stringify(user?.user?.accessToken));
        } else {
        
          toast.error('User Already Exist!')
        }
      })
      .catch((err) => {
        // toast.error(err.response.data.message)
      })

  };

  if (user) {
    localStorage.setItem("token", JSON.stringify(user?.user?.accessToken));
  }

  return (
    <div className="mid-container">
      <div className="flex justify-center items-center mt-5 mb-32">
        <div className="card flex-shrink-0 shadow-2xl bg-base-100  sm:w-[600px] w-full">
          <div className="card-body w-full">
            <h1 className="font-bold text-3xl text-center mb-5">Sign Up</h1>
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="w-full mx-auto"
            >
              {/* <div className="flex  w-full mx-auto flex-col">
                                <label className='text-[#747474] text-sm font-medium ml-1 mb-2'>Username</label>
                                <input className='py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0' type="text" name="userName" id="userName" placeholder='Username'
                                    {...register("userName", {
                                        required: 'userName is required',
                                    })}
                                    onKeyUp={(e) => {
                                        trigger('userName')
                                    }}
                                />
                                <small className='text-[#FF4B2B] text-xs ml-2 font-medium my-2'>{errors?.userName?.message}</small>
                            </div> */}

              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Your Name
                </label>
                <input
                  className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  {...register("name", {
                    required: "name is required",
                  })}
                  onKeyUp={(e) => {
                    trigger("name");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.name?.message}
                </small>
              </div>

              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Email
                </label>
                <input
                  className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  onKeyUp={(e) => {
                    trigger("email");
                  }}
                />
                <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
                  {errors?.email?.message}
                </small>
              </div>

              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Password
                </label>
                <input
                  className="py-3 rounded-md bg-[#F2F2F2] px-5 focus:outline-0"
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 character required",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
                <small className="text-[#FF4B2B] ml-2 text-xs font-medium my-2">
                  {errors?.password?.message}
                </small>
              </div>

              <div className='flex w-full mx-auto flex-col '>
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Confirm Password
                </label>
                <input
                  className="py-3 rounded-md bg-[#F2F2F2] px-5 focus:outline-0"
                  type='password'
                  id='confirm-password'
                  placeholder='Confirm Password'
                  {...register("confirmPassword")}
                />
              </div>

            

              <div className="flex w-full mx-auto flex-col mt-5">
                <button
                  className="btn bg-warning hover:bg-warning my-[20px] border-0 text-white text-[17px]  font-bold "
                  type="submit"
                  disabled={disabled}
                >
                  Sign Up
                </button>
              </div>
              <p className=" w-full  mx-auto text-center mt-[13px]">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#007AFF] font-bold cursor-pointer"
                >
                  Please Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
