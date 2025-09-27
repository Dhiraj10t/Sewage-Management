import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/AuthProvider'

const Navbar = () => {
  const { logout, token, user } = useAuth()
  const [show, setShow] = useState(false)
  const HandleLogout = () => {
    logout()
  }
  console.log("user",user)

  // Get first letter and first name safely
  const userInitial = user?.name ? user.name[0].toUpperCase() : "U"
  const userFirstName = user?.name ? user.name.split(" ")[0] : "User"

  return (
    <nav className={`${token ? "" : "hidden"} border-b-[1.5px] fixed top-0 z-20 bg-white border-gray-200 w-full h-18 flex justify-between items-center not-sm:px-2 px-4`}>
      <div className="sm:text-2xl p-1 gap-2 text-xl font-bold flex items-center sm:gap-2">
        <span className='invisible'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none"><path d="M2 12.32H22" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 18.32H22" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 6.32001H22" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </span>
        <span className='not-sm:hidden'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-droplets text-primary-500 text-2xl mr-3 h-8 w-8"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg></span>
        <span className=''>Sewage Management</span>
      </div>
      <div onClick={() => setShow(!show)} className='hover:bg-gray-100 text-[12px] sm:text-lg cursor-pointer py-0.5 rounded-lg flex sm:gap-4 gap-1 items-center'>
        <span className='sm:py-2 py-1 px-2 sm:px-3 bg-gray-100 rounded-full'>{userInitial}</span>
        <span className='flex items-center gap-1 sm:gap-3'>
          <span>{userFirstName}</span>
          <span className='flex align-middle'>
            {show ? <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <path d="M5 15L10 9.84985C10.2563 9.57616 10.566 9.35814 10.9101 9.20898C11.2541 9.05983 11.625 8.98291 12 8.98291C12.375 8.98291 12.7459 9.05983 13.0899 9.20898C13.434 9.35814 13.7437 9.57616 14 9.84985L19 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
          </span>
        </span>
      </div>
      <div className={`${show ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 invisible"} transition-all duration-300 absolute shadow-md border-b-[1.5px] border-l-[1.5px] border-r-[1.5px] border-gray-200 rounded-b-xl top-14 right-12 not-sm:right-2 h-11 not-sm:text-[12px] not-sm:h-8 w-26 not-sm:w-14 p-1 bg-white`}>
        <button onClick={HandleLogout} className={`hover:bg-gray-200 bg-white w-full h-full rounded-lg`}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
