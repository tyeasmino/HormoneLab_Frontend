import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import useProfile from '../../apiServices/userProfile'

const MarketingExecutiveProfile = () => {
  const { user } = useContext(AuthContext)
  const token = localStorage.getItem("token")

  const { profileData, locations, handleChange, handleUpdateProfile } = useProfile(
    'me',
    user.me,
    token
  )





  return (
    <section className='max-w-screen-lg m-auto shadow p-5'>
      <div className='flex flex-col gap-5 relative'>
        <div>
          <h2 className='md:text-3xl font-bold text-gray-800 text-center'>Update Your Profile</h2>
          <p className=' text-center'>Ensure your profile is updated to get orders</p>
        </div>


        <form onSubmit={handleUpdateProfile}>
          <div className='flex flex-col md:flex-row gap-5'>
            <div className='m-5 w-full'>
              <input
                type="text" name="user" id="user" hidden
                value={profileData.user} onChange={handleChange}
              />

              <h6 className='text-[20px] font-bold text-heading'>Shop Details</h6>

              <div className='flex flex-col   mb-5'>
                <label className='font-semibold text-sm' htmlFor="shop_address">Location</label>
                <select
                                    name="location"
                                    value={profileData.location}
                                    onChange={handleChange}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                                >
                                    <option value="" disabled>Select a Location</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.location_name}
                                        </option>
                                    ))}
                                </select>
              </div>

              <div className='flex flex-col   mb-5'>
                <label className='font-semibold text-sm' htmlFor="image">Profile Logo</label>


                <input type="file" name="image" onChange={handleChange}
                  className="file-input mt-2 file-input-bordered w-full " />
                {profileData.image && profileData.image instanceof File && (
                  <p className="text-xs text-pink mt-1">New Image Uploaded</p>
                )}
                {profileData.image && !(profileData.image instanceof File) && (
                  <img src={profileData.image} alt="Attachment Preview" className="max-w-[100px] max-h-[100px]  mt-2 rounded-xl" />
                )}
              </div>

              <h6 className='  text-[20px] font-bold text-heading'>Contact Details</h6>
              <div className='flex w-full  flex-col '>
                <label className='font-semibold text-sm' htmlFor="phone">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                />
              </div>
            </div>
          </div>
          <div className='flex text-center md:items-end justify-center md:justify-end mx-5'>
            <button className='bg-heading px-5 py-2 bg-bg-dark text-sm text-white rounded' type="submit">Update Profile</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default MarketingExecutiveProfile