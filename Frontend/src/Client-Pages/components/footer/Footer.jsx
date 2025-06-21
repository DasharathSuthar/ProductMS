import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="pt-16 bg-gradient-to-b from-[#111132] to-[#0c0c1d] text-white">
        {/* Main Footer Content */}
        <div className="py-9 px-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 max-w-[1000px] mx-auto">
            {/* Brand & Contact */}
            <div className="footer-widget flex-1">
              <Link to="/">
                <h1 className="text-4xl font-semibold tracking-wide">
                  ProductMS
                </h1>
                <hr className="w-48 mt-2 border-white" />
              </Link>
              <div className="footer-add mt-4 text-gray-400 text-sm">
                <p className="mb-2">A-402, Apple City, Dhunai Road, Modasa, Gujarat, India.</p>
                <p className="mb-2">+91 9773088547</p>
                <p className="mb-2">suthardasharath4@gmail.com</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1">
              <h3 className="font-semibold text-2xl mb-3">Navigations</h3>
              <ul className="capitalize space-y-2 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/products" className="hover:text-white">Products</Link></li>
                <li><Link to="/wishList" className="hover:text-white">WishList</Link></li>
                <li><Link to="/login" className="hover:text-white">Admin</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright & Social Media */}
        <div className="py-5 bg-gradient-to-b from-[#0c0c1d] to-[#111132] px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1000px] mx-auto text-gray-300 text-sm">
            <p className="text-center">&copy; ProductMS. Designed By Suthar Dasharath. All Rights Reserved.</p>
            <div className="flex justify-center space-x-4 text-xl">
              <Link to="#" className="hover:text-white transition"><i className="fa-brands fa-square-facebook"></i></Link>
              <Link to="#" className="hover:text-white transition"><i className="fa-brands fa-square-instagram"></i></Link>
              <Link to="#" className="hover:text-white transition"><i className="fa-brands fa-square-x-twitter"></i></Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
