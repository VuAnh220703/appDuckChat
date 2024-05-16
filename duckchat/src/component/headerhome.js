import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native'
import React, { useState, useEffect } from 'react'

// import modal option add post
import Modal_optionaddpost from '../modal/modal_optionaddpost'

// import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function HeaderHome({ navigate }) {
    // Hien thi modal 
    const [isShowModalAddPost, setIsShowModalAddPost] = useState(false);

    // thông tin người dùng
    const [informationUser, setInformationUser] = useState(null)

    useEffect(() => {

        if (!informationUser) {
            // gọi hàm lấy thông tin người dùng trong AsyncStorage
            getInformationUser_AsyncStorage()
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

    }, [])

    return (

        <View
            style={styles.vHeader}
        >
            {/* view header */}
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        textShadowColor: '#0000BB',
                        textShadowOffset: { height: 5, width: -2 },
                        textShadowRadius: 10,
                        color: '#000044',
                        fontStyle: 'italic',
                        flex: 0.6
                    }}
                >DuckChat</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 0.4,
                        justifyContent: 'space-around'
                    }}
                >
                    {/* add post */}
                    <TouchableOpacity
                        onPress={() => {
                            setIsShowModalAddPost(true)
                        }}
                    >
                        <Image
                            style={styles.sizeIconHeader}
                            source={require('../../assets/iconaddcontent.png')} />
                    </TouchableOpacity>

                    {/* hiện option cho người dùng chọn loại đăng bài */}
                    <Modal_optionaddpost isVisible={isShowModalAddPost} onClose={() => {
                        setIsShowModalAddPost(!isShowModalAddPost)
                    }} navigate={navigate} />

                    {/* search */}
                    <TouchableOpacity
                        onPress={() => {
                            navigate("Screen_Search", { "information": informationUser[0] })
                        }}
                    >
                        <Image
                            style={styles.sizeIconHeader}
                            source={require('../../assets/iconsearch.png')} />
                    </TouchableOpacity>

                    {/* chat */}
                    <TouchableOpacity>
                        <Image
                            style={styles.sizeIconHeader}
                            source={require('../../assets/iconchat.png')} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    // view area header
    vHeader: {
        height: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    // kích thước các icon tuỳ chọn ở header
    sizeIconHeader: {
        height: 24,
        width: 24
    }

})