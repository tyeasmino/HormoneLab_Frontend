import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast

const MarketingExecutiveProfile = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const [profileData, setProfileData] = useState({
    image: '',
    due: '',
    extra_paid: '',
    phone: '',
    user: '',
    location: '',
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [locations, setLocations] = useState([]);
  const [isLocationSet, setIsLocationSet] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (e.target.multiple) {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({
        ...formData,
        [name]: selectedValues,
      });
    } else if (files && files[0]) {
      const file = files[0];

      if (name === 'image') {
        openCloudinaryWidget(file);
      } else if (name === 'cv') {
        setFormData({
          ...formData,
          [name]: file,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const openCloudinaryWidget = (resourceType) => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dxcwijywg',
        uploadPreset: 'HormoneLab',
        resourceType,
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
        folder: 'profile_uploads',
        clientAllowedFormats: resourceType === 'raw' ? ['pdf'] : ['jpg', 'jpeg', 'png'],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
        } else if (result.event === 'success') {
          const fileUrl = result.info.secure_url;
          setFormData((prev) => ({
            ...prev,
            [resourceType === 'raw' ? 'curriculum_vitae' : 'image']: fileUrl,
          }));
        }
      }
    );
    widget.open();
  };

  const fetchLocations = async () => {
    try {
      const endpoint = formData.location
        ? 'https://hormone-lab-backend.vercel.app/clients/all_locations/'
        : 'https://hormone-lab-backend.vercel.app/clients/locations/';
      const res = await axios.get(endpoint);
      setLocations(res.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast.error("Error fetching locations");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `https://hormone-lab-backend.vercel.app/executives/marketing-executive/${user.me}/`,
        { headers: { Authorization: `Token ${token}` } }
      );

      if (res.data) {
        setProfileData((prev) => ({
          ...prev,
          specialization: res.data.specialization || [],
          ...res.data,
        }));
        setFormData((prev) => ({
          ...prev,
          ...res.data,
        }));

        if (res.data.location) {
          setIsLocationSet(true);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error("Error fetching profile");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedProfileData = {
      ...formData,
      image: formData.image,
    };

    try {
      const res = await axios.put(
        `https://hormone-lab-backend.vercel.app/executives/marketing-executive/${user.me}/`,
        updatedProfileData,
        { headers: { Authorization: `Token ${token}` } }
      );

      if (res.status === 200) {
        toast.success('Profile updated successfully.'); // Show success toast
        setProfileData((prevData) => ({ ...prevData, ...updatedProfileData }));
      } else {
        toast.error('Profile update failed.'); // Show error toast if update fails
      }
    } catch (error) {
      console.error('Error during profile update:', error);
      toast.error('Error during profile update'); // Show error toast
    }
  };

  useEffect(() => {
    fetchLocations();
    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <section className='md:w-[500px] m-auto shadow p-5'>
      <div className='flex flex-col gap-5 relative'>
        <div>
          <h2 className='md:text-3xl font-bold text-center'>Update Your Profile</h2>
          <p className='text-center'>Ensure your profile is updated to get orders</p>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <section className='flex flex-col md:flex-row gap-5'>
            <div className='md:w-2/3'>
              <div className='flex flex-col mb-5'>
                <label className='font-semibold text-sm' htmlFor="location">Location</label>
                <select
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  disabled={isLocationSet}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                >
                  <option value="" disabled>Select a Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.location_name}
                    </option>
                  ))}
                </select>

                {isLocationSet && (
                  <p className="mt-2 text-sm text-gray-400">Location cannot be changed.</p>
                )}
              </div>

              <div className='flex w-full flex-col mb-5'>
                <label className='font-semibold text-sm' htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                />
              </div>
            </div>

            <div className='md:w-1/3'>
              <div className="mb-4">
                <button type="button" className='bg-bg-dark text-sm px-3 py-1 rounded-md text-white' onClick={() => openCloudinaryWidget('image')}> Upload Image </button>
                {formData.image && <img src={formData.image} alt="Profile" className="w-20 h-20 mt-2 rounded-xl" />}
              </div>
            </div>
          </section>

          <div className='flex text-center md:items-end justify-center mx-5'>
            <button className='bg-heading px-5 py-2 bg-bg-dark text-sm text-white rounded' type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MarketingExecutiveProfile;
