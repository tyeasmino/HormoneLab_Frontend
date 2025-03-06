import React from 'react'
import climate from '../assets/disease/climatehealth.jpg'
import { Link } from 'react-router'

const ClimateDisease = () => {
    return (
        <section className='py-10'>
            <h1 className='max-w-screen-xl md:px-20 mx-auto p-5 flex text-2xl font-bold'>Climate Change and Health</h1>
            <section className='max-w-screen-xl md:px-20 gap-10 mx-auto p-5 flex flex-col md:flex-row items-center justify-between'>
                <div className='md:w-1/2 h-[280px] order-2 md:order-1 flex flex-col gap-3 justify-between'>

                    <p className='text-gray-400 text-justify'>Climate change is exacerbating health risks in urban areas. Bangladesh, in particular, faces challenges such as increased air pollution, severe flooding, and outbreaks of waterborne diseases. These environmental changes contribute to respiratory issues and the spread of infectious diseases, necessitating integrated climate-health resilience strategies. 
                    </p>

                    <Link to=''>
                        <p className='w-fit px-5 py-1 md:px-6 md:py-2 rounded text-white bg-blue-500 '>
                            READ MORE
                        </p>
                    </Link>
                </div>
                <div className='md:w-1/2 order-1 md:order-2'>
                    <img className='h-[280px]' src={climate} alt="" />
                </div>
            </section>
        </section>
    )
}

export default ClimateDisease