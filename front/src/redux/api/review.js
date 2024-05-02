import { transport } from "../../config/http/transport";

const review = {
    getAllReview: (data) => {
        return transport.get(
            `/reviews/${data.teacherUsername}?page=${data.page}`, JSON.stringify()
        )
    },
}
export default review;