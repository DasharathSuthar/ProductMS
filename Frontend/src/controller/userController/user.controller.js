import axios from "axios"

class UserController {
    
    URL = "http://localhost:5000/api/v1/users/login"

    async logInUser(userData) {
        try {
            const response = await axios.post(this.URL,userData,{withCredentials:true})
            console.log(response.data);
            return response.data
        } catch (error) {
            return error
        }
    }
}

export const UserControllerIns = new UserController()