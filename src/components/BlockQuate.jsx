import React from 'react';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { motion } from 'framer-motion';

const BlockQuote = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className='bg-blue-950 text-white p-6 md:p-20'>
      <div className='max-w-screen-lg mx-auto'>
        <div className=''>


          {/* Quote Text */}
          <motion.div
            className='my-6 md:my-12'
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className='w-fit mx-auto text-center relative'>
              <p className='md:text-3xl text-sm font-medium italic'>
                Investing in health today is investing in a stronger tomorrow. Small changes lead to significant impacts on our lives.
              </p>

              {/* Left Quote Icon with animation */}
              <motion.div
                className='absolute -left-20 -top-2 hidden md:block'
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <RiDoubleQuotesL className='text-5xl' />
              </motion.div>


              {/* Right Quote Icon with animation */}
              <motion.div
                className='absolute -right-20 -top-2 hidden md:block'
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <RiDoubleQuotesR className='text-5xl' />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Author */}
        <motion.div
          className="text-center font-bold text-2xl mt-6 md:mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <p className='text-lg md:text-2xl text-right text-gray-300'>- Mukesh Jain</p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlockQuote;
