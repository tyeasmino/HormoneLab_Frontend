import React from 'react'
import dengue from '../assets/disease/dengue.jpg'
import { Link } from 'react-router'

const Disease_Dengue_Fever = () => {
    return (
        <section className='bg-gray-100 py-10'>
            <h1 className='max-w-screen-xl md:px-20 mx-auto text-2xl p-5 font-bold'>Dengue Fever</h1>
            <section className='max-w-screen-xl md:px-20 gap-10 mx-auto p-5 flex flex-col md:flex-row items-center justify-between'>
                <div className='md:w-1/2'>
                    <img className='h-[280px]' src={dengue} alt="" />
                </div>
                <div className='md:w-1/2 h-[280px] flex flex-col gap-3 justify-between'>

                    <p className='text-gray-400 text-justify'>Dengue fever continues to be a significant concern in Bangladesh and neighboring countries. In 2025, India reported 1,847 cases, contributing to a global total of over 640,000 cases across 48 countries.
                        ECDC.EUROPA.EU Climate change, with rising temperatures and altered rainfall patterns, is expanding the habitats of Aedes mosquitoes, the primary vectors of dengue, potentially increasing transmission rates.
                        EN.WIKIPEDIA.ORG</p>

                    <Link to=''>
                        <p className='w-fit px-5 py-1 md:px-6 md:py-2 rounded text-white bg-blue-500 '>
                            READ MORE
                        </p>
                    </Link>
                </div>
            </section>
        </section>
    )
}

export default Disease_Dengue_Fever