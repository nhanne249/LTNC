import { transport } from "../../config/http/transport";

const review = {
    getAllReview: (data) => {
        return transport.get(
            `/reviews/${data}`, JSON.stringify()
        )
    },
}
export default review;