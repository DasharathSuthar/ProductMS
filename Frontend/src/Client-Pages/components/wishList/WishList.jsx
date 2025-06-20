import React, { useEffect, useState } from 'react'
import { WishListControllerIns } from '../../../controller/wishListController/wishList.controller'
import ProductCard from '../products/productCard/ProductCard'

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
            setError("Failed to fetch wishlist.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        getWishList()

    }, [])

    return (
        <>
            <div className='w-full py-20  bg-gradient-to-b from-[#111132] to-[#0c0c1d]'>
                <div className='max-w-[1000px]  mx-auto '>
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
                                <div key={item._id}>
                                    <ProductCard
                                        name={item.name}
                                        img={item.img}
                                        price={item.price}
                                        description={item.des}
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