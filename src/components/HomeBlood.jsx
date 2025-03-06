import React from 'react'
import { Link } from 'react-router'
import homecollection from '../assets/homecollection.jpg'


const HomeBlood = () => {
    return (
        <section className='max-w-screen-xl md:px-20 md:py-10 mx-auto p-5 flex flex-col md:flex-row items-center justify-between'>
            <div className='md:w-1/2'>
                <img className='shadow-xl rounded-lg' src={homecollection} alt="" />
            </div>
            <div className='md:w-1/2 flex flex-col gap-3'>
                <h1 className='text-2xl font-bold'>Home Blood Sample Collection Service</h1>
                <p className='text-justify text-gray-500'>We come to your home or workplace for your convenience. Currently, we are collecting blood samples from Mohammadpur.</p>

                <h1 className='text-2xl font-bold mt-8'>Benifits of Home Blood Sample Collection</h1>
                <div className='flex gap-16 items-center'>
                    <Link to=''>
                        <p className='w-fit px-5 py-1 md:px-6 md:py-2 rounded text-white bg-blue-500 '>
                            READ MORE
                        </p>
                    </Link>
                    <Link to=''>
                        <p className='w-fit px-5 py-1 md:px-6 md:py-2 rounded text-white bg-yellow-500 '>
                            Request Home Collection
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeBlood