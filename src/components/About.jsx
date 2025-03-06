import React from 'react'
import about from '../assets/about.svg'
import { Link } from 'react-router'

const About = () => {
    return (
        <section className='max-w-screen-xl md:px-20 mx-auto p-5 flex flex-col md:flex-row items-center justify-between'>
            <div className='md:w-1/3'>
                <img className='min-w-[260px] md:w-full' src={about} alt="" />
            </div>
            <div className='md:w-2/3 flex flex-col gap-3'>
                <h1 className='text-2xl font-bold'>About Us</h1>
                <h3 className='md:text-xl font-bold'>Welcome to The Hormone Lab & Infertility Center</h3> 
                <p className='text-justify'>The Hormone Lab Infertility Centre is a renowned and reliable diagnostic center located in Mohammadpur Dhaka, Bangladesh. Established in 2012, the Centre has earned a reputation for providing highly advanced diagnostic services. We offer a comprehensive range of diagnostic services. We strive to provide quality services at The hormone Lab Infertility Center at competitive prices. Our team of highly trained and experienced professionals ensures that each patient is given the best possible report. We use the latest technology to deliver accurate results and findings. Our diagnostic center is equipped with state-of-the-art equipment and highly advanced technology.</p>
            
                <Link to='/about'>
                <p className='w-fit border border-black px-5 py-1 md:px-8 md:py-2 hover:bg-black hover:text-white'>
                READ MORE
                </p>
                </Link>
            </div>
        </section>
    )
}

export default About