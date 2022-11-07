import axios from "axios";

export default class Combos {
    static get() {
        return axios.get('/api/combo').then(response => response.data)
    }
}
