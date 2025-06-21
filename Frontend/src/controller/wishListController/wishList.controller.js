import axios from 'axios'

class WishListController {
    URL = "https://productms.onrender.com/api/v1/wishLists/"

    async addWishItem(item) {
        try {
            const response = await axios.post(this.URL, item, { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }

    async getWishList(){
        try {
            const response = await axios.get(this.URL,{withCredentials:true})
            return response.data
        } catch (error) {
            throw error
        }
    }

    async removeWishItem(id){
        try {
            const response = await axios.delete(`${this.URL}${id}`,{withCredentials:true})
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export const WishListControllerIns = new WishListController()