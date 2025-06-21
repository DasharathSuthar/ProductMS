import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { WishListControllerIns } from '../../../../controller/wishListController/wishList.controller.js'

 const SingleProduct = () => {
    const location = useLocation()
    const { name, img, description, price, id } = location.state || {}
    const navigate = useNavigate()
    const isAuthenticated = () => localStorage.getItem("userLoggedIn") !== null;

    const addToWishList = async () => {
        if (!isAuthenticated()) {
            const confirm = window.confirm("To make wishList or cart item ? Login first!")
            if (!confirm) {
                return
            }
            navigate("/login", {
                state: {
                    redirectTo: "/singleproduct",
                    productData: { name, img, description, price, id }
                }
            });
            return;
        }

        await WishListControllerIns.addWishItem({ productId: id }).then(res => {
            alert(res.message)
        })

    }

    return (
        <>
            <div className=' py-10 bg-gradient-to-b from-[#0c0c1d] to-[#111132] h-[100vh]'>
                <div className='max-w-[1000px] mx-auto h-full'>
                    <div className='box flex shadow-sm shadow-white items-center bg-gradient-to-b from-[#0c0c1d] to-[#111132] p-2 rounded-lg h-[500px] gap-3'>
                        <div className='h-[450px] p-3 border rounded-lg flex items-center justify-center border-gray-700'>
                            <img className='rounded-md h-[400px] w-full border border-white object-cover ' src={img} alt="" />
                        </div>
                        <div className='p-2 flex w-1/2 h-[300px] justify-between text-white  capitalize flex-col'>
                            <h1 className='font-semibold text-3xl'>{name} </h1>
                            <h3 className='text-xl font-semibold'>Price : {price} &#8377;</h3>
                            <p><span className='text-xl font-semibold'>Description</span> : {description} </p>
                            <button className='bg-gray-700 text-white text-lg font-semibold p-4 rounded-md w-48'
                                onClick={addToWishList}
                            >WishList <i className="fa-solid fa-cart-arrow-down"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct