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
    updateStudentInfo: (data) => {
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
        return transport.put(`student/rate`, JSON.stringify(data))
    },
    deleteReviews: (data) => {
        return transport.post(`student/rate/${data}`)
    },
    updateStudentPassword: (data) => {
        return transport.put(
            `/student/${data.username}`, JSON.stringify(data.password)
        )
    }
}
export default student;