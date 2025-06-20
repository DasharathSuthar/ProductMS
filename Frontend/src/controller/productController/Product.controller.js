import axios from 'axios'

class ProductController {
    URL = "http://localhost:5000/api/v1/products/"

    async getProductsList() {
        try {
            const response = await axios.get(this.URL)

            return response.data
        } catch (error) {
            return error
        }
    }

    async addProduct(productData) {
        try {
            const response = await axios.post(this.URL, productData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            console.log(response.data);
            return response.data

        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const response = await axios.get(`${this.URL}${id}`)
            return response.data
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, updatedData) {
        try {
            const response = await axios.put(`${this.URL}${id}`, updatedData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id){
        try {
            const response = await axios.delete(`${this.URL}${id}`,{withCredentials:true})
            return response.data
        } catch (error) {
            return error
        }
    }
}

export const ProductControllerIns = new ProductController()