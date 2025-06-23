import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserControllerIns } from "../../../controller/userController/user.controller.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await UserControllerIns.logInUser(formData);
            toast.success(res.message);

            const { user, accessToken } = res.data;

            if (user.role === "admin") {
                if (!accessToken) {
                    toast.error("AccessToken not found")
                }
                localStorage.setItem("adminLoggedIn", JSON.stringify({ id: user._id, username: user.username, accessToken }));
                navigate("/admin/dashboard");
            } else {
                if (!accessToken) {
                    toast.error("AccessToken not found")
                }
                localStorage.setItem("userLoggedIn", JSON.stringify({ id: user._id, username: user.username, accessToken }));

                const redirectTo = location.state?.redirectTo;
                const productData = location.state?.productData;

                if (redirectTo && productData) {
                    navigate(redirectTo, { state: productData });
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            const errMessage = error?.response?.data?.message || "Login failed!";
            toast.error(errMessage);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-400 px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Login
                    </h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded-md transition"
                        >
                            LOGIN
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="inline-block text-gray-500 mr-1"> Not Have Account? </p>
                        <a href="/signup" className="text-blue-500  hover:underline">
                            Register Here
                        </a>
                        <br />
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
