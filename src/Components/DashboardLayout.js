

import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';
import { BsDash } from 'react-icons/bs';

const DashboardLayout = ({ children }) => {

  return (
    <div className="drawer drawer-mobile bg-[#F9FAFB]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content lg:px-[5%] md:px-10 px-5">{children}</div>

      <div className="drawer-side  h-[100vh] bg-white">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto lg:w-72 w-56  bg-base-100 border-r  py-10 ">
          {/* <!-- Sidebar content here --> */}

          <li className='mb-2'><Link
            className='flex justify-between items-center' href={'/admin/all-blogs'}>
            <h6 className='font-bold text-[15px]'> All Blogs</h6>
            {/* <FontAwesomeIcon icon={faListCheck} /> */}
            <AiOutlineRight />
          </Link></li>

          <li className='mb-2'><Link
            className='flex justify-between items-center' href={'/admin/add/blog'}>
            <h6 className='font-bold text-[15px]'> Create a New Blog</h6>
            <AiOutlineRight />
          </Link></li>

          <ul
            className=" bg-base-100 "
            id="test-catagory-menus"
          >
            <li className='mb-2'><a href='#'
              className='flex justify-between items-center'>
              <h6 className='font-bold text-[15px]'>See All Comments </h6>
              <AiOutlineRight />
            </a>
              <ul className={`pl-5 bg-base-100 mt-2 `}>
                <li className='mb-2 text-sm'><Link
                  className='flex justify-between items-center' href={'/admin/blog-comments'}>
                  <div className='flex items-center'>
                    <BsDash />
                    <h6 className='font-bold'> Blog wise comments</h6>
                  </div>
                  <AiOutlineRight />
                </Link></li>
                <li className='mb-2 text-sm'><Link
                  className='flex justify-between items-center' href={'/admin/pending-comments'}>
                  <div className='flex items-center'>
                    <BsDash />
                    <h6 className='font-bold'> Pending comments</h6>
                  </div>
                  <AiOutlineRight />
                </Link></li>
              </ul>
            </li>
          </ul>

          <li className='mb-2'><Link
            className='flex justify-between items-center' href={'/admin/category'}>
            <h6 className='font-bold text-[15px]'> Blogs Category</h6>
            <AiOutlineRight />
          </Link>
          </li>

          <li className='mb-2'><Link
            className='flex justify-between items-center' href={'/admin/ad-banner'}>
            <h6 className='font-bold text-[15px]'> Update Ad Banner</h6>
            <AiOutlineRight />
          </Link>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
