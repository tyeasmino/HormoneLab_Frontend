import React from 'react'
import biochemistry from '../assets/departments/biochemistry.png'
import microbiology from '../assets/departments/microbiology.png'
import immunology from '../assets/departments/immunology.jpg'
import hematology from '../assets/departments/hematology.jpg'
import endocrinology from '../assets/departments/endocrinology.jpg'
import histopathology from '../assets/departments/histopathology.jpg'


const Departments = () => {
    return (
        <section className='bg-gray-100'>
            <section className='max-w-screen-xl md:px-20 mx-auto p-5 flex flex-col gap-4 py-10'>
                <h1 className='text-2xl font-semibold'>Departments</h1>

                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col md:flex-row gap-8'>
                        <div className='w-1/3 bg-white'>
                            <img src={biochemistry} className='w-full h-[200px]' alt="" />
                            <div className='p-7 flex flex-col gap-5'>
                                <h3 className='font-semibold text-center'>Department of Biochemistry</h3>
                                <p className='text-gray-400 text-[12px] text-justify'>In the Department of Biochemistry, we provide a comprehensive range of biochemistry tests necessary for disease.</p>
                            </div>
                        </div>

                        <div className='w-1/3 bg-white'>
                            <img src={microbiology} className='w-full h-[200px]' alt="" />
                            <div className='p-7 flex flex-col gap-5'>
                                <h3 className='font-semibold text-center'>Department of Microbiology</h3>
                                <p className='text-gray-400 text-[12px] text-justify'>In the Department of Microbiology performs various microbiological procedures to cultivate, isolate and identify microorganisms</p>
                            </div>
                        </div>
                        <div className='w-1/3 bg-white'>
                            <img src={immunology} className='w-full h-[200px]' alt="" />
                            <div className='p-7 flex flex-col gap-5'>
                                <h3 className='font-semibold text-center'>Department of Immunology</h3>
                                <p className='text-gray-400 text-[12px] text-justify'>To diagnose autommune disease, our department of Immunology is currently providing a wide range of diagnostic serviecs.</p>
                            </div>
                        </div>
                    </div> 
                    <div className='flex flex-col md:flex-row gap-8'>
                        <div className='w-1/3 bg-white'>
                            <img src={hematology} className='w-full h-[200px]' alt="" />
                            <div className='p-7 flex flex-col gap-5'>
                                <h3 className='font-semibold text-center'>Department of Hematology and Clinical Pathology</h3>
                                <p className='text-gray-400 text-[12px] text-justify'>We are handling wide range of clinical pathological sample in this department. Medical, we offer a wise</p>
                            </div>
                        </div>

                        <div className='w-1/3 bg-white'>
                            <img src={endocrinology} className='w-full h-[200px]' alt="" />
                            <div className='p-7 flex flex-col gap-5'>
                                <h3 className='font-semibold text-center'>Department of Endocrinology</h3>
                                <p className='text-gray-400 text-[12px] text-justify'>When it comes to dealing with your reproductive health, fertility, and menopause, in particular, the subject of hormones will come up a lot.</p>
                            </div>
                        </div>
                        <div className='w-1/3 bg-white'>
                            <img src={histopathology} className='w-full h-[200px]' alt="" />
                            <div className='p-7 flex flex-col gap-5'>
                                <h3 className='font-semibold text-center'>Department of Histopathology</h3>
                                <p className='text-gray-400 text-[12px] text-justify'>In histology image analysis for cancer diagnosis, histopathologists visually examine the regularities of cell shapes and tissue distributions.</p>
                            </div>
                        </div>
                    </div> 
                </div>
            </section>
        </section>
    )
}

export default Departments