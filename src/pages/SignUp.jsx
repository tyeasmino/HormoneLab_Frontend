import React, { useState } from 'react'
import signup from '../assets/signup.png'
import { Link } from 'react-router'
import { ImGoogle2 } from "react-icons/im";
import { FaSquareFacebook } from "react-icons/fa6";
import axios from 'axios';


const SignUp = () => {

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    user_type: "hospitalAuthority"
  })

  const [successTitle, setSuccessTitle] = useState("")
  const [successMessage, setSuccessMessage] = useState("")


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);

    try {
      const res = await axios.post(
        "https://hormone-lab-backend.vercel.app/accounts/register/",
        formData,
        {
          headers: {
            'content-Type': 'application/json',
          },
        }
      )
      console.log(res.status);


      if (res.status === 201) {
        setSuccessTitle('Success')
        setSuccessMessage('Registration is Done. Check your mail to active your account.')
        setFormData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: "",
          user_type: "hospitalAuthority"
        })
        console.log("done")
      } else {
        setSuccessTitle("Failed")
        setSuccessMessage(res.data.error || "Form registration has been failed. Please try again!!")
      }
    } catch (error) {
      console.log(error);
      setSuccessTitle('Failed')

      if (error.response && error.response.data) {
        const errorData = error.response.data

        if (errorData.username) {
          setSuccessMessage('Username already exists')
        } else if (errorData.email) {
          setSuccessMessage('Email already exists')
        } else if (errorData.password) {
          setSuccessMessage('Password did not matched')
        } else {
          setSuccessMessage(errorData.error || 'An errro occurred. Please try again')
        }
      } else {
        setSuccessMessage("An error occurred. Please try again")
      }
    }
  }


  return (
    <section className='py-5 md:py-16'>
      <section className='max-w-screen-xl md:px-10 mx-auto flex flex-col md:flex-row items-center gap-5 md:gap-20'>
        <div className='order-2 md:order-1 md:w-1/2'>
          <h2 className='flex gap-3 items-center font-bold text-[20px] md:text-[30px]'>Welcome </h2>
          <p className='text-sm md:text-[20px] font-light'>Today is a new day. It's your day. You shape it. Sign up to start collecting your all reports.</p>

          <form className="my-10" onSubmit={handleSubmit} >
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={formData.username}
                onChange={handleChange}
                type="text"
                name="username"
                id="floating_username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label htmlFor="floating_username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>

            <div className='md:flex md:mb-5 gap-5'>
              <div className="relative z-0 w-full mb-1 group">
                <input
                  value={formData.first_name}
                  onChange={handleChange}
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
              </div>

              <div className="relative z-0 w-full mb-1 group">
                <input
                  value={formData.last_name}
                  onChange={handleChange}
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                value={formData.email}
                onChange={handleChange}
                type="email"
                name="email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
            </div>

            <div className='md:flex gap-5 md:mb-5'>
              <div className="relative z-0 w-full mb-1 group">
                <input
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              </div>

              <div className="relative z-0 w-full mb-1 group">
                <input
                  value={formData.confirm_password}
                  onChange={handleChange}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label htmlFor="confirm_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
              </div>
            </div>

            <div className='md:my-5'>
              <span>Select Your Role</span>
              <div className='md:flex justify-between'>
                <div className="form-control">
                  <label className="flex items-center gap-3 label cursor-pointer">
                    <input
                      type="radio"
                      id="hospitalAuthority"
                      value="hospitalAuthority"
                      onChange={handleChange}
                      name="user_type" className="radio radio-xs checked:bg-blue-600" defaultChecked />
                    <span className="label-text" htmlFor="hospitalAuthority" >Hospital Authority</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="flex items-center gap-3 label cursor-pointer">
                    <input
                      type="radio"
                      id="marketingExecutive"
                      value="marketingExecutive"
                      onChange={handleChange}
                      name="user_type" className="radio radio-xs checked:bg-green-600" />
                    <span className="label-text" htmlFor="marketingExecutive">Marketing Executive</span>
                  </label>
                </div>
              </div>
            </div>
            <button type='submit' className='w-full bg-blue-500 py-2 my-5 rounded text-center text-white font-semibold'>
                Sign Up 
            </button>
          </form>

          {successMessage && (
            <div
              className="bg-green-500 text-white rounded-lg mt-5 p-3 text-center shadow-md transform transition-all duration-300 ease-in-out"
              role="alert"
            >
              <p className="font-bold">{successTitle}</p>
              <p>{successMessage}</p>
            </div>
          )}


          <div className="divider">OR</div>
          <div className='flex flex-col md:flex-row justify-between'>
            <Link className='flex px-5 gap-3 items-center border border-black hover:bg-black hover:text-white justify-center py-1 rounded'><ImGoogle2 /> Sign up with Google</Link>
            <Link className='flex px-5 gap-3 items-center border border-black  hover:bg-black hover:text-white justify-center py-1 rounded'><FaSquareFacebook /> Sign up with Facebook</Link>
          </div>
        </div>
        <div className='order-1 md:order-2 md:w-1/2'> <img src={signup} alt="" /></div>
      </section>
    </section>
  )
}

export default SignUp