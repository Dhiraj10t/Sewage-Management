import React from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

const UserDashboard = () => {
    const navigate=useNavigate()
    return (
        <div className="flex max-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar/>


            {/* Main Content */}
            <main  className="flex-1 mt-18 w-full p-6 overflow-y-auto ">
                {/* Top Header */}
                <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{ delay: 0.2, duration: 0.5 }}
                 className="flex not-sm:flex-col mb-6 justify-between not-sm:gap-3 bg-gradient-to-r from-sky-500/20 via-white to-sky-500/20 border border-gray-200 px-6 py-6 rounded-xl items-center shadow-md">
                    <div className='space-y-0.5 flex flex-col not-sm:items-center gap-1'>
                        <h1 className="text-2xl font-semibold">Welcome back, dhiraj!</h1>
                        <p className="text-gray-600 flex not-sm:text-center">Here's an overview of your sewage complaint submissions.</p>
                    </div>
                    <button onClick={()=>navigate("/addComplaint")} className="flex gap-3 bg-gradient-to-r from-sky-500 to-sky-700 text-white px-5 py-3 rounded-lg cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-sm font-medium">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                            <g id="Edit / Add_Plus">
                                <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </svg></span>
                        <span>Submit New Complaint</span>
                    </button>
                </motion.div>

                {/* Quick Access Cards */}
                <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{ delay: 0.30, duration: 0.5 }}
                className="grid grid-cols-1 cursor-pointer md:grid-cols-2 gap-4 mb-6">
                    <div onClick={()=>navigate("/addComplaint")} className="bg-white bg-gradient-to-r from-sky-500/20  border-[1.5px] py-6 border-gray-200 rounded-xl px-6 flex  items-start gap-4 hover:shadow-sm">
                        <div className="text-2xl mt-3"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                            <g id="Edit / Add_Plus">
                                <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </svg></div>
                        <div>
                            <h3 className="text-lg font-semibold">Submit Complaint</h3>
                            <p className="text-sm text-gray-600">Report a new sewage issue</p>
                        </div>
                    </div>
                    <div onClick={()=>navigate("/myComplaint")} className="bg-white bg-gradient-to-r  to-sky-500/20 border-[1.5px] border-gray-200 rounded-lg py-6 px-6 flex items-start gap-4 hover:shadow-sm">
                        <div className="text-2xl mt-3 bg-blue-100 p-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="-0.5 0 25 25" fill="none">
                            <path d="M2 12.32H22" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 18.32H22" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 6.32001H22" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></div>
                        <div>
                            <h3 className="text-lg font-semibold">View My Complaints</h3>
                            <p className="text-sm text-gray-600">Track your submitted complaints</p>
                        </div>
                    </div>
                </motion.div>

                {/* Complaint Summary */}
                <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white border-[1.5px] bg-gradient-to-r from-sky-500/20 via-white to-sky-500/20 border-gray-200 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Your Complaint Summary</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div className='flex flex-col items-center gap-3'>
                            <div className="flex justify-center items-center text-full p-[11px] bg-blue-100 rounded-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none">
                                <path d="M2 12.32H22" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2 18.32H22" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2 6.32001H22" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></div>
                            <p className="font-bold">0</p>
                            <p className="text-sm text-gray-600">Total Submitted</p>
                        </div>
                        <div className='flex flex-col  items-center gap-3'>
                            <div className="bg-gray-100 rounded-full p-[11px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p className="font-bold">0</p>
                            <p className="text-sm text-gray-600">Pending Review</p>
                        </div>
                        <div className='flex flex-col items-center gap-3'>
                            <div className="p-[8px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3V6M3 12H6M5.63607 5.63604L7.75739 7.75736M5.63604 18.3639L7.75736 16.2426M21 12.0005H18M18.364 5.63639L16.2427 7.75771M11.9998 21.0002V18.0002M18.3639 18.3642L16.2426 16.2429" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p className="font-bold">0</p>
                            <p className="text-sm text-gray-600">In Progress</p>
                        </div>
                        <div className='flex flex-col items-center gap-3'>
                            <div className="p-[8px]">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 117 117" version="1.1">

                                    <title />

                                    <desc />

                                    <defs />

                                    <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">

                                        <g fill-rule="nonzero" id="correct">

                                            <path d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z" fill="#17AB13" id="Shape" />

                                            <path d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z" fill="#4A4A4A" id="Shape" />

                                        </g>

                                    </g>

                                </svg>
                            </div>
                            <p className="font-bold">0</p>
                            <p className="text-sm text-gray-600">Resolved</p>
                        </div>
                    </div>
                </motion.div>

                <div className="bg-white bg-gradient-to-r from-sky-500/20 via-white to-sky-500/20 border-[1.5px] border-gray-200 rounded-xl h-[300px] p-6 mb-6 ">
                    <h3 className="text-2xl font-semibold mb-2">
                        <span></span>
                        <span>Recent Activity</span>
                    </h3>
                    <div className='w-full flex flex-col  items-center gap-4 mt-10 '>
                        <span className="flex justify-center w-13 items-center h-13 bg-gray-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none">
                            <path d="M2 12.32H22" stroke="#9E9E9E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 18.32H22" stroke="#9E9E9E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 6.32001H22" stroke="#9E9E9E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></span>
                        <p className="text-gray-500">No complaints submitted yet</p>
                        <button  onClick={()=>navigate("/addComplaint")} className="flex gap-4 w-[25%%] bg-gradient-to-r from-sky-500 to-sky-700 text-white px-[18px] py-[11px] rounded-lg cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-sm font-medium">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                <g id="Edit / Add_Plus">
                                    <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg></span>
                            <span>Submit Your First Complaint</span>
                        </button>
                    </div>
                </div>

                
            </main>
        </div>

    )
}

export default UserDashboard
