import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserControllerIns } from "../../../controller/userController/user.controller.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })


    const navigate = useNavigate();
    const location = useLocation()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await UserControllerIns.logInUser(formData)
            toast.success(res.message)
            if (res.data.user.role === "admin") {
                localStorage.setItem("adminLoggedIn", "true")
                navigate("/admin/dashboard")
            }
            else {
                localStorage.setItem("userLoggedIn", JSON.stringify({ id: res.data.user._id, username: res.data.user.username }))
                navigate("/")
                const redirectTo = location.state?.redirectTo;
                const productData = location.state?.productData;

                if (redirectTo && productData) {
                    navigate(redirectTo, { state: productData });
                } else {
                    navigate("/");
                }
            }

        } catch (error) {
            const errMessage = error?.response?.data?.message
            toast.error(errMessage)
        }




    };


    return (
        <>
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-gray-400">
                <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Login
                    </h2>
                    <form onSubmit={handleLogin}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"

                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"

                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
                        >
                            LOGIN
                        </button>
                    </form>

                    {/* Back to Home */}
                    <div className="mt-4 text-center">
                        <a href="/" className="text-gray-500 hover:underline">
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;