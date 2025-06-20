import { useEffect, useState } from "react"
import DashboardCard from "./dashboardCard/DashboardCard"
import { ProductControllerIns } from "../../../controller/productController/Product.controller"
import { UserControllerIns } from "../../../controller/userController/user.controller"


const Dashboard = () => {

    const [productLength, setProductLength] = useState(0)
    const [usersLength, setUsersLength] = useState(0)
    
    const getProductsList = async () => {
        const products = await ProductControllerIns.getProductsList()  
        setProductLength(products.data.length)
    }
    const getUsersList = async () => {
        const users = await UserControllerIns.getAllUsers()  
        setUsersLength(users.data.length)
    }



    useEffect(()=>{
        getProductsList()
        getUsersList()
    },[])

    return (
        <>
            <div className='pb-6 text-xl uppercase text-black ' >
                <h1>Dashboard</h1>
                <hr className="border-t border-gray-600 mt-3" />
            </div>
            <div className="grid grid-cols-2 gap-6 ">
                <DashboardCard title="Total Products" value={productLength} borderColor="#3b82f6" />
                <DashboardCard title="Total Users" value={usersLength} borderColor="#10b981" />
            </div>

        </>
    )
}

export default Dashboard