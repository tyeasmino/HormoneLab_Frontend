import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaSquareFacebook } from "react-icons/fa6";
import { ImGoogle2 } from "react-icons/im";
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import hand from '../assets/hand.png';
import singin from '../assets/login.png';
import { AuthContext } from '../contexts/AuthContext';


const SignIn = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const { user, loading, login } = useContext(AuthContext)
  const [successTitle, setSuccessTitle] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [loading, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "https://hormone-lab-backend.vercel.app/accounts/login/",
        formData,
        {
          headers: {
            'content-Type': 'application/json',
          },
        }
      )

      if (res.status === 200 && !res.data.error) {
        setSuccessTitle("Success")
        setSuccessMessage("Login Successful!!!")

        localStorage.setItem('token', res.data.token)
        const loginSuccess = await login(formData)
        if (loginSuccess) {
          navigate('/dashboard')
        }

        setFormData({
          username: "",
          password: "",
        })
      } else {
        setSuccessTitle("Failed")
        setSuccessMessage("An error occured. Please try again")
      }
    } catch (error) {
      setSuccessTitle("Failed")
      setSuccessMessage("An error occured. Please try again")
    }
  }

  if (loading) {
    return <div className='flex items-center justify-center m-auto w-full min-h-svh'>
      <span className="loading loading-spinner loading-md "></span>
    </div>
  }


  return (
    <section className='py-5 md:py-16'>
      <section className='max-w-screen-xl md:px-10 mx-auto md:flex items-center gap-20'>
        <div className='md:w-1/2'> <img src={singin} alt="" /></div>
        <div className='md:w-1/2 p-5 md:px-20'>
          <h2 className='flex gap-3 items-center font-bold text-[20px] md:text-[30px]'>Welcome Back <img className='w-8' src={hand} alt="" /> </h2>
          <p className='text-sm md:text-[20px] font-light'>Today is a new day. It's your day. You shape it. Sign in to start collecting your new reports.</p>

          <form className="max-w-lg mx-auto my-10" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                id="floating_username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label htmlFor="floating_username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>

            <div className="relative z-0 w-full mb-1 group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            <div className="w-full text-end">
              <Link to='' className='text-sm text-red-500'>Forgot Password?</Link>
            </div>

            <button type='submit' className='bg-blue-500 py-2 w-full my-5 rounded text-center text-white font-semibold'>
              Sign In
            </button>
          </form>
          <div className="divider">OR</div>

          <div className='flex flex-col gap-3'>
            <Link className='flex gap-3 items-center border border-black hover:bg-black hover:text-white justify-center py-2 rounded'><ImGoogle2 /> Sign in with Google</Link>
            <Link className='flex gap-3 items-center border border-black  hover:bg-black hover:text-white justify-center py-2 rounded'><FaSquareFacebook /> Sign in with Facebook</Link>
          </div>

          <div className='text-center my-5'>
            <Link to='/register'>Don't you have an account? <span className='font-semibold text-blue-500'>Sign up</span></Link>
          </div>
          {successMessage && (
            <div
              className="bg-green-500 text-white rounded-lg mt-5 p-3 text-center shadow-md transform transition-all duration-300 ease-in-out"
              role="alert"
            >
              <p className="font-bold">{successTitle}</p>
              <p>{successMessage}</p>
            </div>
          )}
        </div>


      </section>
    </section>
  )
}

export default SignIn