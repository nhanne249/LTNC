import { transport } from "../../config/http/transport";
import axios from "axios";

const url2 ='/login';
const authentication = {
    login: (data) => {
        return transport.post(`${url2}`, JSON.stringify(data));
    },
}
export default authentication;