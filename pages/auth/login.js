import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import FetchUrls from "../../src/hooks/fetchUrls";
import CreateContext from "../../src/Components/CreateContex";
import auth from "../../src/Shared/firebaseInit";


const Login = () => {
  const { setUpdate } = useContext(CreateContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();
  const router = useRouter();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);


  const onSubmitForm = data => {
    signInWithEmailAndPassword(data.email, data.password)

  }

  useEffect(() => {
    if (gUser) {
      axios
        .post(FetchUrls('auth/user/signup'), {
          name: gUser?.user?.displayName,
          email: gUser?.user?.email,
          password: gUser?.user?.uid,
          uid: gUser?.user?.uid,
        })
        .then((res) => {
          if (res.status === 201) {
            router.push('/')
            toast.success('User register Successfully!')
            localStorage.setItem("user", JSON.stringify(res.data));
            setUpdate(Math.random());
            // localStorage.setItem("token", JSON.stringify(user?.user?.accessToken));
          } else {
            router.push('/')
            setUpdate(Math.random());
            localStorage.setItem("user", JSON.stringify(res.data));
            toast.success('Google Login Successfully!')
          }
        })
        .catch((err) => {
   
          // toast.error(err.response.data.message)
        })
    }
    else {
      axios
        .post(FetchUrls('auth/user/signup'), {
          name: user?.user?.displayName,
          email: user?.user?.email,
          password: user?.user?.uid,
          uid: user?.user?.uid,
        })
        .then((res) => {
          router.push('/')
          setUpdate(Math.random());
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success('Login Successfully!')
        })
        .catch((err) => {
         
          // toast.error(err.response.data.message)
        })
    }

  }, [gUser, user])

  if (user) {
    localStorage.setItem("token", JSON.stringify(user?.user?.accessToken));
  }
  if (gUser) {
    localStorage.setItem("token", JSON.stringify(gUser?.user?.accessToken));
  }

  let errorMsg

  if (error) {
    if (error.code === 'auth/user-not-found') {
      errorMsg = 'User not found'
    }
    if (error.code === 'auth/wrong-password') {
      errorMsg = 'Wrong password'
    }
  }


  // const onSubmitForm = async (data) => {
  //   data = {
  //     email: data.email,
  //     userName: data.email,
  //     password: data.password,
  //   };
  //   // post method to login user then set token to local storage
  //   const response = await fetch(
  //     "http://localhost:8000/api/v1/auth/user/login",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   const responseData = await response.json();

  //   if (responseData.success) {
  //     // setUser(responseData?.result?.user);
  //     localStorage.setItem("token", responseData.token);
  //     localStorage.setItem("user", JSON.stringify(responseData?.result?.user));
  //     router.push("/");
  //   }
  // };
  return (
    <div className="mid-container">
      <div className="flex justify-center items-center mt-10 mb-36">
        <div className="card flex-shrink-0 shadow-2xl bg-base-100  sm:w-[600px] w-full">
          <div className="card-body w-full">
            <h1 className="font-bold text-3xl text-center mb-5">Login</h1>
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="w-full mx-auto"
            >
              <div className="flex  w-full mx-auto flex-col">
                <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
                  Email or Username
                </label>
                <input
                  className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
                  type="text"
                  name="email"
                  id=""
                  placeholder="Email or Username"
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
                {
                  error && <span className=" label-text-alt text-red-500">{errorMsg}</span>
                }
              </div>

              <h1
                onClick={() => router.push("/auth/forget-password")}
                className="mt-5 text-sm text-warning cursor-pointer">
                Forget Password?
              </h1>

              <div className="flex w-full mx-auto flex-col">
                <button
                  className="btn bg-warning hover:bg-warning my-[20px] border-0 text-white text-[17px]  font-bold "
                  type="submit"
                >
                  Login
                </button>
              </div>
              <p className=" w-full  mx-auto text-center mt-[13px]">
                Dont have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-[#007AFF] font-bold cursor-pointer"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
