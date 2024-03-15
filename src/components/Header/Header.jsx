/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import {LogoutBtn, Container, Logo} from './Header'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authSlice = useSelector((state) => {state.auth.status})
  const navigate = useNavigate()
  navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus
    },
  ]
  return (
    <header className=' py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
        <div className=' mr-4'>
          <Link to="/">
          <Logo/>
          </Link>
        </div>
        <ul className=' flex ml-auto'>
          {navItems.map((item) => (
            item.active ? (
              <li key={item.name}>
                <button 
                className=' inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100'
                onClick={() => navigate(item.slug)}
                >{item.name} </button>
              </li>
            ) : null
          ))}

          {
            authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )
          }

        </ul>
        </nav>

      </Container>
    </header>
  )
}

export default Header