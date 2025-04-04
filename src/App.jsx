import { useState } from 'react'
import './App.css'
import Index from './routes/Index'
import { Toaster } from 'react-hot-toast';



function App() {

  return (
    <div className=' dark:bg-slate-900  dark:text-white'>
      <Index />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App
