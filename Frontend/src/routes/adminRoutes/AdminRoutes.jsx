import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MasterPage from '../../Admin-Pages/components/adminMaster/MasterPage'
import Dashboard from '../../Admin-Pages/components/dashboard/Dashboard'
import ProductsList from '../../Admin-Pages/components/productList/ProductsList'
import Users from '../../Admin-Pages/components/users/Users'
import Login from '../../Admin-Pages/components/loginPage/LoginPage'
import RequireAdminAuth from '../../Admin-Pages/components/adminAuth/AdminAuth'


const AdminRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />

                    <Route path='/admin' element={<RequireAdminAuth />}>
                        <Route element={<MasterPage />}>
                            <Route index element={<Dashboard />} />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='productList' element={<ProductsList />} />
                            <Route path='users' element={<Users />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AdminRoutes