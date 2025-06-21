import React, { useEffect, useState } from 'react'
import { WishListControllerIns } from '../../../controller/wishListController/wishList.controller'
import ProductCard from '../products/productCard/ProductCard'
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const WishList = () => {

    const [wishList, setWishList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false)

    const isAuthenticated = () => localStorage.getItem("userLoggedIn") !== null;

    const getWishList = async () => {
        const authStatus = isAuthenticated()
        setIsAuth(authStatus)

        if (!authStatus) {
            setWishList([])
            setLoading(false)
            return
        }

        try {
            const listItem = await WishListControllerIns.getWishList()
            const items = listItem?.data?.List?.items || listItem?.data?.List?.[0]?.items || []
            setWishList(items)
        } catch (err) {
            setError("wish list is empty.")
        } finally {
            setLoading(false)
        }
    }

    const removeWishItem = async (id) => {
        try {
            const res = await WishListControllerIns.removeWishItem(id)
            toast.success(res.message)
            getWishList()
        } catch (error) {
            const errMessage = error?.response?.data?.message
            toast.error(errMessage)
        }
    }

    useEffect(() => {

        getWishList()

    }, [])

    return (
        <>
            <div className='w-full py-20  bg-gradient-to-b from-[#0c0c1d] to-[#111132]'>
                <div className='max-w-[1000px] h-full  mx-auto '>
                    <div className='text-white font-semibold border-b mb-6 border-white pb-2 text-2xl capitalize'>
                        <h1>Your WishList Products</h1>
                    </div>
                    {loading ? (
                        <p className='text-white'>Loading...</p>
                    ) : !isAuth ? (
                        <p className='text-gray-400'>Please log in to view your wishlist.</p>
                    ) : error ? (
                        <p className='text-red-400'>{error}</p>
                    ) : wishList.length === 0 ? (
                        <p className='text-gray-400'>Your wishlist is empty.</p>
                    ) : (
                        <div className='flex items-center flex-wrap gap-2'>
                            {wishList.map((item) => (
                                <div key={item._id} className='flex justify-center items-center flex-col'>
                                    <ProductCard
                                        id={item._id}
                                        name={item.name}
                                        img={item.img}
                                        price={item.price}
                                        description={item.des}
                                        removebtn={"Remove"}
                                        handleRemove={removeWishItem}
                                    />

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default WishList