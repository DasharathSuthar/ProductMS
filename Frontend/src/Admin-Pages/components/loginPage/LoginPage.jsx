import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserControllerIns } from "../../../controller/userController/user.controller.js";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })


    const navigate = useNavigate(); // React Router navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        const loggedInUser = await UserControllerIns.logInUser(formData).then(res => {
            alert(res.message)
            if (res.data.user.role === "admin") {
                localStorage.setItem("adminLoggedIn", "true")
                navigate("/admin/dashboard")
            }
            else {
                navigate("/home")
            }
        })
        console.log(loggedInUser);
       
    };


    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Admin | Sign in
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        LOGIN
                    </button>
                </form>

                {/* Back to Home */}
                <div className="mt-4 text-center">
                    <a href="/" className="text-blue-500 hover:underline">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;