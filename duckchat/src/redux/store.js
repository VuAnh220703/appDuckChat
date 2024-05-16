import { applyMiddleware, combineReducers, createStore } from 'redux'
import postReducer from './reducer/postReducer'
import likePostReduce from './reducer/likePost_Reducer'
import socketIO_Reducer from './reducer/socketIO_Reducer'
import myFriend_Reducer from './reducer/myFriend_Reducer'
import { thunk } from 'redux-thunk'

const rootReducer = combineReducers({
    post: postReducer,
    likePost: likePostReduce,
    socketIO: socketIO_Reducer,
    myfriend: myFriend_Reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store