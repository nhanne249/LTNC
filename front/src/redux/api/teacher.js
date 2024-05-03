import { transport } from "../../config/http/transport";
import Cookies from "js-cookie";

const teacher = {
    getTeacherInfo: () => {
        return transport.get(
            `/teacher/info`, JSON.stringify()
        )
    },
    updateTeacherInfo: (data) => {
        return transport.put(
            `/teacher/info`, JSON.stringify(data)
        )
    },
    getAllClass: () => {
        return transport.get(
            `/teacher/classes`, JSON.stringify()
        )
    },
    getClass: (data) => {
        return transport.get(`/classes/${data.name}/students?page=${data.page}`)
    },
    giveScoreAllClass: (data) => {
        return transport.post(`/${data.classname}/scores`)
    },
    giveScoreForStudent: (data) => { 
        return transport.put(`/teacher/scores/${data.username}`, data.dataInBody)
    },
    updateTeacherPassword: (data) => {
        return transport.put(
            `/teacher/${data.username}`, JSON.stringify(data.password)
        )
    },
}
export default teacher;