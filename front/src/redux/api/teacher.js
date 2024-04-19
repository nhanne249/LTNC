import { transport } from "../../config/http/transport";
import Cookies from "js-cookie";

const username = Cookies.get('username');
const teacher = {
    getTeacherInfo: () => {
        return transport.get(
            `/teachers/${username}`, JSON.stringify()
        )
    },
    updateTeacherInfo: (data) => {
        return transport.put(
            `/teachers/${username}`, JSON.stringify(data)
        )
    },
    getAllClass: () => {
        return transport.get(
            `/teachers/${username}/classes`, JSON.stringify()
        )
    },
}
export default teacher;