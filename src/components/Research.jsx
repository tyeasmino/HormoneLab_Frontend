import React from 'react'
import { Link } from 'react-router'
import research from '../assets/disease/research.jpg'

const Research = () => {
  return (
    <section className='bg-gray-100 py-10'>
                    <h1 className='max-w-screen-xl md:px-20 p-5 mx-auto text-2xl font-bold'>Research</h1>
            <section className='max-w-screen-xl md:px-20 gap-10 mx-auto p-5 flex flex-col md:flex-row items-center justify-between'>
                <div className='md:w-1/2'>
                    <img className='h-[280px]' src={research} alt="" />
                </div>
                <div className='md:w-1/2 h-[280px] flex flex-col gap-10 justify-center'>

                    <p className='text-gray-400 text-justify'>We are currently working with NSU Genome Research Institute, North South University, Dhaka. Our current project is on MDR Klebsiella species, which causes headaches for healthcare professionals in Bangladesh.</p>
                
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

export default Research