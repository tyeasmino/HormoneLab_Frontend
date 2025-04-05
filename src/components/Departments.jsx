import React from 'react'
import { motion } from 'framer-motion'

import biochemistry from '../assets/departments/biochemistry.png'
import microbiology from '../assets/departments/microbiology.png'
import immunology from '../assets/departments/immunology.jpg'
import hematology from '../assets/departments/hematology.jpg'
import endocrinology from '../assets/departments/endocrinology.jpg'
import histopathology from '../assets/departments/histopathology.jpg'

const departments = [
    {
        title: 'Department of Biochemistry',
        image: biochemistry,
        description: 'In the Department of Biochemistry, we provide a comprehensive range of biochemistry tests necessary for disease.'
    },
    {
        title: 'Department of Microbiology',
        image: microbiology,
        description: 'In the Department of Microbiology performs various microbiological procedures to cultivate, isolate and identify microorganisms'
    },
    {
        title: 'Department of Immunology',
        image: immunology,
        description: 'To diagnose autoimmune disease, our Department of Immunology is currently providing a wide range of diagnostic services.'
    },
    {
        title: 'Department of Hematology and Clinical Pathology',
        image: hematology,
        description: 'We are handling a wide range of clinical pathological samples in this department.'
    },
    {
        title: 'Department of Endocrinology',
        image: endocrinology,
        description: 'We help patients with reproductive health, fertility, and menopause issues by focusing on hormones.'
    },
    {
        title: 'Department of Histopathology',
        image: histopathology,
        description: 'Histopathologists visually examine the regularities of cell shapes and tissue distributions for cancer diagnosis.'
    },
]

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const Departments = () => {
    return (
        <section className='bg-gray-100'>
            <div className='max-w-screen-xl mx-auto px-4 md:px-20 py-10'>
                <h1 className='text-2xl text-black dark:text-white md:text-3xl font-semibold mb-8 text-center md:text-left'>
                    Departments
                </h1>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className='grid grid-cols-1 md:grid-cols-3 gap-8'
                >
                    {departments.map((dept, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300'
                        >
                            <img src={dept.image} alt={dept.title} className='w-full h-[200px] object-cover' />
                            <div className='p-6 flex flex-col gap-4'>
                                <h3 className='text-black dark:text-white font-semibold text-center text-[16px]'>{dept.title}</h3>
                                <p className='text-gray-500 text-[13px] text-justify leading-relaxed'>
                                    {dept.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Departments
