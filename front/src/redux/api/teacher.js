import { transport } from "../../config/http/transport";
import Cookies from "js-cookie";

const teacher = {
    getTeacherInfo: () => {
        const username = Cookies.get('username');
        return transport.get(
            `/teachers/${username}`, JSON.stringify()
        )
    },
    updateTeacherInfo: (data) => {
        const username = Cookies.get('username');
        return transport.put(
            `/teachers/${username}`, JSON.stringify(data)
        )
    },
    getAllClass: () => {
        const username = Cookies.get('username');
        return transport.get(
            `/teachers/${username}/classes`, JSON.stringify()
        )
    },
    getClass: (data) => {
        return transport.get(`/classes/${data.name}/students?page=${data.page}`)
    }
}
export default teacher;