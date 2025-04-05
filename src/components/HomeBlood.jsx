import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import homecollection from '../assets/homecollection.jpg'

const textVariant = {
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

const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
}

const HomeBlood = () => {
    return (
        <section className=' '>
            <div className='max-w-screen-xl mx-auto px-4 md:px-20 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10'>

                {/* Text Section */}
                <motion.div
                    className='md:w-1/2 flex flex-col gap-6'
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={textVariant}
                >
                    <div>
                        <h1 className='text-2xl md:text-2xl font-bold   mb-2'>
                            Home Blood Sample Collection Service
                        </h1>
                        <p className='text-gray-600 text-sm md:text-base text-justify leading-relaxed'>
                            We come to your home or workplace for your convenience. Currently, we are collecting blood samples from Mohammadpur.
                        </p>
                    </div>

                    <div>
                        <h2 className='text-2xl md:text-2xl font-bold   mb-2'>
                            Benefits of Home Blood Sample Collection
                        </h2>
                        <ul className='list-disc pl-5 text-gray-600 text-sm md:text-base'>
                            <li>Convenient and time-saving</li>
                            <li>Ideal for elderly or immobile patients</li>
                            <li>Safe and hygienic procedures</li>
                        </ul>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                        <Link to=''>
                            <button className='px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition'>
                                Read More
                            </button>
                        </Link>
                        <Link to=''>
                            <button className='px-6 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600 transition'>
                                Request Home Collection
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                    className=''
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={imageVariant}
                >
                    <img
                        className='rounded-xl shadow-lg w-[300px] h-auto object-cover'
                        src={homecollection}
                        alt='Home blood sample collection'
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default HomeBlood
