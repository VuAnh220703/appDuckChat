import {
    fetchDataPosts,
    Update_QuantityLike_ItemPost,
    Update_QuantityComment_ItemPost,
    clearData
} from "../actions/postAction_Redux"
const arrDataPost = {
    data: [],
    err: null
}

const postReducer = (state = arrDataPost, action) => {
    switch (action.type) {
        case fetchDataPosts().type:
            return {
                ...state, data: action.paydata
            }
        case Update_QuantityLike_ItemPost().type:
            let indexUpdate = state.data.findIndex(item => item.idPost === action.payidpost);
            if (indexUpdate !== -1) {
                const arrNew = [...state.data]
                if (action.payaction === "Add") {
                    arrNew[indexUpdate].quantityLike += 1
                }
                else if (action.payaction === "Sub") {
                    arrNew[indexUpdate].quantityLike -= 1
                }
                return {
                    ...state, data: arrNew
                }
            }
            return state

        case Update_QuantityComment_ItemPost().type:
            let indexUpdateCmt = state.data.findIndex(item => item.idPost === action.payidpost);
            if (indexUpdateCmt !== -1) {
                const arrNew = [...state.data]
                if (action.payaction === "Add") {
                    arrNew[indexUpdateCmt].quantityComment += 1
                    return {
                        ...state, data: arrNew
                    }
                }
                else if (action.payaction === "Sub") {
                    arrNew[indexUpdateCmt].quantityComment -= 1
                    return {
                        ...state, data: arrNew
                    }
                }
            }
            return state

        case clearData().type:
            return {
                ...state, data: []
            }

        default:
            return state
    }
}
export default postReducer