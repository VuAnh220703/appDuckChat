import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'

// import api
import { RestFulApi } from '../service/RestFulApi'

// import fontawesome
import { FontAwesome } from '@expo/vector-icons'

// import AsyncStorage chứa thông tin đăng nhập
import AsyncStorage from '@react-native-async-storage/async-storage'

// import redux
import { useSelector, useDispatch } from 'react-redux'
import Item_viewpost from '../component/item_viewpost'
import { Delete_Icon_Post, Insert_Icon_Post } from '../redux/actions/likePostAction_Redux'

export default function Screen_DetailUser({ route, navigation }) {

    // nhận id người dùng
    const { information: infor_detailUser } = route.params
    console.log(infor_detailUser)

    // loading data bài viết của người dùng
    const [isLoading, setIsLoading] = useState({ loadingDataPost: true, loadingStatusFriend: true })

    // thông tin người dùng
    const [infor_mySelf, setInfor_mySelf] = useState(null)

    // danh sách bài viết đã được thích
    const arr_MyPostLike = useSelector(state => state.likePost.dataLikePost)

    // lấy danh sách trạng thái bạn bè
    const arr_StatusFriendRequest = useSelector(state => state.myfriend.dataType)

    // dispatch react - redux
    const dispatch = useDispatch();

    // danh sách bài viết người dùng
    const [arrPostUser, setArrPostUser] = useState([])

    // offset
    const [offset, setOffset] = useState(0)

    // result send request
    const [idStatus_Friend, setIdStatus_Friend] = useState(0)


    // khai báo restful api
    const api = new RestFulApi()

    // useEffect ===> lấy thông tin 
    useEffect(() => {
        navigation.setOptions({
            headerTitle: infor_detailUser.fullName
        })

        // lấy thông tin người dùng
        if (!infor_mySelf) {
            // gọi hàm lấy thông tin người dùng trong AsyncStorage
            getInformationUser_AsyncStorage()
        }
        else {
            // Gọi hàm kiểm tra bạn bè
            isCheckStatusFriend()
        }

        // hàm lấy thông tin người dùng thông qua AsyncStorage
        async function getInformationUser_AsyncStorage() {
            try {
                const informationString = await AsyncStorage.getItem("@informationUser")
                if (informationString) {
                    setInfor_mySelf(JSON.parse(informationString))
                    console.log(informationString)
                }
            } catch (error) {
                console.log("Lỗi lấy thông tin người dùng thông qua AsyncStorage tại Tab_Personal: " + error)
            }
        }


        // hàm kiểm tra trạng thái bạn bè
        async function isCheckStatusFriend() {
            // kết quả gọi api kiểm tra trạng thái bạn bè
            const resultApi = await api.isCheckMyFriend(infor_mySelf[0].iduser, infor_detailUser.iduser)

            if (resultApi) {
                setIdStatus_Friend(resultApi.status_friendrequest)
                setIsLoading(prev => ({
                    ...prev, loadingStatusFriend: false
                }))
            }
            else {
                setIdStatus_Friend(0)
                setIsLoading(prev => ({
                    ...prev, loadingStatusFriend: false
                }))
            }

        }

    }, [infor_mySelf])

    // useEffect ===> load bài viết của người dùng
    useEffect(() => {
        getAllPostOfUser()
    }, [isLoading.loadingDataPost])

    // hàm lấy danh sách bài viết
    const getAllPostOfUser = async () => {

        if (isLoading.loadingDataPost && offset >= 0) {
            const resultApi = await api.getAllPosts_IdUser(infor_detailUser.iduser, offset)
            if (resultApi.length > 0) {

                setArrPostUser(prev => [...prev, ...resultApi])
                setOffset(offset + 4)
                setIsLoading(prev => ({
                    ...prev, loadingDataPost: false
                }))
            }
            else if (resultApi.length <= 0) {
                setOffset(-1)
                setIsLoading(prev => ({
                    ...prev, loadingDataPost: false
                }))
            }

        }
        else if (isLoading.loadingDataPost && offset < 0) {
            setIsLoading(prev => ({
                ...prev, loadingDataPost: false
            }))
        }
    }

    // hàm kiểm tra item đã thả icon chưa
    const isMyIconFeel = (idPost) => {
        const result = arr_MyPostLike.find(item => item.idPost_LikePost === idPost);
        if (result) {
            return result.nameIcon
        }
        return null
    }

    // hàm cập nhật icon trên database
    const updateIcon_IdPost = (idPost, nameIcon) => {
        console.log("update icon post id user")

    }

    // hàm xoá icon cảm xúc
    const deleteIcon_IdPost = (idPost) => {
        const resultApi = api.deleteIconFeelToPost(infor_mySelf[0].iduser, idPost)
        if (resultApi) {
            dispatch(Delete_Icon_Post(idPost))
            const arr = [...arrPostUser]
            let index = arr.findIndex(item => item.idPost === idPost)
            arr[index].quantityLike -= 1
            setArrPostUser(arr)
            return true
        }
        return false
    }

    // hàm thả icon bài viết
    const likePost = async (idPost, nameIcon) => {
        let resultFeelIcon = await api.insertIconFeelToPost(infor_mySelf[0].iduser, idPost, nameIcon)
        if (resultFeelIcon) {
            dispatch(Insert_Icon_Post(idPost, nameIcon))
            const arr = [...arrPostUser];

            let index = arr.findIndex(item => item.idPost === idPost)
            arr[index].quantityLike += 1
            setArrPostUser(arr)
        }
    }

    // hàm bắt sự kiện gửi yêu cầu kết bạn
    const eventSendFriendRequest = async () => {
        if (idStatus_Friend === 0) {
            // gọi api yêu cầu lời mời kết bạn
            const resultSendRequestFriend = await api.sendFriendRequest(infor_mySelf[0].iduser, infor_detailUser.iduser)
            if (resultSendRequestFriend) {
                setIdStatus_Friend(1)
            }
        }

        else {

            Alert.alert("Thông báo", "Bạn muốn xoá yêu cầu kết bạn với " + infor_detailUser.fullName + " này không ?",
                [
                    {
                        text: "Có",
                        onPress: async () => {
                            // gọi api xoá yêu cầu kết bạn
                            setIsLoading(prev => ({
                                ...prev, loadingStatusFriend: true
                            }))
                            const result = await api.deleteFriendRequest(infor_mySelf[0].iduser, infor_detailUser.iduser)
                            if (result) {
                                setIdStatus_Friend(0)
                                setIsLoading(prev => ({
                                    ...prev, loadingStatusFriend: false
                                }))
                            }
                        }
                    }, {
                        text: "Không",
                    }

                ])
        }
    }

    return (
        <FlatList
            style={{ flex: 1 }}
            data={arrPostUser}
            keyExtractor={(item) => item.idPost}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <Item_viewpost
                    item={item}
                    isIconFeel={isMyIconFeel(item.idPost)}

                    // bắt sự kiện đã comment
                    isEventComment={(result) => {
                        if (result) {
                            let arr = [...arrPostUser]
                            let index = arr.findIndex(item => item.idPost)
                            arr[index].quantityComment += 1
                            setArrPostUser(arr)
                        }
                    }}
                    eventFeelIcon={(idPost, nameIcon) => {
                        // cập nhật icon trên database
                        if (isMyIconFeel(item.idPost)) {
                            updateIcon_IdPost(idPost, nameIcon)
                        }

                        // ngược lại ==> Nếu bài viết chưa được thả icon
                        else {
                            likePost(idPost, nameIcon)
                        }
                    }}
                    eventDisIconFeel={() => {
                        return deleteIcon_IdPost(item.idPost)
                    }}
                />
            )}
            onEndReached={() => {
                setIsLoading(prev => ({
                    ...prev, loadingDataPost: true
                }))
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                () => {
                    if (isLoading.loadingDataPost && offset >= 0) {
                        return (
                            <ActivityIndicator size={'large'} />
                        )
                    }
                }
            }
            ListHeaderComponent={
                <SafeAreaView>
                    {/* thông tin người dùng */}
                    <View style={{ marginTop: '10%' }}>
                        {/* avatar nguoi dung */}
                        <Image
                            source={require("../../assets/backgroundregister.jpg")}
                            style={styles.imgAvatar}

                        />

                        {/* số điện thoại người dùng */}
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '600',
                                alignSelf: 'center',
                                marginTop: 10
                            }}
                        >{String(infor_detailUser.numberphone).substring(0, 3)}*******</Text>
                    </View>

                    {/* view action */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10
                    }}>

                        {/* button yêu cầu thêm bạn bè */}
                        <TouchableOpacity
                            style={[
                                {
                                    flex: 0.35,
                                    backgroundColor: isLoading.loadingStatusFriend ? "#CDC5BF" : idStatus_Friend === 0 ? '#4876FF' : "white",
                                    borderRadius: 10,


                                },
                                idStatus_Friend !== 0 ? {
                                    shadowColor: 'black',
                                    shadowOffset: { width: -4, height: -4 },
                                    shadowOpacity: 1,
                                    elevation: 10

                                } : null
                            ]}
                            onPress={() => {
                                eventSendFriendRequest()
                            }}
                        >
                            {
                                !isLoading.loadingStatusFriend && (
                                    <Text
                                        style=
                                        {[
                                            styles.txtAction,
                                            {
                                                color: idStatus_Friend === 0 ? "white" : "black",
                                                fontStyle: idStatus_Friend === 1 ? 'italic' : 'normal',
                                                // borderWidth: idStatus_Friend === 1 ? 1 : 0
                                            }]}>
                                        {arr_StatusFriendRequest[idStatus_Friend].value}
                                    </Text>
                                )
                            }

                            {
                                isLoading.loadingStatusFriend && (
                                    <ActivityIndicator size={'large'} color={'white'} />
                                )
                            }
                        </TouchableOpacity>

                        {/* button nhắn tin */}
                        <TouchableOpacity style={{ flex: 0.35, borderRadius: 10, borderWidth: 0.5 }}>
                            <Text style={styles.txtAction}>Nhắn tin</Text>
                        </TouchableOpacity>

                        {/* button gọi */}
                        <TouchableOpacity style={{
                            flex: 0.1,
                        }}>
                            <FontAwesome name='phone' size={30}
                                style={{
                                    borderWidth: 1,
                                    textAlign: 'center',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                }} />
                        </TouchableOpacity>
                    </View>
                    {
                        (arrPostUser.length <= 0 && offset < 0) && (
                            <Text
                                style={{
                                    color: "#9C9C9C",
                                    fontSize: 18,
                                    fontWeight: '600',
                                    alignSelf: 'center'
                                }}
                            >Không có dữ liệu</Text>
                        )
                    }
                </SafeAreaView>
            }
        />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    // style img avatar
    imgAvatar: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 50
    },

    // style action 
    txtAction: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 8,
        textAlign: 'center'
    }
})