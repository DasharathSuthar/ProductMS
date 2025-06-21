import React, { useEffect, useState } from 'react'
import { UserControllerIns } from '../../../controller/userController/user.controller'

const Users = () => {
  const [usersList, setUsersList] = useState([])

  const getUsersList = async () => {
    const users = await UserControllerIns.getAllUsers()
    setUsersList(users.data)
  }

  useEffect(() => {
    getUsersList()
  }, [])

  return (
    <>
      <div className='pb-6 text-xl uppercase text-black'>
        <h1>Users List</h1>
        <hr className="border-t border-gray-600 mt-3" />
      </div>

      <div className="overflow-x-auto">
        <table className='min-w-full text-left border border-black'>
          <thead className="bg-gray-200">
            <tr className='[&>*]:p-2'>
              <th className='border border-black'>No.</th>
              <th className='border border-black'>ID</th>
              <th className='border border-black'>Username</th>
              <th className='border border-black'>Full Name</th>
              <th className='border border-black'>Email</th>
              <th className='border border-black'>Role</th>
            </tr>
          </thead>
          <tbody>
            {(usersList || []).map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className='border border-black p-2'>{index + 1}</td>
                <td className='border border-black p-2 break-words'>{item._id}</td>
                <td className='border border-black p-2 break-words'>{item.username}</td>
                <td className='border border-black p-2 break-words'>{item.fullName}</td>
                <td className='border border-black p-2 break-words'>{item.email}</td>
                <td className='border border-black p-2 break-words'>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Users
