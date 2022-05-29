import axios from "axios";
export default class Order {
    static post(data){
        return  axios.post('/api/order', data).then(response=>response.data)
    }
    static get(params) {
        return axios.get('/api/order', {params}).then(response => response.data)
    }
    static patch(data,id){
        return  axios.patch('/api/order/'+id, data).then(response=>response.data)
    }
    static getById(id){
        return axios.get('/api/order/'+id).then(response => response.data)
    }
}

