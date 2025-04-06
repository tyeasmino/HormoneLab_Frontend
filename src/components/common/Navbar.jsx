import React, { useContext, useEffect, useState } from 'react';
import hlicLogo from '../../assets/hlicLogo.jpg';
import { Link, useLocation } from 'react-router';
import { MdOutlineLightMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { AuthContext } from '../../contexts/AuthContext';
import { LiaUserEditSolid } from 'react-icons/lia';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const [profileData, setProfileData] = useState({ image: '', balance: null });
    const location = useLocation();
    const token = localStorage.getItem('token');

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const isOnProtectedPage = location.pathname === '/dashboard' || location.pathname === '/profile'
        || location.pathname === '/reports' || location.pathname === '/deposites';

    return (
        <section className='max-w-screen-xl mx-auto'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-64 p-2 shadow ${darkMode ? 'bg-black text-white' : 'bg-white text-black'
                                }`}
                        >
                            <li><Link to='/'>Home</Link></li>
                            <li>
                                <a>Care at Hormone Lab</a>
                                <ul className="p-2">
                                    <li><a>Home Collection</a></li>
                                    <li><a>FNA & Paps Collection</a></li>
                                    <li><a>Appointment</a></li>
                                    <li><a>Doctor & Medical Stuff</a></li>
                                    <li><Link to='/services'>Lab Services</Link></li>
                                    <li><a>Report Panel</a></li>
                                </ul>
                            </li>
                            <li>
                                <a>Departments</a>
                                <ul className="p-2">
                                    <li><a>Biochemistry</a></li>
                                    <li><a>Microbiology</a></li>
                                    <li><a>Immunology</a></li>
                                    <li><a>Histopathology</a></li>
                                    <li><a>Endocrinology</a></li>
                                    <li><a>Hematology</a></li>
                                </ul>
                            </li>
                            <li><a>Research</a></li>
                            <li><a>Contact</a></li>
                        </ul>
                    </div>
                    <Link to='/' className="w-[160px] hidden md:block">
                        <img src={hlicLogo} />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/'>Home</Link></li>
                        <li>
                            <details>
                                <summary>Care at Hormone Lab</summary>
                                <ul
                                    className={`z-10 absolute top-10 p-2 w-[190px] shadow  ${darkMode ? "bg-black text-white" : "bg-white text-black"
                                        }`}
                                >
                                    <li><a>Home Collection</a></li>
                                    <li><a>FNA & Paps Collection</a></li>
                                    <li><a>Appointment</a></li>
                                    <li><a>Doctor & Medical Stuff</a></li>
                                    <li><Link to='/services'>Lab Services</Link></li>
                                    <li><a>Report Panel</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Departments</summary>
                                <ul
                                    className={`p-2 z-20 top-10 left-5 shadow ${darkMode ? "bg-black text-white" : "bg-white text-black"
                                        }`}
                                >
                                    <li><a>Biochemistry</a></li>
                                    <li><a>Microbiology</a></li>
                                    <li><a>Immunology</a></li>
                                    <li><a>Histopathology</a></li>
                                    <li><a>Endocrinology</a></li>
                                    <li><a>Hematology</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Research</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end flex gap-2">
                    <div className="flex items-center gap-2">
                        {/* dark mode */}
                        {/* <div className="dropdown dropdown-end">
                            <div className=" ">
                                <p onClick={() => setDarkMode(!darkMode)} className=' cursor-pointer text-[25px]'>
                                    {darkMode ? <MdOutlineLightMode /> : <MdLightMode />}
                                </p>
                            </div>
                        </div> */}

                        <div className="dropdown dropdown-end">
                            {user ? (
                                <>
                                    <div tabIndex={0} role="button" className="  avatar">
                                        <div className="w-10 rounded-full">
                                            {/* user profile img */}
                                            {profileData.image ? (
                                                <img src={profileData.image} />
                                            ) : (
                                                <LiaUserEditSolid className='cursor-pointer text-[35px] pt-2 pl-2' />
                                            )}
                                        </div>
                                    </div>

                                    <ul tabIndex={0} className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow ${darkMode ? 'bg-black text-white' : 'bg-white text-black'
                                        }`}
                                    >
                                        <li>
                                            <button disabled>{user.first_name} {user.last_name}</button>
                                        </li>
                                        {!isOnProtectedPage && (
                                            <>
                                                <li>
                                                    <Link to="/dashboard">Dashboard</Link>
                                                </li>
                                            </>
                                        )}


                                        {user?.username === 'hlic.it' &&
                                            <>
                                                <li className='md:hidden'>
                                                    <Link to="/locations">Locations</Link>
                                                </li>
                                                <li className='md:hidden'>
                                                    <Link to="/labservices">Lab Services</Link>
                                                </li>

                                            </>
                                        }

                                        {user?.username !== 'hlic.it' &&
                                            <li className='md:hidden'>
                                                <Link to="/profile">Profile</Link>
                                            </li>
                                        }

                                        {user?.username !== 'hlic.histo' &&
                                            <li className='md:hidden'>
                                                <Link to="/profile">Profile</Link>
                                            </li>
                                        }

                                        {user && user.me && (
                                            <li className='md:hidden'>
                                                <Link to="/hospitals">Hospitals</Link>
                                            </li>
                                        )}

                                        <li className='md:hidden'>
                                            <Link to="/reports">Reports</Link>
                                        </li>
                                        <hr className='md:hidden' />
                                        <li>
                                            <button onClick={logout}>Logout</button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <div className="flex gap-2">
                                        <Link to='/login' className="px-6 py-1 rounded bg-green-400">Login</Link>
                                        <Link to='/register' className="px-6 py-1 rounded bg-blue-400">Register</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navbar;