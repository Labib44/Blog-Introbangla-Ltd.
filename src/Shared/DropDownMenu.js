import React from 'react';
import { FiChevronDown } from "react-icons/fi";

const DropDownMenu = () => {

  const menus = [
    {
      name: "About",
      url: "#",
      subMenus: [
        {
          name: "Overview",

        },
        {
          name: "Team",

        },
        {
          name: "Our Clients",

        },
      ],
    },
    {
      name: "Services",
      url: "#",
      subMenus: [
        {
          name: "Custom Software Design & Development",

        },
        {
          name: "Dedicated Offshore Development Team",

        },
        {
          name: "QA & Test Automation",

        },
        {
          name: "Mobile & Web App Development",

        },
        {
          name: "Survey Management",

        },
        {
          name: "UI/UX Design",

        },
      ],
    },
  ];
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 items-center'>

        {
          menus.map((menu, idx) => {
            
            return (
              
              <div className="group relative cursor-pointer py-2">
                <div className="flex items-center bg-gray-200 lg:bg-white px-2">
                  <a className="menu-hover px-2 lg:my-2 lg:py-2 font-medium hover:underline underline-offset-8 decoration-2 decoration-[#1D6AAE] hover:text-[#1D6AAE] lg:mx-4" onClick="">{menu.name}</a>
                  <span>
                    <FiChevronDown></FiChevronDown>
                  </span>
                </div>
                <div className={`invisible absolute ${menu.name==="Services"? "w-96" :" w-44"} z-50 flex flex-col bg-gray-100 py-1 px-1 text-primary group-hover:visible`}>
              
                  {
                    menu?.subMenus.map((subMenu, idx) => {
                      return (
                        <div key={idx}
                          onClick="">
                          <a href="/" className="mt-2 block  py-2 text-black hover:text-white hover:bg-[#1D6AAE] p-2 md:mx-2">{subMenu.name}</a>
                        </div>
                      )
                    })
                  }
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default DropDownMenu;