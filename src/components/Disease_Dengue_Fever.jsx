import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import dengue from '../assets/disease/dengue.jpg'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
}

const Disease_Dengue_Fever = () => {
    return (
        <section className='bg-gray-100 dark:bg-slate-900 py-10'>
            {/* Shared padding wrapper for title + content */}
            <div className='max-w-screen-xl px-5 md:px-20 mx-auto'>
                {/* Title */}
                <motion.h1
                    className='text-2xl font-bold mb-6 text-black dark:text-white'
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                >
                    Dengue Fever
                </motion.h1>

                {/* Image and Text */}
                <section className='flex flex-col md:flex-row gap-10 items-center'>
                    {/* Image */}
                    <motion.div
                        className='md:w-1/2 w-full flex justify-center md:justify-start'
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                    >
                        <img
                            className='rounded-lg shadow-lg w-full max-w-[400px] h-auto object-cover'
                            src={dengue}
                            alt="Dengue fever"
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        className='md:w-1/2 flex flex-col gap-6 justify-between'
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                    >
                        <p className='text-gray-600 text-justify leading-relaxed text-sm md:text-base'>
                            Dengue fever continues to be a significant concern in Bangladesh and neighboring countries.
                            In 2025, India reported 1,847 cases, contributing to a global total of over 640,000 cases across 48 countries. 
                            Climate change, with rising temperatures and altered rainfall patterns, is expanding the habitats of Aedes mosquitoes— 
                            the primary vectors of dengue—potentially increasing transmission rates.
                        </p>

                        <Link to=''>
                            <button className='px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition'>
                                READ MORE
                            </button>
                        </Link>
                    </motion.div>
                </section>
            </div>
        </section>
    )
}

export default Disease_Dengue_Fever
