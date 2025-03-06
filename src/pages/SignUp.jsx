import React from 'react'
import signup from '../assets/signup.png'
import { Link } from 'react-router'
import { ImGoogle2 } from "react-icons/im";
import { FaSquareFacebook } from "react-icons/fa6";


const SignUp = () => {
  return (
    <section className='py-5 md:py-16'>
      <section className='max-w-screen-xl md:px-10 mx-auto flex flex-col md:flex-row items-center gap-5 md:gap-20'>
        <div className='order-2 md:order-1 md:w-1/2 p-5 md:px-20'>
          <h2 className='flex gap-3 items-center font-bold text-[20px] md:text-[30px]'>Welcome </h2>
          <p className='text-sm md:text-[20px] font-light'>Today is a new day. It's your day. You shape it. Sign up to start collecting your all reports.</p>

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

            <div className='md:flex md:mb-5 gap-5'>
              <div class="relative z-0 w-full mb-1 group">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label for="first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
              </div>

              <div class="relative z-0 w-full mb-1 group">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label for="last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
              </div>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
            </div>

            <div className='md:flex gap-5 md:mb-5'>
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

              <div class="relative z-0 w-full mb-1 group">
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label for="confirm_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
              </div>
            </div>

            <select className="select select-bordered w-full my-3 md:my-0">
              <option disabled selected>Select Your Location</option>
              <option>Savar</option>
              <option>Gazipur</option>
              <option>Narsingdi</option>
            </select>

            <div className='md:my-5'>
              <span>Select Your Role</span>
              <div className='md:flex justify-between'>
                <div className="form-control">
                  <label className="md:flex md:items-center md:gap-3 label cursor-pointer">
                    <input type="radio" name="radio-10" className="radio radio-xs checked:bg-blue-600" defaultChecked />
                    <span className="label-text ">Hospital Authority</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="md:flex items-center gap-3 label cursor-pointer">
                    <input type="radio" name="radio-10" className="radio radio-xs checked:bg-green-600" defaultChecked />
                    <span className="label-text ">Marketing Executive</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='bg-blue-500 py-2 my-5 rounded text-center text-white font-semibold'>
              <button>Sign Up</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className='flex flex-col md:flex-row gap-3'>
            <Link className='flex px-2 gap-3 items-center border border-black hover:bg-black hover:text-white justify-center py-1 rounded'><ImGoogle2 /> Sign up with Google</Link>
            <Link className='flex px-2 gap-3 items-center border border-black  hover:bg-black hover:text-white justify-center py-1 rounded'><FaSquareFacebook /> Sign up with Facebook</Link>
          </div>
        </div>
        <div className='order-1 md:order-2 md:w-1/2'> <img src={signup} alt="" /></div>
      </section>
    </section>
  )
}

export default SignUp