import React, { useEffect, useState } from 'react';
import { WishListControllerIns } from '../../../controller/wishListController/wishList.controller';
import ProductCard from '../products/productCard/ProductCard';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const WishList = () => {
    const [wishList, setWishList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    const isAuthenticated = () => localStorage.getItem("userLoggedIn") !== null;

    const getWishList = async () => {
        const authStatus = isAuthenticated();
        setIsAuth(authStatus);

        if (!authStatus) {
            setWishList([]);
            setLoading(false);
            return;
        }

        try {
            const listItem = await WishListControllerIns.getWishList();
            const items = listItem?.data?.List?.items || listItem?.data?.List?.[0]?.items || [];
            setWishList(items);
        } catch (err) {
            setError("empty wishlist.");
        } finally {
            setLoading(false);
        }
    };

    const removeWishItem = async (id) => {
        try {
            const res = await WishListControllerIns.removeWishItem(id);
            toast.success(res.message);
            getWishList();
        } catch (error) {
            const errMessage = error?.response?.data?.message;
            toast.error(errMessage);
        }
    };

    useEffect(() => {
        getWishList();
    }, []);

    return (
        <div className='w-full py-20 bg-gradient-to-b from-[#0c0c1d] to-[#111132] min-h-screen'>
            <div className='max-w-[1000px] mx-auto px-4'>
                <div className='text-white font-semibold border-b border-white mb-6 pb-2 text-2xl capitalize'>
                    <h1>Your Wishlist Products</h1>
                </div>

                {loading ? (
                    <p className='text-white text-center'>Loading...</p>
                ) : !isAuth ? (
                    <p className='text-gray-400 text-center'>Please log in to view your wishlist.</p>
                ) : error ? (
                    <p className='text-red-400 text-center'>{error}</p>
                ) : wishList.length === 0 ? (
                    <p className='text-gray-400 text-center'>Your wishlist is empty.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                        {wishList.map((item) => (
                            <ProductCard
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                img={item.img}
                                price={item.price}
                                description={item.des}
                                removebtn={"Remove"}
                                handleRemove={removeWishItem}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;
