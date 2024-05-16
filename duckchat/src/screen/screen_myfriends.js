import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native'
import React, { useState, useCallback } from 'react'

// import api 
import { RestFulApi } from '../service/RestFulApi'

// import fontawesome
import { FontAwesome } from '@expo/vector-icons'
import Item_Friend from '../component/item_friend'
import { debounce } from 'lodash'

export default function Screen_Myfriends({ route, navigation: { navigate } }) {
    // thông tin người dung
    const inforUser = JSON.parse(route.params.inforUser)

    // khai báo Restfulapi
    const api = new RestFulApi()

    // useState => danh sách bạn bè của người dùng
    const [arrMyFriends, setArrMyFriends] = useState([])

    // tham số offset và limit
    const [valueParamesApi, setValueParamesApi] = useState({ offset: 0, limit: 10 })

    // loading 
    const [loading, setLoading] = useState({ isRefeshLoading: false, isLoadingData: true })

    // hàm gọi api giá trị search
    const debounceSearchFriend = useCallback(
        debounce((valueSearch) => {

            callApiSerachMyFriend(valueSearch)
        }, 500), []
    )

    const callApiSerachMyFriend = async (valueSearch) => {
        // kết quả gọi api
        try {
            const result = await api.searchFriend_MyFriend(inforUser.iduser, valueSearch)
            if (result) {
                setArrMyFriends(result)
            }
        } catch (error) {
            console.log("Err call api search my friend: " + error)
        }
    }

    // hàm lấy danh sách bạn bè
    async function getMyFriendList() {
        if (loading.isLoadingData && valueParamesApi.offset >= 0) {
            api.getMyFriendList(inforUser.iduser, valueParamesApi.offset, valueParamesApi.limit)
                .then(resultCallApi => {
                    if (resultCallApi) {
                        setArrMyFriends(prev => [...prev, ...resultCallApi])
                        setValueParamesApi(prev => ({ ...prev, offset: valueParamesApi.offset + valueParamesApi.limit }))
                        setLoading(prev => ({ ...prev, isLoadingData: false }))
                    } else {
                        setValueParamesApi(prev => ({ ...prev, offset: -1 }))
                        setLoading(prev => ({ ...prev, isLoadingData: false }))
                    }
                })
                .catch(error => {
                    console.error('Error:', error)
                })
        } else {
            setLoading(prev => ({ ...prev, isLoadingData: false }))
        }
    }

    // hàm bắt sự kiện nhấn vào item bạn bè
    const eventClickItemFriend = (item) => {
        navigate("ScreenDetailUser", { "information": item })
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            {/* danh sách bạn bè */}
            <FlatList
                data={arrMyFriends}
                keyExtractor={(item) => item.iduser}
                renderItem={({ item }) => (

                    // item bạn bè
                    <TouchableOpacity
                        onPress={() => {
                            eventClickItemFriend(item)
                        }}
                    >

                        {/* gọi function component bạn bè */}
                        <Item_Friend item={item} />
                    </TouchableOpacity>

                )}
                onEndReached={() => {
                    getMyFriendList()
                }}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={
                    <View>

                        {/* view search friend */}
                        <View style={styles.vSearchFriend}>

                            <FontAwesome
                                name='search'
                                size={20}
                            />

                            {/* input tìm kiếm bạn bè */}
                            <TextInput
                                style={styles.iptSearchFriend}
                                placeholder='Tìm bạn bè ...'
                                placeholderTextColor={'#8B8682'}
                                returnKeyType='search'
                                onChangeText={(text) => {
                                    debounceSearchFriend(text)
                                }}
                            />
                        </View>

                        {/* title */}
                        <Text style={styles.titleFriend}>Danh sách bạn bè</Text>
                    </View>
                }

                ListFooterComponent={() => {
                    if (loading.isLoadingData) {
                        return (
                            <ActivityIndicator size={'large'} />
                        )
                    }
                }}

            />

        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    // style view search
    vSearchFriend: {
        backgroundColor: '#EEE9E9',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },

    // style text input
    iptSearchFriend: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
        flex: 0.9
    },

    // style title
    titleFriend: {
        fontSize: 18,
        marginTop: 5,
        marginHorizontal: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})