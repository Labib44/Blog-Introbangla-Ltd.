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
          url: "https://www.introbangla.com/overview"

        },
        {
          name: "Team",
          url: "https://www.introbangla.com/team"

        },
        {
          name: "Our Clients",
          url: "https://www.introbangla.com/our-clients"

        },
      ],
    },
    {
      name: "Services",
      url: "#",
      subMenus: [
        {
          name: "Custom Software Design & Development",
          url: "https://www.introbangla.com/custom-software-development"

        },
        {
          name: "Dedicated Offshore Development Team",
          url: "https://www.introbangla.com/offshore-development"

        },
        {
          name: "QA & Test Automation",
          url: "https://www.introbangla.com/qa-and-testing"

        },
        {
          name: "Mobile & Web App Development",
          url: "https://www.introbangla.com/mobile-and-desktop-development"

        },
        {
          name: "Survey Management",
          url: "https://www.introbangla.com/survey-management"

        },
        {
          name: "UI/UX Design",
          url: "https://www.introbangla.com/ui-ux-design"

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
                  <a className="menu-hover px-2 lg:my-2 lg:py-2 font-medium hover:underline underline-offset-8 decoration-2 decoration-[#1D6AAE] hover:text-[#1D6AAE]">{menu.name}</a>
                  <span>
                    <FiChevronDown></FiChevronDown>
                  </span>
                </div>
                <div className={`invisible absolute ${menu.name==="Services"? "w-96" :" w-44"} z-50 flex flex-col bg-gray-100 py-1 px-1 text-primary group-hover:visible`}>
              
                  {
                    menu?.subMenus.map((subMenu, idx) => {
                      return (
                        <div key={idx}
                        >
                          <a href={subMenu.url} target='_blank' className="mt-2 block  py-2 text-black hover:text-white hover:bg-[#1D6AAE] p-2 md:mx-2">{subMenu.name}</a>
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