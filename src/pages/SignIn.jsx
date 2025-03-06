import React from 'react'
import singin from '../assets/login.png'
import hand from '../assets/hand.png'
import { Link } from 'react-router'
import { ImGoogle2 } from "react-icons/im";
import { FaSquareFacebook } from "react-icons/fa6";



const SignIn = () => {
  return (
    <section className='py-5 md:py-16'>
      <section className='max-w-screen-xl md:px-10 mx-auto md:flex items-center gap-20'>
        <div className='md:w-1/2'> <img src={singin} alt="" /></div>
        <div className='md:w-1/2 p-5 md:px-20'>
          <h2 className='flex gap-3 items-center font-bold text-[20px] md:text-[30px]'>Welcome Back <img className='w-8' src={hand} alt="" /> </h2>
          <p className='text-sm md:text-[20px] font-light'>Today is a new day. It's your day. You shape it. Sign in to start collecting your new reports.</p>

          <form class="max-w-lg mx-auto my-10" >
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="username"
                id="floating_username"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label for="floating_username" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>

            <div class="relative z-0 w-full mb-1 group">
              <input
                type="password"
                name="password"
                id="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            <div class="w-full text-end">
              <Link to='' className='text-sm text-red-500'>Forgot Password?</Link>
            </div>

            <div className='bg-blue-500 py-2 my-5 rounded text-center text-white font-semibold'>
              <button>Sign In</button>
            </div>
          </form>
          <div className="divider">OR</div>

          <div className='flex flex-col gap-3'>
            <Link className='flex gap-3 items-center border border-black hover:bg-black hover:text-white justify-center py-2 rounded'><ImGoogle2 /> Sign in with Google</Link>
            <Link className='flex gap-3 items-center border border-black  hover:bg-black hover:text-white justify-center py-2 rounded'><FaSquareFacebook /> Sign in with Facebook</Link>
          </div>

          <div className='text-center my-5'>
            <Link to='/register'>Don't you have an account? <span className='font-semibold text-blue-500'>Sign up</span></Link>
          </div>
        </div>
      </section>
    </section>
  )
}

export default SignIn