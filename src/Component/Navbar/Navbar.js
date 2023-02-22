import React from 'react'
import "./Navbar.css"
import { Link, Outlet } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
          <div  >
            <div className='navBack py-3' >
              <ul className='nav justify-content-center'>
                <li className='nav-item'>
                  <Link className='nav-link active fw-bold' aria-current='page' to='/' style={{
                    cursor: 'pointer',
                    fontSize: '20px',
                    color: 'white',
                    textTransform: 'uppercase'
                   }}>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  {/* http://localhost:8888/api/sudoku */}
                   <a className='nav-link fw-bold' style={{
                    cursor: 'pointer',
                    fontSize: '20px',
                    color: 'white',
                    textTransform: 'uppercase'
                   }} href='/api/sudoku'>
                    Sudoku API
                  </a>
                </li>
              </ul>
            </div>
         
        <Outlet />
          </div>
        {/* <h1 className='text-center'>Sudoku Game</h1> */}
    
    
    
    </>
  )
}

export default Navbar