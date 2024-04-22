import { transport } from "../../config/http/transport";
import Cookies from "js-cookie";
import axios from 'axios';

const resources = {
    putAvatar: (data) => {
        return transport.put(
            `/avatar`, data
        )
    },
    getAvatar: (data) => {
        return axios
      .get("http://localhost:8081/avatar", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${Cookies.get("userPresent")}`,
        },
      })
    },
}
export default resources;