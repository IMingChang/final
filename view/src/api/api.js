import axios from "axios";

const BaseUrl = "http://localhost:5104/api/";
const options = {
    headers: { "content-type": "application/json" }
}
export default function api(endPoint) {
    let url = BaseUrl + endPoint;
    return {
        read: () => axios.get(url),
        readId: id => axios.get(url + id),
        create: newValue => axios.post(url, newValue, options),
        updata: (id, updataValue) => axios.put(url + id, updataValue),
        updata2: newValue => axios.put(url, newValue, options),
        countUpdata: ()=> axios.put(url),
        delete: id => axios.delete(url + id)
    }
}