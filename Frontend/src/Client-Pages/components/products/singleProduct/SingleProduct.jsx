import React from 'react'
import { useLocation } from 'react-router-dom'

export const SingleProduct = () => {
    const location = useLocation()
    const { name, img, description, price } = location.state || {}

    return (
        <>
            <div className=' py-10 bg-gradient-to-b from-[#111132] to-[#0c0c1d] h-[100vh]'>
                <div className='max-w-[1000px] mx-auto h-full'>
                    <div className='box flex items-center bg-gray-800 p-2 rounded-lg h-[500px] gap-3'>
                        <div className='h-[450px] p-3 border rounded-lg flex items-center justify-center border-gray-700'>
                            <img className='rounded-md h-[400px] w-full border border-white object-cover ' src={img} alt="" />
                        </div>
                        <div className='p-2 flex w-1/2 h-[300px] justify-between text-white  capitalize flex-col'>
                            <h1 className='font-semibold text-3xl'>{name} </h1>
                            <h3 className='text-xl font-semibold'>Price : {price} &#8377;</h3>
                            <p><span className='text-xl font-semibold'>Description</span> : {description} </p>
                            <button className='bg-gray-700 text-white text-lg font-semibold p-4 rounded-md w-48'>Cart +</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
