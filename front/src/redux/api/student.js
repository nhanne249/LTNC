import { transport } from "../../config/http/transport";
import Cookies from "js-cookie";

const username = Cookies.get('username');
const student = {
    getStudentInfo: () => {
        return transport.get(
            `/students/${username}`, JSON.stringify()
        )
    },
    getAllClasses: () => {
        return transport.get(
            `/students/${username}/classes`, JSON.stringify()
        )
    },
    updateStudent: (data) => {
        return transport.put(
            `/students/${username}`, JSON.stringify(data)
        )
    },
    enrollClass: (data) => {
        return transport.put(
            `/students/${username}/enroll/${data}`, JSON.stringify()
        )
    },
    unenrollClass: (data) => {
        return transport.put(
            `/students/${username}/unenroll/${data}`, JSON.stringify()
        )
    },
}
export default student;