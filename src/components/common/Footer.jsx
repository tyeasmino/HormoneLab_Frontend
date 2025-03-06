import React from 'react'
import { MdCopyright } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from 'react-router';
const Footer = () => {
    return (
        <div className='bg-gray-900'>
            <div className='max-w-screen-xl md:px-20 mx-auto'>
                <footer className="footer text-base-content p-10">
                    <nav>
                        <h6 className="text-xl text-white">Location</h6>
                        <p className='text-gray-500'>
                            The Hormone Lab & Infertility Center <br />
                            21/F, Block-D, Bashbari Road, <br />
                            Mohammadpur Dhaka-1207 <br />
                            Cell : +8801993-339 090 <br />
                            Phone : +8802223321207
                        </p>
                    </nav>
                    <nav>
                        <h6 className="text-xl text-white">Company</h6>
                        <p className="text-gray-500"> Sat-Thu <span className='text-white'>: 9.00 AM to 10.00 PM</span></p>
                        <p className="text-gray-500"> Friday <span className='text-gray-900'>a</span> <span className='text-white'>: 9.00 AM to 07.00 PM</span></p>
                    </nav>
                    <nav>
                        <h6 className="text-xl text-white">Emergency Cases</h6>
                        <p className="text-gray-500 text-2xl">02223321207</p>
                    </nav>
                    <nav>
                        <h6 className="text-xl text-white">Social Media</h6>
                        <div className='flex gap-1'>
                            <Link target='_blank' to='https://www.facebook.com/people/The-Hormone-Lab-Infertility-Centre/100063559990894/?rdid=d9U9cbzM2g7XTbb3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DwZ4Xqhez%2F'>
                                <div className='bg-blue-50 p-2'>
                                    <FaFacebookF />
                                </div>
                            </Link>
                            <Link target='_blank' to='https://www.linkedin.com/in/the-hormonelab-infertility-center-55095628b/'>
                                <div className='bg-blue-50 p-2'>
                                    <FaLinkedinIn />
                                </div>
                            </Link>
                        </div>
                    </nav>
                </footer>
                <footer className="footer text-base-content border-base-300 border-t px-10 py-4">
                    <div className='text-gray-500 flex items-center justify-center w-full'>
                        <MdCopyright /> Copyright 2022. All Rights Reserved.
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer