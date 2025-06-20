import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../Client-Pages/components/home/Home'
import MasterPage from '../../Client-Pages/components/masterPage/MasterPage'
import Login from '../../Admin-Pages/components/loginPage/LoginPage'

const ClientRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<MasterPage />} >
                        <Route index element={<Home />} />
                        <Route path='' element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default ClientRoutes