import Axios from "../../axios";

export function addCampFormdata(data) {
    return Axios.post('/customer/form', data)
}