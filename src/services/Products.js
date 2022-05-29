import axios from "axios";

export default class Products {
    static get() {
        return axios.get('/api/product').then(response => response.data)
    }
    static update(id, count) {
        return axios.put('/api/product/' + id + '/reduceCount/' + count).then(response => response.data)
    }
}
