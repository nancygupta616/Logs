import React, { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsArrowLeftRight, BsFillFileCodeFill } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { HiViewList, HiOutlineSpeakerphone  } from "react-icons/hi";
import { RiDashboardFill, RiSlashCommands2  } from "react-icons/ri";
import { MdSchedule, MdNotificationsActive  } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { SiAiohttp } from "react-icons/si";
import { MdMail } from "react-icons/md";
import { HiMiniQueueList, HiRocketLaunch  } from "react-icons/hi2";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Requests" , icon: <BsArrowLeftRight />},
    { title: "Commands", icon: <RiSlashCommands2 /> },
    { title: "Schedule", icon: <MdSchedule /> },
    { title: "Jobs", icon: <HiMiniQueueList />},
    { title: "Batches",  spacing: true, icon: <HiViewList /> },
    { title: "Cache" , icon: <HiRocketLaunch />},
    { title: "Dumps" , icon: <BsFillFileCodeFill />},
    { title: "Events", icon: <HiOutlineSpeakerphone /> },
    { title: "Gates", icon: <FaLock /> },
    { title: "HTTP Client" , icon: <SiAiohttp />},
    { title: "Logs" },
    { title: "Mail" , icon: <MdMail/>},
    { title: "Notifications", icon: <MdNotificationsActive/>}
  ];

  return (
    <div className="flex">
      <div
        className={`p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative h-screen bg-dark-purple dark:bg-black dark:text-white`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute right-1.5 top-9 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Tailwind
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ${
              open && "mr-2"
            }`}
          />

          <input
            type={"search"}
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                }`}
              >
                <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
