import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [show, setShow] = useState(false)
    return (
        <aside className='sm:border-r-[1.5px] not-sm:absolute w-[25%] mt-17 not-sm:mt-18 not-sm:w-[100%] sm:bg-white sm:border-gray-200'>
            <div onClick={() => setShow(!show)} className='sm:hidden not-sm:fixed top-[25px] z-10 left-3 w-[8-vw]'>
                {show?<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="16px" height="16px" viewBox="0 0 16 16">
                    <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd" /></svg>:<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-0.5 0 25 25" fill-rule="none"><path d="M2 12.32H22" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 18.32H22" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 6.32001H22" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                }
            </div>
            <nav className={`fixed mt-6 not-sm:mt-0 not-sm:text-sm sm:w-[25%] not-sm:w-[60%] transition-all ease-in-out duration-600 md:translate-x-0 ${show ? "translate-x-0" : "-translate-x-200"} not-sm:h-screen not-sm:bg-white`}>
                <ul className="space-y-1">
                    <li>
                        <Link to="/user" className="flex items-center gap-1 px-4 py-3 text-gray-800 mx-1 hover:bg-gray-200 rounded-xl">
                            <span className='not-sm:h-5 not-sm:w-5'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1" id="Layer_1" width="24px" height="24px" viewBox="0 0 92 92" enable-background="new 0 0 92 92" xml:space="preserve">
                                <path id="XMLID_1594_" d="M72.8,24.9L53.4,66.7c-1.7,4.3-4.7,6.8-8,6.8c-2.7,0-5-1.4-6.3-3.6c-1.4-2.6-1.3-5.8,0.4-8.5v0l25.4-40.7  c1.3-2,3.9-2.7,6-1.6C73,20.2,73.8,22.7,72.8,24.9z M79.6,37c-1.5-1.6-4-1.7-5.7-0.2c-1.6,1.5-1.7,4-0.2,5.7  C80.3,49.7,84,59.1,84,69c0,2.2,1.8,4,4,4s4-1.8,4-4C92,57.1,87.6,45.7,79.6,37z M49.2,30.4c2.2,0.2,4.1-1.4,4.3-3.6  c0.2-2.2-1.4-4.1-3.6-4.3c-1.3-0.1-2.6-0.2-3.9-0.2c-25.4,0-46,21-46,46.8c0,2.2,1.8,4,4,4s4-1.8,4-4c0-21.4,17-38.8,38-38.8  C47.1,30.2,48.2,30.3,49.2,30.4z" />
                            </svg></span>
                            <span className="ml-2 font-medium tracking-wide">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/addComplaint" className="flex items-center gap-1 px-4 py-3 mx-1 text-gray-800 hover:bg-gray-200 rounded-xl">
                            <span className='not-sm:h-5 not-sm:w-5'><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                <g id="Edit / Add_Plus">
                                    <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg></span>
                            <span className="ml-2 font-medium tracking-wide">Submit Complaint</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/myComplaint" className="flex items-center gap-1 px-4 py-3 mx-1 text-gray-800 hover:bg-gray-200 rounded-xl">
                            <span className='mt-[1px] not-sm:h-5 not-sm:w-5'><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="-0.5 0 25 25" fill="none">
                                <path d="M2 12.32H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2 18.32H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2 6.32001H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></span>
                            <span className="ml-2 font-medium tracking-wide">My Complaints</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
