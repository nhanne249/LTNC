import { transport } from "../../config/http/transport";

const admin = {

    getAllUserByAdmin: (data) => {
        return transport.get(
            `/all/users`, JSON.stringify(data)
        )
    },
    getStudentById: (data) => {
        return transport.get(
            `/${data.username}`, JSON.stringify(data)
        )
    },
    createNewStudent: (data) => {
        return transport.post(
            `/student`, JSON.stringify(data)
        )
    },
    createNewTeacher: (data) => {
        return transport.post(
            `/teacher`, JSON.stringify(data)
        )
    },
    deleteUserById: (data) => {
        return transport.delete(
            `/all/users`, JSON.stringify(data)
        )
    },
    createNewCourse: (data) => {
        return transport.post(
            `/teacher`, JSON.stringify(data)
        )
    },
    deleteCourse: (data) => {
        return transport.post(
            `/courses/${courseId}`, JSON.stringify(data)
        )
    },
    createNewClass: (data) => {
        return transport.post(
            `/class`, JSON.stringify(data)
        )
    },
}
export default admin;