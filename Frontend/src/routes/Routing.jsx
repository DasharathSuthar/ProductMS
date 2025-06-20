
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../Client-Pages/components/home/Home'
import MasterPageClient from '../Client-Pages/components/masterPage/MasterPage'
import Products from '../Client-Pages/components/products/Products'

import MasterPageAdmin from '../Admin-Pages/components/adminMaster/MasterPage'
import Dashboard from '../Admin-Pages/components/dashboard/Dashboard'
import ProductsList from '../Admin-Pages/components/productList/ProductsList'
import Users from '../Admin-Pages/components/users/Users'
import Login from '../Admin-Pages/components/loginPage/LoginPage'
import RequireAdminAuth from '../Admin-Pages/components/adminAuth/AdminAuth'
import SignUpPage from '../Client-Pages/components/signUp/SignUpPage'
import { SingleProduct } from '../Client-Pages/components/products/singleProduct/SingleProduct'

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MasterPageClient />} >
                        <Route index element={<Home />} />
                        <Route path='' element={<Home />} />
                        <Route path='products' element={<Products />} />
                        <Route path='singleProduct' element={<SingleProduct />} />
                    </Route>
                    {/* client routes */}
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/login' element={<Login />} />
                    {/* Admin routes */}
                    <Route path='/admin' element={<RequireAdminAuth />}>
                        <Route element={<MasterPageAdmin />}>
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

export default Routing