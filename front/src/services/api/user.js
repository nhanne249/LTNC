import { transport } from "../../config/http/transport";
import axios from "axios";

const url1 ='teacher';
const url2 ='';
const user = {

    registerStudent: (data) => {
        return transport.post(
            `${url1}`, JSON.stringify(data)
        )
    },
    // login: (data) => {
    //     const formData = new FormData();
    //     formData.append("username", `${data.username}`);
    //     formData.append("password", `${data.password}`);

    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:8081/login',
    //         data: formData,
    // })
    // .then((response) => {
    //     console.log(response.headers.get('JSESSIONID'));
    //     return response;
    // })
    // },
}
export default user;