import React from 'react'
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const BlockQuate = () => {
  return (
    <section className='bg-blue-950 text-white p-20'>
        <div className='max-w-screen-lg mx-auto'>
            <div className='border w-fit p-3 rounded-full mx-auto'>
                <RiDoubleQuotesL className='md:text-2xl'/>
            </div>

            <div className='flex my-10 gap-5'>
            <RiDoubleQuotesL className='md:text-2xl'/> 
            <div className='w-fit mx-auto md:text-2xl text-center'>
                <p>Investing in health today is investing in a stronger tomorrow. Small changes lead to significant impacts on our lives.</p>
            </div>
            <RiDoubleQuotesR className='md:text-2xl' />

        </div>
        </div>


    </section>
  )
}

export default BlockQuate