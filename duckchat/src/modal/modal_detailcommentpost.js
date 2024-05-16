import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'

// import restfulapi
import { RestFulApi } from '../service/RestFulApi'

// import modal
import Modal from 'react-native-modal'

// import Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// import item cmt post
import Item_CommentPost from '../component/item_commentpost'

export default function Modal_DetailCommentPost({ isVisibleModal, eventCloseModal, idPost, isEventComment }) {
    // Biến lây trữ danh sách cmt
    const [dataComment, setDataComment] = useState([])

    // Biến lưu giữ giá trị cmt
    const [valueComment, setValueComment] = useState(null)

    // biến loading
    const [isLoading, setIsLoading] = useState(true)

    // offset 
    const [offset, setOffset] = useState(0)

    // thông tin người dùng
    const [informationUser, setInformationUser] = useState(null)

    // khai báo api
    const api = new RestFulApi();

    //useEffect
    useEffect(() => {

        // lấy thông tin người dùng
        if (!informationUser) {
            // // Gọi hàm lấy danh sách comment 
            // getAll_CommentPost_IdPost()

            // gọi hàm lấy thông tin người dùng trong AsyncStorage
            getInformationUser_AsyncStorage()
        }

        // hàm lấy thông tin người dùng thông qua AsyncStorage
        async function getInformationUser_AsyncStorage() {
            try {
                const informationString = await AsyncStorage.getItem("@informationUser")
                if (informationString) {
                    setInformationUser(JSON.parse(informationString))
                }
            } catch (error) {
                console.log("Lỗi lấy thông tin người dùng thông qua AsyncStorage tại Tab_Home: " + error)
            }
        }

    }, [])

    // hàm lấy danh sách bài viết 
    async function getAll_CommentPost_IdPost() {
        if (isLoading && offset >= 0) {
            const arrCommentPostResultApi = await api.getAll_CommentPost(idPost, offset)
            if (arrCommentPostResultApi.length > 0) {
                setDataComment(prevData => [...prevData, ...arrCommentPostResultApi])
                setOffset(offset + 10)
                setIsLoading(false)

            }
            else {
                setOffset(-1)
                setIsLoading(false)
            }
        }
    }

    // hàm insert comment bài viết
    const insertCommentPost = async () => {

        const resultInsertCommentPost = await api.insertCommentPost(idPost, informationUser[0].iduser, valueComment)
        if (!resultInsertCommentPost) {
            isEventComment(false)
        }
        else {
            setValueComment(null)
            setDataComment([resultInsertCommentPost[0], ...dataComment])
            isEventComment(true)

        }

    }


    return (
        <Modal
            isVisible={isVisibleModal}
            style={styles.container}

        >
            <View
                style={styles.vChildContainer}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: 10
                    }}
                >
                    <Text
                        style={styles.txtTitle}
                    >Bình luận</Text>

                    <TouchableOpacity
                        onPress={eventCloseModal}
                    >
                        <Image
                            source={require("../../assets/iconcancel.png")}
                            style={{
                                height: 20,
                                width: 20
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={dataComment}
                    keyExtractor={(item) => item.idCmt}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Item_CommentPost itemComment={item} />
                    )}
                    style={{
                        marginBottom: 85,
                    }}
                    onEndReached={() => {
                        setIsLoading(true)
                        getAll_CommentPost_IdPost()
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        () => {
                            if (isLoading && offset >= 0) {
                                return (
                                    <ActivityIndicator size={'large'} />
                                )
                            }
                        }
                    }
                />

                {/* view input comment */}
                <View
                    style={styles.vInputComment}
                >

                    {/* View avatar */}
                    <Image
                        source={require('../../assets/iconuser.png')}
                        style={{
                            height: 40,
                            width: 40
                        }}
                    />

                    {/* input comment */}
                    <TextInput
                        placeholder='Thêm bình luận ...'
                        value={valueComment}
                        autoFocus={true}
                        onChangeText={(text) => {
                            setValueComment(text)
                        }}
                        style={{
                            backgroundColor: 'whitesmoke',
                            height: 40,
                            width: '65%',
                            borderRadius: 20,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            fontSize: 18
                        }}

                    />

                    {/* send comment */}
                    <TouchableOpacity
                        onPress={() => {
                            insertCommentPost()
                        }}
                        disabled={valueComment ? false : true}
                    >
                        <Image
                            source={require('../../assets/iconsend.png')}
                            style={{
                                height: 40,
                                width: 40
                            }}
                        />
                    </TouchableOpacity>

                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    // style container modal
    container: {
        flex: 1,
        margin: 0,
        marginTop: "50%"

    },
    //  style view parent 
    vChildContainer: {
        backgroundColor: "#ECECEC",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: "100%"
    },

    // style text title
    txtTitle: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center'
    },

    // style view container icon, tag and comment
    vInputComment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 80,
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        borderWidth: 0.4,
        bottom: 0,
    }
})