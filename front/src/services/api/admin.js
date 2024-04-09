import { transport } from "../../config/http/transport";
import axios from "axios";

const admin = {

    getAdmin: (data) => {
        return transport.get(
            `/all`, JSON.stringify(data)
        )
    },
}
export default admin;