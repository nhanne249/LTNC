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
    facultiesList: (data) => {
        return transport.get(
            `/faculties`, JSON.stringify(data)
        )
  },
    createFaculty: (data) => {
        return transport.post(
            `/faculties`, JSON.stringify(data)
        )
  },
    createSubject: (data) => {
        console.log(data)
        return transport.put(
            `/faculties/${data.faculty}`, data.subject.replace(/['"]/g, '')
        )
    },
    deleteSubject: (data) => {
        return transport.put(
            `/faculties/${data}`,
        )
    },

}
export default resources;