import { transport } from "../../config/http/transport";
import Cookies from "js-cookie";
import axios from 'axios';

const resources = {
    putAvatar: (data) => {
        return transport.put(
            `/avatar`, data
        )
    },
    getAvatar: () => {
        return axios
      .get("https://ltnc-production.up.railway.app/avatar", {
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
        return transport.put(
            `/faculties/${data.faculty}`, data.subject
        )
    },
    deleteSubject: (data) => {
        return transport.put(
            `/faculties/${data}`,
        )
    },
    deleteFaculty: (data) => {
        return transport.delete(
            `/faculties/${data}`,
        )
    },
    getAllClassResource: (data) => {
        return transport.get(`resources/${data}/all`)
    },
    deleteResource: (data) => {
        return transport.delete(`/resources/${data.class}/${data.name}`)
    }
}
export default resources;