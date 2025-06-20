import { Link, useNavigate } from 'react-router-dom'
import { UserControllerIns } from '../../../controller/userController/user.controller';
import { useState } from 'react';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        role: ""
    });

    // Handle input change
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await UserControllerIns.registerUser(userData).then(res => {
            alert(res.message)
            setUserData({
                fullName: "",
                email: "",
                username: "",
                password: "",
                role: ""
            });
            if (res.statusCode === 200) {
                navigate('/login')
            }

        })

    };


    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-400">
                <div className="bg-gray-200 rounded-lg p-8 w-[500px] shadow-lg border-2">
                    <h2 className="text-3xl font-bold text-center text-black mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="fullName" placeholder="Full Name" value={userData.fullName} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none " required />
                            <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none " required />
                            <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none " required />
                            <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none " required />
                            <select type="text" name="role" value={userData.role} onChange={handleChange} className="w-full border  border-black rounded-md p-2 focus:outline-none ">
                                <option value="">Select Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-gray-600 text-white font-semibold py-2 rounded-md mt-6 duration-500 hover:bg-gray-700 ">
                            Sign Up
                        </button>
                        <div className="text-center my-4">
                            Already have a account?
                            <Link to="/login" className="text-sm text-blue-600 hover:underline">
                                Login here!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUpPage