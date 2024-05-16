
import { Connect_SocketIO } from "../actions/socketIO_Action"
const innitState = {
    socket: null
}

const socketIO_Reducer = (state = innitState, action) => {
    switch (action.type) {
        case Connect_SocketIO().type:
            return {
                ...state, socket: action.payload
            }
        default:
            return state
    }
}

export default socketIO_Reducer