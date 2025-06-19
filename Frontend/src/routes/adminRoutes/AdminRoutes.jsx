import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MasterPage from '../../Admin-Pages/components/adminMaster/MasterPage'
import Dashboard from '../../Admin-Pages/components/dashboard/Dashboard'


const AdminRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/admin' element={<MasterPage />}>
                        <Route index element={<Dashboard />} />
                        <Route path='dashboard' element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AdminRoutes