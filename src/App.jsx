/* eslint-disable no-unused-vars */
import { useState } from 'react'
import authService from './appwrite/Auth'
import './App.css'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import {login, logout} from './store/AuthSlice'
import { Footer, Header } from './components/Index'
import { Outlet } from 'react-router-dom'

function App() {
// console.log(import.meta.env.VITE_APPWRITE_URL)
const [loading, setLoading] = useState(true)
const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
   if (userData) {
    dispatch( login({userData}))
   }
   else{
    dispatch(logout())
  }
  })
  .catch( console.log('error'))
  .finally(() =>  setLoading(false))
}, [])

  return !loading ? (
    <div className=' min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className=' w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
