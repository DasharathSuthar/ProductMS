import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
const Header = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
        setIsAdminLoggedIn(isLoggedIn);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminLoggedIn");
        setIsAdminLoggedIn(false);
        toast.success("Logout successfully. ")
        navigate("/");
    };

    return (
        <>
        <ToastContainer position="top-center" autoClose={2000} />
            <header className='h-[87px] bg-gray-600 px-3 flex justify-end items-center '>
                <div className="container flex justify-between items-center max-w-[1000px] mx-auto">
                    <div className="font-semibold text-white text-2xl">
                        <h1>ProductMS</h1>
                        <hr className="border-white" />
                    </div>
                    <div className="row flex justify-end items-center py-3 gap-4">
                        {isAdminLoggedIn && (
                            <>
                                <div className="admin-logo h-10 w-10 flex items-center border-white">
                                    <img src="/AdminLogo.jpg" alt="" className='rounded-full border text-center' />
                                </div>
                                <h1 className='font-bold text-white uppercase'>Admin</h1>
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
