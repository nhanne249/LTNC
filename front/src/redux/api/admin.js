import { transport } from "../../config/http/transport";

const admin = {

    getAllUser: (data) => {
        return transport.get(
            `/users`, JSON.stringify(data)
        )
    },
    getUser: (data) => {
        return transport.get(
            `/users/${data.username}`, JSON.stringify(data)
        )
    },
    getAllStudents: (data) => {
        return transport.get(
            `/students`, JSON.stringify(data)
        )
    },
    getAllTeachers: (data) => {
        return transport.get(
            `/teachers`, JSON.stringify(data)
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
    deleteUser: (data) => {
        return transport.delete(
            `/users/${data.username}`, JSON.stringify(data)
        )
    },  
    createNewClass: (data) => {
        return transport.post(
            `/class`, JSON.stringify(data)
        )
    },
    getClass: (data) => {
        return transport.get(
            `/classes`, JSON.stringify(data)
        )
    },
}
export default admin;