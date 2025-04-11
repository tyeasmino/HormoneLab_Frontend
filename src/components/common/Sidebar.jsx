import React, { useContext, useState } from 'react';
import { AiOutlineNodeCollapse, AiOutlineNodeExpand } from 'react-icons/ai';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineInventory } from 'react-icons/md';
import { LuTrendingUpDown } from 'react-icons/lu';
import { BsHospital } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';
import { TbMoodEdit } from "react-icons/tb";
import { IoShirtOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { AuthContext } from '../../contexts/AuthContext';
import { FaHospital, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';
import { GiDrippingTube } from 'react-icons/gi';



const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setCollapsed(!collapsed);
  const isOnProtectedPage = location.pathname === '/dashboard'
    || location.pathname === '/profile'
    || location.pathname === '/myhospitals'
    || location.pathname === '/reports'
    || location.pathname === '/labservices'
    || location.pathname === '/locations'
    || location.pathname === '/hospitals'
    || location.pathname === '/employees';

  return (
    <div className={`sidebar hidden md:block bg-purple h-full p-4 fixed left-0 top-20 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>

      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleSidebar}>
          {collapsed ? (
            <AiOutlineNodeExpand className="text-2xl" />
          ) : (
            <AiOutlineNodeCollapse className="text-2xl" />
          )}
        </button>
      </div>


      <ul className="space-y-1">
        <li className="relative group">
          <Link
            data-tour-element='dashboard'
            to="/dashboard"
            className={`flex items-center gap-2 ${location.pathname === "/dashboard" ? "p-1 shadow font-semibold" : ""}`}
          >
            <LuLayoutDashboard
              className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
            />
            {/* Show tooltip only when collapsed */}
            <span
              className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
            >
              Dashboard
            </span>
            {!collapsed && <span className="ml-2">Dashboard</span>}
          </Link>
        </li>

                                      
        {(user?.username !== 'hlic.it' && user?.username !== 'hlic.histo' && user?.username !== 'hlic.lab') &&
          <li className="relative group">
            <Link
              data-tour-element='profile'
              to="/profile"
              className={`flex items-center gap-2 ${location.pathname === "/profile" ? "p-1 shadow font-semibold" : ""}`}
            >
              <TbMoodEdit
                className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
              />
              {/* Show tooltip only when collapsed */}
              <span
                className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white   rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
              >
                Profile
              </span>
              {!collapsed && <span className="ml-2">Profile</span>}
            </Link>
          </li>
        }

        {user?.username === 'hlic.it' &&
          <>
            <li className="relative group">
              <Link
                data-tour-element='locations'
                to="/locations"
                className={`flex items-center gap-2 ${location.pathname === "/locations" ? "p-1 shadow font-semibold" : ""}`}
              >
                <FaMapMarkedAlt
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white   rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Locations
                </span>
                {!collapsed && <span className="ml-2">Locations</span>}
              </Link>
            </li>


            <li className="relative group">
              <Link
                data-tour-element='labservicse'
                to="/labservices"
                className={`flex items-center gap-2 ${location.pathname === "/labservices" ? "p-1 shadow font-semibold" : ""}`}
              >
                <GiDrippingTube
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white   rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Lab Services
                </span>
                {!collapsed && <span className="ml-2">Lab Services</span>}
              </Link>
            </li>


            <li className="relative group">
              <Link
                data-tour-element='employees'
                to="/employees"
                className={`flex items-center gap-2 ${location.pathname === "/employees" ? "p-1 shadow font-semibold" : ""}`}
              >
                <FaUsers
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white   rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Marketing Executives
                </span>
                {!collapsed && <span className="ml-2">Marketing Executives</span>}
              </Link>
            </li>


            <li className="relative group">
              <Link
                data-tour-element='hospitals'
                to="/hospitals"
                className={`flex items-center gap-2 ${location.pathname === "/hospitals" ? "p-1 shadow font-semibold" : ""}`}
              >
                <FaHospital
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white   rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Hospital Authorities
                </span>
                {!collapsed && <span className="ml-2">Hospital Authorities</span>}
              </Link>
            </li>

            <li className="relative group">
              <Link
                data-tour-element='upload_reports'
                to="/upload_reports"
                className={`flex items-center gap-2 ${location.pathname === "/upload_reports" ? "p-1 shadow font-semibold" : ""}`}
              >
                <FaHospital
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white   rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Upload Reports
                </span>
                {!collapsed && <span className="ml-2">Upload Reports</span>}
              </Link>
            </li>
          </>

        }

        {/* {user && user.fitMaker ? (
          <>
             <li className="relative group">
              <Link
              data-tour-element='dress'
                to="/dress"
                className={`flex items-center gap-2 ${location.pathname === "/dress" ? "bg-white  dark:bg-transparent p-4 shadow font-semibold" : ""}`}
              >
                <IoShirtOutline
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Dress
                </span>
                {!collapsed && <span className="ml-2">Dress</span>}
              </Link>
            </li> 
            <li className="relative group">
              <Link
              data-tour-element='inventory'
                to="/inventory"
                className={`flex items-center gap-2 ${location.pathname === "/inventory" ? "bg-white  dark:bg-transparent p-4 shadow font-semibold" : ""}`}
              >
                <MdOutlineInventory
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white  rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Inventory
                </span>
                {!collapsed && <span className="ml-2">Inventory</span>}
              </Link>
            </li>
            <li className="relative group">
              <Link
              data-tour-element='inventory-movement'
                to="/inventory-movement"
                className={`flex items-center gap-2 ${location.pathname === "/inventory-movement" ? "bg-white  dark:bg-transparent p-4 shadow font-semibold" : ""}`}
              >
                <LuTrendingUpDown
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
         
         
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Inventory Movement
                </span>
                {!collapsed && <span className="ml-2">Inventory Movement</span>}
              </Link>
            </li>
          </>
        ) : null} */}

        {user && user.me ? (
          <>
            <li className="relative group">
              <Link
                data-tour-element='hospitals'
                to="/myhospitals"
                className={`flex items-center gap-2 ${location.pathname === "/myhospitals" ? "p-1 shadow font-semibold" : ""}`}
              >
                <BsHospital
                  className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
                />
                {/* Show tooltip only when collapsed */}
                <span
                  className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white   rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Hospitals
                </span>
                {!collapsed && <span className="ml-2">Hospitals</span>}
              </Link>
            </li>

          </>
        ) : null}

        <li className="relative group">
          <Link
            data-tour-element='orders'
            to="/reports"
            className={`flex items-center gap-2 ${location.pathname === "/reports" ? "p-1 shadow font-semibold" : ""}`}
          >
            <LuClipboardList
              className={`transition-all ${collapsed ? 'text-lg' : 'text-xl'}`}
            />
            <span
              className={`absolute left-16 hidden group-hover:block text-sm bg-gray-800 text-white rounded px-2 py-1 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
            >
              Reports
            </span>
            {!collapsed && <span className="ml-2">Reports</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar
