import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="pt-16  bg-gradient-to-b from-[#111132] to-[#0c0c1d]">
        <div className="container ">
          <div className="py-9 ">
            <div className="flex justify-between items-center max-w-[1000px] m-auto ">
              {/* Brand & Contact */}
              <div className="footer-widget">
                <Link to="/">
                  <h1 className=" text-4xl text-white font-semibold tracking-wide">
                    ProductMS
                  </h1>
                  <hr className='w-48 mt-2' />
                </Link>
                <div className="footer-add mt-3">
                  <p className="mb-3 text-gray-400">A-402, Apple City, Dhunai Road, Modasa, Gujarat, India.</p>
                  <p className="mb-3 text-gray-400">+91 9773088547</p>
                  <p className="mb-3 text-gray-400">suthardasharath4@gmail.com</p>
                </div>
              </div>

              {/* Navigation */}
              <div className=''>
                <h3 className="font-semibold text-white mb-3 text-2xl">Navigations</h3>
                <ul className='capitalize'>
                  <li className="mb-2"><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li className="mb-2"><Link to="/products" className="text-gray-400 hover:text-white">Products</Link></li>
                  <li className="mb-2"><Link to="/wishList" className="text-gray-400 hover:text-white">wishList</Link></li>
                  <li className="mb-2"><Link to="/login" className="text-gray-400 hover:text-white">Admin</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Social Media */}
        <div className="py-5 bg-gradient-to-b from-[#0c0c1d] to-[#111132]">
          <div className="container  ">
            <div className="flex justify-between items-center text-gray-300 max-w-[1000px] m-auto">
              <p>&copy; ProductMS. Designed By Suthar Dasharath. All Rights Reserved.</p>
              <div className="flex space-x-4 text-xl">
                <Link to="#" className="text-gray-300 hover:text-white transition"><i className="fa-brands fa-square-facebook"></i></Link>
                <Link to="#" className="text-gray-300 hover:text-white transition"><i className="fa-brands fa-square-instagram"></i></Link>
                <Link to="#" className="text-gray-300 hover:text-white transition"><i className="fa-brands fa-square-x-twitter"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer