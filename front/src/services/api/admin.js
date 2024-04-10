import { transport } from "../../config/http/transport";

const admin = {

    getAllStudentByAdmin: (data) => {
        return transport.get(
            `/all/users`, JSON.stringify(data)
        )
    },
}
export default admin;