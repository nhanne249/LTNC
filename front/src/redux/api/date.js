import { transport } from "../../config/http/transport";

const date = {
    getAllDays: (data) => {
        return transport.get(`/days`, null);
    },
    getDay: (data) => {
        return transport.get(`/days/${data}`,null);
    },
}
export default date;