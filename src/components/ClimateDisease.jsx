import React from 'react'
import { Link } from 'react-router-dom' // Use 'react-router-dom' instead of 'react-router'
import { motion } from 'framer-motion'
import climate from '../assets/disease/climatehealth.jpg'

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

const ClimateDisease = () => {
    return (
        <section className='py-10 '>
            {/* Title */}
            <motion.h1
                className='max-w-screen-xl md:px-20 mx-auto p-5 text-2xl font-bold'
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
            >
                Climate Change and Health
            </motion.h1>

            {/* Content Section */}
            <section className='max-w-screen-xl md:px-20 gap-10 mx-auto p-5 flex flex-col md:flex-row items-center justify-between'>
                {/* Text Section */}
                <motion.div
                    className='md:w-1/2 flex flex-col gap-6 justify-between order-2 md:order-1'
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                >
                    <p className='text-gray-600 text-justify leading-relaxed text-sm md:text-base'>
                        Climate change is exacerbating health risks in urban areas. Bangladesh, in particular, faces challenges such as increased air pollution, severe flooding, and outbreaks of waterborne diseases. 
                        These environmental changes contribute to respiratory issues and the spread of infectious diseases, necessitating integrated climate-health resilience strategies.
                    </p>

                    <Link to=''>
                        <button className='px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition'>
                            READ MORE
                        </button>
                    </Link>
                </motion.div>

                {/* Image Section */}
                <motion.div
                    className='order-1 md:order-2'
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                >
                    <img
                        className='rounded-lg shadow-lg w-full max-w-[400px] h-auto object-cover'
                        src={climate}
                        alt="Climate Change and Health"
                    />
                </motion.div>
            </section>
        </section>
    )
}

export default ClimateDisease
