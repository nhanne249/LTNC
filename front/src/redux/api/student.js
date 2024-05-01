import { transport } from "../../config/http/transport";

const student = {
    getStudentInfo: () => {
        return transport.get(
            `/student/info`, JSON.stringify()
        )
    },
    getAllClasses: () => {
        return transport.get(
            `/student/classes`, JSON.stringify()
        )
    },
    updateStudent: (data) => {
        return transport.put(
            `/student/info`, JSON.stringify(data)
        )
    },
    enrollClass: (data) => {
        return transport.put(
            `/student/${data}/enroll`, JSON.stringify()
        )
    },
    unenrollClass: (data) => {
        return transport.put(
            `/student/${data}/unenroll`, JSON.stringify()
        )
    },
    instructorEvaluation: (data) => {
        return transport.post(`student/rate`, JSON.stringify(data))
    }
}
export default student;