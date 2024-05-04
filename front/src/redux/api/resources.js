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
    },
    getResource: (data) => {
        fetch(`https://ltnc-production.up.railway.app/resources/${data.class}/${data.name}`, {
            method: 'GET',
            headers: {
                Accept: 'application/octet-stream',
                Authorization: `Bearer ${Cookies.get("userPresent")}`,
            },
            responseType: 'arraybuffer',
            })
            .then((res) => res.arrayBuffer())
            .then((data) => {
                const base64Str = Buffer.from(data).toString('base64');
                let pdfWindow = window.open("");
                pdfWindow.document.write(
                    "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
                        encodeURI(base64Str) + "'></iframe>"
                );
            });
    }
}
export default resources;