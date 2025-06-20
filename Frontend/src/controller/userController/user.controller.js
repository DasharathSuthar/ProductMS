import axios from "axios"

class UserController {
    
    URL = "http://localhost:5000/api/v1/users/"

    async registerUser(userData){
        try {
            const response = await axios.post(`${this.URL}register`,userData,{withCredentials:true})
            return response.data
        } catch (error) {
            return error
        }
    }

    async logInUser(userData) {
        try {
            const response = await axios.post(`${this.URL}login`,userData,{withCredentials:true})

            return response.data
        } catch (error) {
            return error
        }
    }

    async getAllUsers(){
        try {
            const response = await axios.get(this.URL)
            return response.data
        } catch (error) {
            return error
        }
    }
}

export const UserControllerIns = new UserController()