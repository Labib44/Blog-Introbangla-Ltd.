import React from 'react';
import btn from '../../../assets/app-icons@2x-1-pftptto39ghfe7k3qv9day657nzmauub5fj7ls7dm6.webp'
import image from '../../../assets/animation_500_l6b0h556.gif'
import Image from 'next/image';

const Subscribe = () => {
    return (
        <div className='bg-accent sm:pb-2 pb-10'>
            <div className='mid-container' id='subscribe'>
                <div className='grid md:grid-cols-2 gap-10 items-center py-5 md:py-0'>
                    <div>
                        <h2 className='text-2xl font-semibold'>Subscribe to Updates</h2>
                        <p className='text-sm mt-3 mb-5'>Travel, inspiration and tips for your next adventure. Discover the world with us!</p>
                        <div className='flex items-center '>
                            <input className=' p-3 w-full rounded-l border focus:outline-none' placeholder='Your email address' type="" name="" defaultValue="" />
                            <button className='btn btn-primary font-bold text-white rounded-l-none  rounded-r' type="">Subscribe</button>
                        </div>
                        {/* <div className='flex items-center gap-2 my-6 text-xs'>
                            <input type="checkbox" className="checkbox w-5 h-5 rounded" /><p className=''>By signing up, you agree to the our terms and our Privacy Policy agreement</p>
                        </div>
                        <p className='text-xs mt-4'>Download Blog App. Its 100% FREE.</p> */}
                    </div>
                    

                    <div className='md:block hidden'>
                    <Image 
                    src={image} 
                    alt={image}
                    width={300} 
                    height={300} 
                    className='w-full'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;