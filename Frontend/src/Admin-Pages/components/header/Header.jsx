import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserControllerIns } from "../../../controller/userController/user.controller";

const Header = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const[adminname,setAdminname] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
       const admin = JSON.parse(localStorage.getItem("adminLoggedIn"));
        if (admin) {
            if (admin.accessToken) {
                setIsAdminLoggedIn(true);
                setAdminname(admin.username);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const res = await UserControllerIns.logoutUser();
            localStorage.removeItem("adminLoggedIn");
            setIsAdminLoggedIn(false);
            toast.success(res.message || "Logout successful.");
            navigate("/");
        } catch (error) {
            const errMessage = error?.response?.data?.message;
            toast.error(errMessage || "Logout failed.");
        }
    };

    return (
        <>
            <ToastContainer position="top-center" autoClose={2000} />
            <header className="bg-gray-700   text-white pl-16 pr-4 py-7 shadow-md">
                <div className="max-w-[1000px] mx-auto flex flex-wrap justify-between items-center gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">ProductMS</h1>
                        <hr className="w-24 border-white mt-1" />
                    </div>

                    {isAdminLoggedIn && (
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="h-10 w-10">
                                <img
                                    src="/AdminLogo.jpg"
                                    alt="Admin"
                                    className="rounded-full border border-white w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-lg font-semibold ">{adminname}</h2>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-800 transition px-4 py-2 rounded-md font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
