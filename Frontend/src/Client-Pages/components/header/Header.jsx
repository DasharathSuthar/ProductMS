import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom"

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    const checkLoginStatus = () => {
        const user = JSON.parse(localStorage.getItem("userLoggedIn"));
        if (user) {

            setIsLoggedIn(true);
            setUsername(user.username);
        } else {
            setIsLoggedIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        setUsername("")
        alert("Logged out successfully!");
        setIsLoggedIn(false);
        navigate("/");
        // window.dispatchEvent(new Event("storage")); // Notify other tabs/components
    };
    useEffect(() => {
        checkLoginStatus()
    }, [])


    return (
        <>
            <header className='bg-gray-700 w-full text-white h-20 '>
                <div className='conatiner w-[1000px] h-full m-auto flex justify-between items-center px-2'>
                    <div className='logo text-2xl font-semibold  '>
                        <Link to="/" >
                            <h2>ProductMS</h2>
                        </Link>
                        <hr className='w-32 mt-2' />
                    </div>
                    <div className="links">
                        <ul className="flex items-center justify-between gap-5 text-lg font-semibold">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "border-white border-b " : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    className={({ isActive }) =>
                                        isActive ? "border-white border-b " : ""
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/wishList"
                                    className={({ isActive }) =>
                                        isActive ? "border-white border-b " : ""
                                    }
                                >
                                    WishList <i className="fa-solid fa-cart-shopping"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex space-x-4 items-center">
                            {isLoggedIn ? (
                                <>
                                    <li className="flex items-center shadow-sm">
                                        <span className="text-lg font-semibold  text-white">Welcome {username} </span>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                                        >
                                            Logout <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            className="border border-white text-white px-4 py-2 rounded-md hover:bg-gray-600 hover:text-white transition"
                                            to="/signup"
                                        >
                                            Sign Up <i className="fa-solid fa-user-plus"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="border border-white bg-white text-black px-4 py-2 rounded-md hover:bg-gray-600 hover:text-white transition"
                                            to="/login"
                                        >
                                            Log In <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header