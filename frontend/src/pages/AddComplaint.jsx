import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AddComplaint = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [problem, setProblem] = useState('')
  const [landmark, setLandmark] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState({ lat: null, lng: null })
  const [locationError, setLocationError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleselect = (e) => {
    setProblem(e.target.value)
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setLocationError('')
        },
        (error) => {
          setLocationError('Unable to retrieve your location')
        }
      )
    }
  }

  const handleSubmit = async () => {
    if (!file || !problem || !date) {
      alert('Please fill in all required fields and select a photo.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('http://localhost:3000/issue/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location,
          photo: file.name,
          adress: landmark,
          type: problem,
          date,
          description
        })
      })
      const result = await res.json()
      console.log(result)
      alert('Complaint submitted successfully!')
      navigate('/my-complaints')
    } catch (err) {
      console.error(err)
      alert('Failed to submit complaint')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className='min-h-screen w-[75%] not-sm:w-[100%] mt-18 bg-gray-50 p-8'>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:true,amount:0.2}}
          transition={{ duration: 0.4 }}
          className='text-3xl font-bold text-gray-900'
        >
          Submit New Complaint
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{once:true,amount:0.2}}
          transition={{ delay: 0.2, duration: 0.3 }}
          className='text-gray-600 mb-6'
        >
          Report sewage-related issues in your area.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{once:true,amount:0.1}}
          transition={{ duration: 0.4 }}
          className='bg-white rounded-xl shadow p-6 space-y-6'
        >
          {/* Location */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{once:true,amount:0.2}} transition={{ delay: 0.3 }}>
            <label className='block text-gray-800 font-medium mb-1'>Current Location</label>
            <button
              onClick={getLocation}
              className='px-4 py-1.5 cursor-pointer bg-sky-500 text-white rounded-md hover:bg-sky-600 transition'
            >
              Get My Location
            </button>
            {location.lat && location.lng && (
              <p className='mt-2 text-sm text-green-700'>
                ✅ Location fetched: {location.lat}, {location.lng}
              </p>
            )}
            {locationError && (
              <p className='mt-2 text-sm text-red-600'>{locationError}</p>
            )}
          </motion.div>

          {/* Date */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{once:true,amount:0.2}} transition={{ delay: 0.35 }}>
            <label className='block text-gray-800 font-medium mb-1'>Date</label>
            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type='date'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </motion.div>

          {/* Landmark */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <label className='block text-gray-800 font-medium mb-1'>Landmark (Optional)</label>
            <input
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
              type='text'
              placeholder='Street address or landmark'
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </motion.div>

          {/* Problem Type */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{once:true,amount:0.2}} transition={{ delay: 0.45 }}>
            <label className='block text-gray-800 font-medium mb-1'>Problem</label>
            <select
              onChange={handleselect}
              value={problem}
              required
              className={`p-2 rounded-md border ${problem === 'sewage' ? 'border-green-600 border-2' : 'border-gray-300'}`}
            >
              <option value='default'>Select a Problem</option>
              <option value='sewage'>Sewage</option>
            </select>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{once:true,amount:0.2}} transition={{ delay: 0.5 }}>
            <label className='block text-gray-800 font-medium mb-1'>
              Description <span className='text-sm text-gray-400'>(optional)</span>
            </label>
            <textarea
              rows='4'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Describe the sewage issue in detail...'
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            ></textarea>
          </motion.div>

          {/* File Upload */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{once:true,amount:0.2}} transition={{ delay: 0.55 }}>
            <label className='block text-gray-800 font-medium mb-2'>Photo Evidence</label>
            <div
              className={`w-full border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-all ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                required
                type='file'
                accept='image/*'
                id='photo'
                onChange={handleFileChange}
                className='hidden'
              />
              <label htmlFor='photo' className='cursor-pointer flex flex-col items-center justify-center'>
                <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 4v16m8-8H4' />
                </svg>
                <p className='mt-2 font-medium'>
                  {file ? `File Selected: ${file.name}` : 'Upload a photo or drag and drop'}
                </p>
                <p className='text-sm text-gray-400'>PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
          </motion.div>

          {/* Submit Buttons */}
          <motion.div className='flex justify-end gap-4' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{once:true,amount:0.2}} transition={{ delay: 0.6 }}>
            <button className='px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition'>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className='px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition'
            >
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AddComplaint
