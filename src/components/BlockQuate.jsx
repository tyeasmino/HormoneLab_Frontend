import React from 'react'
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const BlockQuate = () => {
  return (
    <section className='bg-blue-950 text-white p-4 md:p-20'>
      <div className='max-w-screen-lg mx-auto'>
        <div className='border w-fit p-3 rounded-full mx-auto'>
          <RiDoubleQuotesL className='md:text-2xl' />
        </div>

        <div className='my-3 md:my-10'>
          <div className='w-fit flex  mx-auto md:text-2xl text-center'>
            <span> <span className='text-2xl'>"</span> Investing in health today is investing in a stronger tomorrow. Small changes lead to significant impacts on our lives. <span className='text-2xl'>"</span></span>
          </div>
        </div>
      </div>


    </section>
  )
}

export default BlockQuate