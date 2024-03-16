/* eslint-disable no-unused-vars */
import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/AuthSlice'
import authService from '../../appwrite/Database'

function LogoutBtn() {
  const  dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button className=' inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100'onClick={logoutHandler} >Logout</button>
  )
}

export default LogoutBtn