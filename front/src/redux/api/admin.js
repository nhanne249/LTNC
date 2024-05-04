import { transport } from "../../config/http/transport";

const admin = {

    getAllUser: (data) => {
        return transport.get(
            `/users?page=${data}`
        )
    },
    getUser: (data) => {
        return transport.get(
            `/users/${data}`
        )
    },
    getAllStudents: (data) => {
        return transport.get(
            `/students?page=${data}`
        )
    },
    getAllTeachers: (data) => {
        return transport.get(
            `/teachers?page=${data}`
        )
    },
    createNewStudent: (data) => {
        return transport.post(
            `/students`, JSON.stringify(data)
        )
    },
    createNewTeacher: (data) => {
        return transport.post(
            `/teachers`, JSON.stringify(data)
        )
    },
    deleteUser: (data) => {
        return transport.delete(
            `/users/${data}`
        )
    },  
    createNewClass: (data) => {
        return transport.post(
            `/classes`, JSON.stringify(data)
        )
    },
    getAllClass: (data) => {
        return transport.get(
            `/classes?page=${data}`
        )
    },
    getClass: (data) => {
        return transport.get(
            `/classes/${data}`
        )
    },
    deleteClass: (data) => { 
        return transport.delete(
            `/classes/${data}`
        )
    },
    getTeacherList: () => { 
        return transport.get(
            `/teachers/all`
        )
    }
}
export default admin;