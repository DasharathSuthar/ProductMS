import axios from 'axios'

class WishListController {
    URL = "http://localhost:5000/api/v1/wishLists/"

    async addWishItem(item) {
        try {
            const response = await axios.post(this.URL, item, { withCredentials: true })
            return response.data
        } catch (error) {
            return error
        }
    }

    async getWishList(){
        try {
            const response = await axios.get(this.URL,{withCredentials:true})
            return response.data
        } catch (error) {
            return error
        }
    }

    async removeWishItem(id){
        try {
            const response = await axios.delete(`${this.URL}${id}`,{withCredentials:true})
            return response.data
        } catch (error) {
            return error
        }
    }
}

export const WishListControllerIns = new WishListController()