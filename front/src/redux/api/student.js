import { transport } from "../../config/http/transport";
import Cookies from "js-cookie";

const student = {
    getStudentInfo: () => {
        const username = Cookies.get('username');
        return transport.get(
            `/students/${username}`, JSON.stringify()
        )
    },
    getAllClasses: () => {
        const username = Cookies.get('username');
        return transport.get(
            `/students/${username}/classes`, JSON.stringify()
        )
    },
    updateStudent: (data) => {
        const username = Cookies.get('username');
        return transport.put(
            `/students/${username}`, JSON.stringify(data)
        )
    },
    enrollClass: (data) => {
        const username = Cookies.get('username');
        return transport.put(
            `/students/${username}/classes/${data}/enroll`, JSON.stringify()
        )
    },
    unenrollClass: (data) => {
        const username = Cookies.get('username');
        return transport.put(
            `/students/${username}/classes/${data}/enroll`, JSON.stringify()
        )
    },
}
export default student;