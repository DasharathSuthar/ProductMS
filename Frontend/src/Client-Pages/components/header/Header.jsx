import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserControllerIns } from "../../../controller/userController/user.controller";
import { toast, ToastContainer } from "react-toastify";
import { WishListControllerIns } from "../../../controller/wishListController/wishList.controller";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [count, setCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const checkLoginStatus = () => {
        const user = JSON.parse(localStorage.getItem("userLoggedIn"));
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username);
        } else {
            setIsLoggedIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await UserControllerIns.logoutUser();
            localStorage.removeItem("userLoggedIn");
            setUsername("");
            toast.success(res.message || "Logged out successfully!");
            setIsLoggedIn(false);
            navigate("/");
        } catch (error) {
            const errMessage = error?.response?.data?.message;
            toast.error(errMessage || "Logout failed");
        }
    };

    const isAuthenticated = () => localStorage.getItem("userLoggedIn") !== null;

    const getWishList = async () => {
        if (!isAuthenticated()) return;

        try {
            const listItem = await WishListControllerIns.getWishList();
            const items = listItem?.data?.List?.items || listItem?.data?.List?.[0]?.items || [];
            setCount(items.length);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        checkLoginStatus();
        getWishList();
    }, []);

    return (
        <>
            <ToastContainer position="top-center" autoClose={2000} />
            <header className='bg-gradient-to-b from-[#111132] to-[#0c0c1d] text-white h-20'>
                <div className='container max-w-[1200px] mx-auto flex items-center justify-between h-full px-4'>
                    {/* Logo */}
                    <div className='text-2xl font-bold'>
                        <Link to="/">
                            ProductMS
                        </Link>
                        <hr className='w-24 mt-1' />
                    </div>

                    {/* Hamburger Button */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <i className={`fas fa-${menuOpen ? "times" : "bars"} text-2xl`}></i>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className={`absolute md:static top-20 left-0 w-full md:w-auto bg-[#0c0c1d] md:bg-transparent transition-all duration-300 ease-in-out z-50 ${menuOpen ? "block" : "hidden"} md:flex`}>
                        <ul className="flex flex-col md:flex-row gap-6 md:gap-5 text-lg font-semibold items-center p-5 md:p-0">
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        isActive ? "border-b border-white" : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        isActive ? "border-b border-white" : ""
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/wishList"
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        isActive ? "border-b border-white" : ""
                                    }
                                >
                                    WishList <i className="fa-solid fa-cart-shopping"></i><sup className="ml-1">{count}</sup>
                                </NavLink>
                            </li>

                            {/* Auth Links */}
                            {isLoggedIn ? (
                                <>
                                    <li className="text-white">Welcome {username}</li>
                                    <li>
                                        <button
                                            onClick={() => { handleLogout(); setMenuOpen(false); }}
                                            className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-600"
                                        >
                                            Logout <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to="/signup"
                                            onClick={() => setMenuOpen(false)}
                                            className="border border-white px-4 py-2 rounded-md hover:bg-gray-600"
                                        >
                                            Sign Up <i className="fa-solid fa-user-plus"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/login"
                                            onClick={() => setMenuOpen(false)}
                                            className="border border-white bg-white text-black px-4 py-2 rounded-md hover:bg-gray-600 hover:text-white"
                                        >
                                            Log In <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
