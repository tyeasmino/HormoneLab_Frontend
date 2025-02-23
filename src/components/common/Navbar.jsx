import React from 'react'
import hlicLogo from '../../assets/hlicLogo.jpg'
import { Link } from 'react-router'



const Navbar = () => {
    return (
        <section className='max-w-screen-xl mx-auto'>
            <div className="navbar bg-base-100">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow">
                            <li><a>Home</a></li>
                            <li>
                                <a>Care at Hormone Lab</a>
                                <ul className="p-2">
                                    <li><a>Home Collection</a></li>
                                    <li><a>FNA & Paps Collection</a></li>
                                    <li><a>Appointment</a></li>
                                    <li><a>Doctor & Medical Stuff</a></li>
                                    <li><a>Lab Services</a></li>
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
                        <li><a>Home</a></li>
                        <li>
                            <details>
                                <summary>Care at Hormone Lab</summary>
                                <ul className="p-2 w-[200px]">
                                    <li><a>Home Collection</a></li>
                                    <li><a>FNA & Paps Collection</a></li>
                                    <li><a>Appointment</a></li>
                                    <li><a>Doctor & Medical Stuff</a></li>
                                    <li><a>Lab Services</a></li>
                                    <li><a>Report Panel</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Departments</summary>
                                <ul className="p-2">
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
                    <a className="btn bg-green-400 btn-sm ">Login</a>
                    <a className="btn bg-blue-400 btn-sm ">Register</a>
                </div>
            </div>
        </section>
    )
}

export default Navbar