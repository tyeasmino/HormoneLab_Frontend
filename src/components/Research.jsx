import React from 'react'
import { Link } from 'react-router-dom' // Use 'react-router-dom' instead of 'react-router'
import { motion } from 'framer-motion'
import research from '../assets/disease/research.jpg'

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

const Research = () => {
    return (
        <section className='bg-gray-100 py-10'>
            {/* Title */}
            <motion.h1
                className='max-w-screen-xl md:px-20 text-black dark:text-white mx-auto p-5 text-2xl font-bold'
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
            >
                Research
            </motion.h1>

            {/* Content Section */}
            <section className='max-w-screen-xl md:px-20 gap-10 mx-auto p-5 flex flex-col md:flex-row items-center'>
                {/* Image Section */}
                <motion.div
                    className='md:w-1/2'
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                >
                    <img
                        className='rounded-lg shadow-lg w-full max-w-[400px] h-auto object-cover'
                        src={research}
                        alt="Research Project"
                    />
                </motion.div>

                {/* Text Section */}
                <motion.div
                    className='md:w-1/2 flex flex-col gap-6 justify-center order-2 md:order-1'
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                >
                    <p className='text-gray-600 text-justify leading-relaxed text-sm md:text-base'>
                        We are currently working with NSU Genome Research Institute, North South University, Dhaka. Our current project is on MDR Klebsiella species, which causes headaches for healthcare professionals in Bangladesh.
                    </p>

                    <Link to=''>
                        <button className='px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition'>
                            READ MORE
                        </button>
                    </Link>
                </motion.div>
            </section>
        </section>
    )
}

export default Research
