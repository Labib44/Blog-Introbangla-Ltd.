import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../src/Shared/firebaseInit';

const ForgetPassword = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [sendPasswordResetEmail, resetEmailSent, resetEmailError] = useSendPasswordResetEmail(auth);

    const onSubmit = data => {
        sendPasswordResetEmail(data.email)
            .then((res) => {
                toast.success('Password reset email sent!')
               
            })
            .catch((err) => {
                toast.error(err.message)
            })
    };

    useEffect(() => {
        if (resetEmailSent) {
            reset();
        }
    }, [resetEmailSent, reset]);



    return (
         <div className='flex justify-center mt-20 mb-32'>
            <div className='bg-[#FFFAF4] p-10 lg:w-[30%] rounded'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <p className='text-sm mb-5 ml-5'>Enter your email address below and we’ll send you a link to reset your password !</p>
                    <div className='flex flex-col items-start'>
                        <label htmlFor='email' className='ml-5 text-xs pb-1'>
                            Email
                        </label>
                        <input
                            className="py-3 px-5 text-gray-500 rounded-full w-full border-[1px]"
                            type='email' id='email' placeholder='Please enter your email'
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="pl-5 label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="pl-5 label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <button
                            // onClick={() => handleGoogleLogin()}
                            type='submit'
                            className='font-bold w-[50%] text-white py-3 rounded-full bg-[#691F74]'> Send Email
                        </button>
                    </div>

                    <h2 
                    onClick={()=> router.push("/auth/login")}
                    className='text-center mt-5 cursor-pointer'>Back to Login</h2>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword