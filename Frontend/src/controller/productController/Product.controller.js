import axios from 'axios'

class ProductController {
    URL = "https://productms.onrender.com/api/v1/products/"

    async getProductsList() {
        try {
            const response = await axios.get(this.URL)

            return response.data
        } catch (error) {
            throw error
        }
    }

    async addProduct(productData) {
        try {
            const response = await axios.post(this.URL, productData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            return response.data

        } catch (error) {
            throw error
        }
    }

    async getProductById(id) {
        try {
            const response = await axios.get(`${this.URL}${id}`)
            return response.data
        } catch (error) {
            throw error
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
            throw error
        }
    }

    async updateProductImage(id, updatedImage) {
        try {
            const response = await axios.put(`${this.URL}updateImage/${id}`, updatedImage, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            console.log(response);
            
            return response.data
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const response = await axios.delete(`${this.URL}${id}`, { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export const ProductControllerIns = new ProductController()