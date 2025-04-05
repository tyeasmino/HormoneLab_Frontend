import React from 'react';
import { MdCopyright } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router';
import { motion } from 'framer-motion'; // Import framer-motion

const Footer = () => {
    return (
        <div className='bg-gray-900 text-white'>
            <div className='max-w-screen-xl md:pt-10 mx-auto'>
                <footer className="footer text-base-content px-10 md:px-0 py-10 flex flex-col md:flex-row justify-between">
                    {/* Location Section */}
                    <motion.nav
                        className="w-full md:w-1/4 mb-6 md:mb-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h6 className="text-xl font-semibold">Location</h6>
                        <p className='text-gray-400'>
                            The Hormone Lab & Infertility Center <br />
                            21/F, Block-D, Bashbari Road, <br />
                            Mohammadpur Dhaka-1207 <br />
                            Cell : +8801993-339 090 <br />
                            Phone : +8802223321207
                        </p>
                    </motion.nav>

                    {/* Company Section */}
                    <motion.nav
                        className="w-full md:w-1/4 mb-6 md:mb-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h6 className="text-xl font-semibold">Company</h6>
                        <p className="text-gray-400">Sat-Thu <span className='text-white'>: 9.00 AM to 10.00 PM</span></p>
                        <p className="text-gray-400">Friday <span className='text-white'>: 9.00 AM to 07.00 PM</span></p>
                    </motion.nav>

                    {/* Emergency Cases Section */}
                    <motion.nav
                        className="w-full md:w-1/4 mb-6 md:mb-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h6 className="text-xl font-semibold">Emergency Cases</h6>
                        <p className="text-gray-400 text-xl">+8802223321207</p>
                    </motion.nav>

                    {/* Social Media Section */}
                    <motion.nav
                        className="w-full md:w-1/4 mb-6 md:mb-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <h6 className="text-xl font-semibold">Social Media</h6>
                        <div className='flex gap-4'>
                            <Link target='_blank' to='https://www.facebook.com/people/The-Hormone-Lab-Infertility-Centre/100063559990894/?rdid=d9U9cbzM2g7XTbb3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DwZ4Xqhez%2F'>
                                <motion.div
                                    className='bg-blue-50 p-2 rounded-full transition transform hover:scale-105'
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaFacebookF className='text-blue-600' />
                                </motion.div>
                            </Link>
                            <Link target='_blank' to='https://www.linkedin.com/in/the-hormonelab-infertility-center-55095628b/'>
                                <motion.div
                                    className='bg-blue-50 p-2 rounded-full transition transform hover:scale-105'
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaLinkedinIn className='text-blue-600' />
                                </motion.div>
                            </Link>
                        </div>
                    </motion.nav>
                </footer>
            </div>

            <div className='w-full h-[1px] bg-gray-600'></div>

            {/* Copyright Section */}
            <div className=''>
                <motion.footer
                    className="py-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <div className='text-gray-400 flex justify-center items-center gap-2'>
                        <MdCopyright /> Copyright 2022. All Rights Reserved.
                    </div>
                </motion.footer>
            </div>

        </div>
    );
};

export default Footer;
