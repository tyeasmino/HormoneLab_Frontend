import React, { useEffect, useState } from 'react'
import bg1 from '../assets/bg1.jpg'

import s1 from '../assets/slider1.png'
import s2 from '../assets/slider2.jpg'
import s3 from '../assets/slider3.jpg'
import s4 from '../assets/slider4.jpg'


const HeroSection = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 4; // Total number of slides
    const slides = [
        { image: s1, title: "Specialist", subtitle: "11 Years Caring About You" },
        { image: s2, title: "We are located in Mohammadpur", subtitle: "Also open on Friday 10AM - 6PM" },
        { image: s3, title: "Advanced Lab Facilities", subtitle: "Ensuring the Best Diagnostic Reports" },
        { image: s4, title: "Online Report Delivery", subtitle: "Get Your Reports Anytime, Anywhere" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 10000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Manual navigation
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    return (
        <section>
            {/* Carousel Section */}
            <div className="relative md:max-h-[450px] w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full flex-shrink-0 relative">
                            <img src={slide.image} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute transition-all duration-700 ease-in-out transform ${currentSlide === index
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-5"
                                }`}
                        >
                            <h2 className="md:text-4xl font-bold bg-black/50 px-6 py-2 rounded-lg">{slide.title}</h2>
                            <p className="md:text-xl mt-2 bg-black/50 px-4 py-1 rounded-lg">{slide.subtitle}</p>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full"
                >
                    ❮
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full"
                >
                    ❯
                </button>
            </div>
        
            <div className="max-w-screen-xl md:px-20 mx-auto flex flex-col md:flex-row gap-5 p-5 items-center justify-between">
                <div className="order-2 md:order-1 md:w-2/3">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        We Help People Get All Reports Online
                    </h1>
                    <p className="text-justify md:text-xl font-semibold">
                        This helps our patients, clients, and marketing executives deliver reports quickly so that patients don’t have to go through the hassle of collecting reports in person.
                    </p>
                </div>
                <div className="order-1 md:order-2 md:w-1/3">
                    <img src={bg1} alt="" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection