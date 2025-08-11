import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Menu from './pages/Menu'
import UserDashboard from './pages/UserDashboard'
import AddComplaint from './pages/AddComplaint'
import MyComplaints from './pages/MyComplaints'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './hooks/AuthProvider'

function App() {
  const { token } = useAuth()
  return (
    <>
      <Navbar />
      <Routes>
        {!token && (<>
          <Route path='/' element={<Navigate to="/login" replace/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </>)}

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Navigate to='/user' replace />} />
          <Route path='/register' element={<Navigate to='/user' replace />} />
          <Route path='/login' element={<Navigate to='/user' replace />} />
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/addComplaint' element={<AddComplaint />} />
          <Route path='/myComplaint' element={<MyComplaints />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
