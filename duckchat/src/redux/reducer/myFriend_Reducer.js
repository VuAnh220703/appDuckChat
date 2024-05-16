
import { addFriend } from "../actions/myFriend_Action";

const valueMyFriend = {
    dataMyFriend: [],
    dataType: [
        { id: 0, value: "Thêm bạn bè" },
        { id: 1, value: "Đã gửi" },
        { id: 2, value: "Bạn bè" },
        { id: 3, value: "Từ chối" },
    ]
}

const myFriend_Reducer = (state = valueMyFriend, action) => {
    switch (action.type) {
        case addFriend().type:
            return state
        default:
            return state
    }

}

export default myFriend_Reducer

