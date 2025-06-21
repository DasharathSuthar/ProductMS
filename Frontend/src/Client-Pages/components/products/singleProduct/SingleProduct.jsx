import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WishListControllerIns } from '../../../../controller/wishListController/wishList.controller.js';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const SingleProduct = () => {
    const location = useLocation();
    const { name, img, description, price, id } = location.state || {};
    const navigate = useNavigate();

    const isAuthenticated = () => localStorage.getItem("userLoggedIn") !== null;

    const addToWishList = async () => {
        if (!isAuthenticated()) {
            const confirm = window.confirm("To make wishList or cart item? Login first!");
            if (!confirm) return;

            navigate("/login", {
                state: {
                    redirectTo: "/singleproduct",
                    productData: { name, img, description, price, id }
                }
            });
            return;
        }

        try {
            const res = await WishListControllerIns.addWishItem({ productId: id });
            toast.success(res.message);
        } catch (error) {
            const errMessage = error?.response?.data?.message;
            toast.error(errMessage || "Failed to add to wishlist");
        }
    };

    return (
        <>
            <div className='py-10 bg-gradient-to-b from-[#0c0c1d] to-[#111132] min-h-screen'>
                <div className='max-w-[1000px] mx-auto px-4'>
                    <div className='flex flex-col md:flex-row shadow-md shadow-white bg-gradient-to-b from-[#0c0c1d] to-[#111132] rounded-lg gap-6 p-4'>
                        {/* Product Image */}
                        <div className='w-full md:w-1/2 flex justify-center items-center border border-gray-700 rounded-lg'>
                            <img
                                className='rounded-md w-full h-auto max-h-[400px] object-cover border border-white'
                                src={img}
                                alt={name}
                            />
                        </div>

                        {/* Product Details */}
                        <div className='w-full md:w-1/2 text-white capitalize flex flex-col justify-between gap-4'>
                            <h1 className='text-2xl sm:text-3xl font-semibold'>{name}</h1>
                            <h3 className='text-lg sm:text-xl font-semibold'>Price: {price} &#8377;</h3>
                            <p className='text-sm sm:text-base'>
                                <span className='font-semibold'>Description:</span> {description}
                            </p>
                            <button
                                onClick={addToWishList}
                                className='mt-4 bg-gray-700 hover:bg-gray-600 text-white text-base sm:text-lg font-semibold py-3 px-6 rounded-md w-fit'
                            >
                                Add to Wishlist <i className="fa-solid fa-cart-arrow-down ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;
