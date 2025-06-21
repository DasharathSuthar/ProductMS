import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ title, description }) => {
    return (
        <>
            <div className='hero relative overflow-hidden min-h-screen bg-gradient-to-b from-[#0c0c1d] to-[#111132]'>
                <div className="wrapper max-w-[1000px] mx-auto h-full px-4 py-16">
                    <div className="flex flex-col md:flex-row h-full items-start  gap-10">
                        <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl text-purple-800 uppercase tracking-[6px] sm:tracking-[8px] md:tracking-[10px]">
                                {title}
                            </h2>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white capitalize leading-tight">
                                {description}
                            </h1>
                            {title === "Suthar Dasharath" && (
                                <div className="z-10">
                                    <Link
                                        to="/products"
                                        className="inline-block mt-4 px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition"
                                    >
                                        See the Products
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Background Text */}
                <div className="absolute text-[20vh] sm:text-[30vh] md:text-[50vh] text-black opacity-10 whitespace-nowrap -bottom-12 md:-bottom-28 left-4 md:left-1/2 md:-translate-x-1/2">
                    ProductMS
                </div>
            </div>
        </>
    );
};

export default Hero;
