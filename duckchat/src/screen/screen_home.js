import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// import RestFulApi
import { RestFulApi } from '../service/RestFulApi'

// import item view post
import Item_viewpost from '../component/item_viewpost'

// import view feel
import View_feeling from '../component/view_feeling'

// import item news
import Item_news from '../component/item_news'

// import io
import { io } from 'socket.io-client'

// import Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// import react-redux
import { useSelector, useDispatch } from 'react-redux'

// import react-redux action ----> bài viết
import {
    clearData,
    fetchDataPosts,
    Update_QuantityComment_ItemPost,
    Update_QuantityLike_ItemPost
} from '../redux/actions/postAction_Redux'

//   import react-redux action likepost
import {
    Fetch_My_LikePost,
    Update_Icon_Post,
    Insert_Icon_Post,
    Delete_Icon_Post
} from '../redux/actions/likePostAction_Redux'

// import react-redux connect socket io
import { Connect_SocketIO } from '../redux/actions/socketIO_Action'

// import modal detail news
import Modal_DetailNews from '../modal/modal_detailnews'

export default function Screen_Home({ navigation: { navigate } }) {
    const api = new RestFulApi()
    // danh sách tin tức
    const [news, setNews] = useState([])

    // biến lưu trữ trạng thái loading data
    const [offer, setOffer] = useState(0)

    // Trang refresh
    const [loading, setLoading] = useState({ isEventOnEndScrollLoading: true, refetchDataPost: false, loadingMyLikeSuccess: false })

    // props modal detail news
    const [propsModalDetailNew, setPropsModalDetailNew] = useState({ isVisble: false, indexSelectedNew: 0 })

    // thông tin người dùng
    const [informationUser, setInformationUser] = useState(null)

    // dispatch react - redux
    const disPatch = useDispatch();

    // connect socket io
    const socketIO = useSelector(state => state.socketIO.socket)

    // danh sách bài viết đã được thích
    const arr_MyPostLike = useSelector(state => state.likePost.dataLikePost)

    // danh sách bài viết 
    const postList = useSelector(state => state.post.data)

    // lấy danh sách tin tức 
    const getNews = async () => {
        let dataNews = await api.getNews();
        setNews(dataNews)
    }

    // useEffect  ===> quản lý việc redux (kết nối socket, lấy danh sách bài viết)
    useEffect(() => {
        // kết nối socket io 
        if (socketIO == null) {
            const connectSocKetIO = io("`http://192.168.1.9:3000/connectionSocket_post")
            disPatch(Connect_SocketIO(connectSocKetIO))
        }

        if (!informationUser) {
            // gọi hàm lấy thông tin người dùng trong AsyncStorage
            getInformationUser_AsyncStorage()
        }
        else if (informationUser) {
            //  Gọi hàm lấy danh sách bài viết đã thả icon
            fetchDataMyLikePost()
        }

        // hàm lấy thông tin người dùng thông qua AsyncStorage
        async function getInformationUser_AsyncStorage() {
            try {
                const informationString = await AsyncStorage.getItem("@informationUser")
                if (informationString) {
                    setInformationUser(JSON.parse(informationString))
                    console.log(informationString)
                }
            } catch (error) {
                console.log("Lỗi lấy thông tin người dùng thông qua AsyncStorage tại Tab_Home: " + error)
            }
        }

        // hàm lấy danh sách bài viết đã thả icon của người dùng
        async function fetchDataMyLikePost() {
            // bắt đầu load danh sách bài viết đã thích
            setLoading(prev => ({
                ...prev, loadingMyLikeSuccess: false
            }))

            try {
                const result = await api.getAll_MyLikePost(informationUser[0].iduser)
                if (result.length > 0) {
                    disPatch(Fetch_My_LikePost(result))
                }
            } catch (error) {
                console.log("Lỗi lấy danh sách bài viết đã thả icon: " + error)
            }

        }

        // gọi hàm lấy danh sách bảng tin
        getNews()

    }, [informationUser])

    // refresh dữ liệu
    const onRefresh = useCallback(() => {
        // set vị trí lấy dữ liệu về đầu tiền
        setOffer(0)
        // clear data
        disPatch(clearData())
        setLoading(prevLoading => ({
            ...prevLoading, refetchDataPost: true, isEventOnEndScrollLoading: true
        }))
    })

    // hàm lấy danh sách bài viết
    async function fecthAllDataPost() {
        try {
            if (loading.isEventOnEndScrollLoading) {

                const resultData = await api.getAll_Post(offer);

                if (resultData.length > 0) {

                    disPatch(fetchDataPosts([...postList, ...resultData]))
                    setOffer(offer + 4)
                    setLoading(prevLoading => ({
                        ...prevLoading, refetchDataPost: false
                    }))

                }
                else {
                    setLoading(prevLoading => ({
                        ...prevLoading, isEventOnEndScrollLoading: false
                    }))

                }
            }

        } catch (error) {
            console.log("Lỗi fetch data post: " + error)
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
    const updateIcon_IdPost = async (idPost, nameIcon) => {
        const resultUpdateFeel = await api.updateIconFeelToPost(informationUser[0].iduser, idPost, nameIcon)
        if (resultUpdateFeel) {
            disPatch(Update_Icon_Post(idPost, nameIcon))
        }

    }

    // hàm xoá icon cảm xúc
    const deleteIcon_IdPost = (idPost) => {
        const resultDisFeelPost = api.deleteIconFeelToPost(informationUser[0].iduser, idPost)
        if (resultDisFeelPost) {
            // xoa bài viết đã thích trong danh sách thích bài viết
            if (disPatch(Delete_Icon_Post(idPost))) {
                if (disPatch(Update_QuantityLike_ItemPost(idPost, false))) {
                    return true
                }
            }
        }
        return false

    }

    // hàm thả icon bài viết
    const likePost = async (idPost, nameIcon) => {
        const resultLikePost = await api.insertIconFeelToPost(informationUser[0].iduser, idPost, nameIcon)
        if (resultLikePost) {
            // cập nhật lại danh sách bài viết đã thích
            disPatch(Insert_Icon_Post(idPost, nameIcon))

            // cập nhật lại số lượn thích của bài viết
            disPatch(Update_QuantityLike_ItemPost(idPost, true))
        }

    }

    // hàm bắt sự kiện nhấn vào item bản tin 
    const selectedItemNews = (idItemNews) => {
        let index = news.findIndex(item => item.idNews === idItemNews)
        setPropsModalDetailNew({ isVisble: true, indexSelectedNew: index })
    }
    return (
        <View
            style={styles.container}
        >

            {/* Danh sách bài đăng */}
            <FlatList
                style={styles.container}
                data={postList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.idPost}
                renderItem={({ item }) => (
                    // view item post
                    <Item_viewpost
                        key={item.idPost}
                        item={item}
                        isIconFeel={isMyIconFeel(item.idPost)}
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
                        isEventComment={(result) => {
                            if (result) {
                                disPatch(Update_QuantityComment_ItemPost(idPost, true))
                            }
                            else {
                                Alert.alert("Thông báo", "Đã xảy ra lỗi. Vui lòng thử lại sau", [
                                    {
                                        text: "OK",
                                        style: 'cancel',
                                    }
                                ])
                            }
                        }}
                    />
                )}
                onEndReached={() => {
                    fecthAllDataPost()
                }}
                onEndReachedThreshold={0.6}
                refreshControl={<RefreshControl refreshing={loading.refetchDataPost} onRefresh={onRefresh} />}
                ListHeaderComponent={
                    <View
                    >
                        {/* // view cảm nghĩ */}
                        <View_feeling navigate={navigate} />

                        {/* // danh sách tin tức  */}
                        {
                            news.length > 0 && (
                                <FlatList
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 5
                                    }}
                                    showsHorizontalScrollIndicator={false}
                                    data={news}
                                    keyExtractor={(item) => item.idNews}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                selectedItemNews(item.idNews)
                                            }}
                                        >
                                            <Item_news item={item} styleMockup={"ItemNews"} />
                                        </TouchableOpacity>
                                    )}

                                />
                            )
                        }

                        {/* Hiển thị chi tiết tin tức  */}
                        {
                            propsModalDetailNew.isVisble && (
                                <Modal_DetailNews
                                    isVisible={propsModalDetailNew.isVisble}
                                    arrNews={news}
                                    indexSelected={propsModalDetailNew.indexSelectedNew}
                                    onCloseModal={() => {
                                        setPropsModalDetailNew({ isVisble: false, indexSelectedNew: 0 })
                                    }}
                                />
                            )
                        }
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})