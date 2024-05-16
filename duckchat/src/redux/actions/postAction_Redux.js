// impot call resapi
export const fetchDataPosts = (data) => {
    return {
        type: "FETCH_DATA_POST",
        paydata: data
    }
}

export const clearData = () =>{
    return {
        type: " CLEAR_DATAPOST"
    }
}

// Hành động update số lượng lượt 
export const Update_QuantityLike_ItemPost = (idPost, action) => {
    return {
        type: "UPDATE_QUANTITYLIKE_ITEMPOST",
        payidpost: idPost,
        payaction: action ? "Add" : "Sub"
    }
}

// Hành động update số lượng comment ==> action là true ===> tăng ngược lại là giảm
export const Update_QuantityComment_ItemPost = (idPost, action) =>{
    return {
        type: "UPDATE_QUANTITYCOMMENT_ITEMPOST",
        payidpost: idPost,
        payaction: action ? "Add" : "Sub"
    }
}
