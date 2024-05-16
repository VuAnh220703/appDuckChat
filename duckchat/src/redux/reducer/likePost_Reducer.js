import { RestFulApi } from "../../service/RestFulApi";
import {
    Fetch_My_LikePost,
    Update_Icon_Post,
    Insert_Icon_Post,
    Delete_Icon_Post,
    clearDataMylikepost
} from "../actions/likePostAction_Redux";
const api = new RestFulApi();

// data
const arrMyLikePost = {
    dataLikePost: [],
    dataIcon: [
        { id: "heart", value: require('../../../assets/iconlove.png') },
        { id: "sad", value: require('../../../assets/iconsad.png') },
        { id: "laugh", value: require('../../../assets/iconlaugh.png') },
        { id: "cry", value: require('../../../assets/iconcry.png') }
    ],
    err: null
}

const likePostReduce = (state = arrMyLikePost, action) => {
    switch (action.type) {
        case Fetch_My_LikePost().type:
            return {
                ...state, dataLikePost: action.payload
            }
        case Update_Icon_Post().type:
            let index = state.dataLikePost.findIndex(item => item.idPost_LikePost === action.payidpost)
            if (index !== -1) {
                // Tạo một bản sao của mảng dataLikePost
                const newDataLikePost = [...state.dataLikePost];
                // Thay đổi giá trị của phần tử trong mảng mới
                newDataLikePost[index].nameIcon = action.paynameicon;
                // Trả về state mới với mảng dataLikePost đã được cập nhật
                return {
                    ...state,
                    dataLikePost: newDataLikePost
                };
            }
            return state

        case Insert_Icon_Post().type:
            state.dataLikePost.push({ idPost_LikePost: action.payidpost, nameIcon: action.paynameicon })
            return state

        case Delete_Icon_Post().type:
            let indexRemove = state.dataLikePost.findIndex(item => item.idPost_LikePost === action.payidpost)
            if (indexRemove !== -1) {
                state.dataLikePost.splice(indexRemove, 1)
            }
            return state

        case clearDataMylikepost().type:
            return {
                ...state, dataLikePost: []
            }
        default:
            return state

    }

}
export default likePostReduce;