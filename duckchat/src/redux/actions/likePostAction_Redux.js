// import api
import { RestFulApi } from "../../service/RestFulApi"
const api = new RestFulApi()
// Lấy danh sách bài biết đã thả cảm xúc
export const Fetch_My_LikePost = (data) => {
    return {
        type: "FETCH_DATA_MY_LIKEPOST",
        payload: data
    }
}

export const clearDataMylikepost = ()=>{
    return {
        type: "CLEARDATA_MYLIKEPOST"
    }
}
// hành động cập nhật icon cảm xúc
export const Update_Icon_Post = (idPost, nameIcon) => {
    return {
        type: "UPDATE_ICON_POST",
        payidpost: idPost,
        paynameicon: nameIcon
    }
}

export const Insert_Icon_Post = (idPost, nameIcon) => {
    return {
        type: "INSERT_ICON_POST",
        payidpost: idPost,
        paynameicon: nameIcon
    }
}

export const Delete_Icon_Post = (idPost) => {
    return {
        type: "DELETE_ICON_POST",
        payidpost: idPost
    }
}

