import { useContext, useState } from 'react'
import './App.css'
import Index from './routes/Index'
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './contexts/AuthContext';



function App() { 
  return (
    <div className=' dark:bg-gray-900  dark:text-white'>
      <Index />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App
