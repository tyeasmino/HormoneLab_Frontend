import React from 'react'
import about from '../assets/about.svg'

const About = () => {
    return (
        <section className='max-w-screen-xl mx-auto flex items-center justify-between'>
            <div className='w-1/2'>
                <img className='w-full' src={about} alt="" />
            </div>
            <div className='w-1/2'>
                About Us
                Welcome to The Hormone Lab & Infertility Center
                The Hormone Lab Infertility Centre is a renowned and reliable diagnostic center located in Mohammadpur Dhaka, Bangladesh. Established in 2012, the Centre has earned a reputation for providing highly advanced diagnostic services. We offer a comprehensive range of diagnostic services. We strive to provide quality services at The hormone Lab Infertility Center at competitive prices. Our team of highly trained and experienced professionals ensures that each patient is given the best possible report. We use the latest technology to deliver accurate results and findings. Our diagnostic center is equipped with state-of-the-art equipment and highly advanced technology.
            </div>
        </section>
    )
}

export default About