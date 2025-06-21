import { Link, useNavigate } from 'react-router-dom';
import { UserControllerIns } from '../../../controller/userController/user.controller';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await UserControllerIns.registerUser(userData);
            toast.success(res.message);

            setUserData({
                fullName: "",
                email: "",
                username: "",
                password: "",
                role: ""
            });

            if (res.statusCode === 200) {
                navigate('/login');
            }
        } catch (error) {
            setUserData({
                fullName: "",
                email: "",
                username: "",
                password: "",
                role: ""
            });
            const errMessage = error?.response?.data?.message;
            toast.error(errMessage || "Signup failed");
        }
    };

    return (
        <>
            <ToastContainer position='top-center' autoClose={3000} />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-400 px-4">
                <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg border-2 border-gray-300">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={userData.fullName}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={userData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            required
                        />
                        <select
                            name="role"
                            value={userData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded-md transition"
                        >
                            Sign Up
                        </button>

                        <div className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?
                            <Link to="/login" className="ml-1 text-blue-600 hover:underline">
                                Login here!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
