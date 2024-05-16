import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    ActivityIndicator
} from 'react-native'
import React, { useCallback, useState } from 'react'

// debounce
import { debounce } from 'lodash'

// import restful api
import { RestFulApi } from '../service/RestFulApi'

// icon ====> fontawesome
import { FontAwesome } from '@expo/vector-icons'

export default function Screen_Search({ navigation, route }) {
    // khai báo RestfulAPi 
    const api = new RestFulApi()
    // kết quả từ gợi ý
    const [arrSuggestedResult, setArrSuggestedResult] = useState([])

    // giá trị tìm kiếm nhập vào
    const [valueSearch, setValueSearch] = useState(null)

    // loading
    const [isLoading, setIsloading] = useState(false)

    // Thông tin người dùng ====> nhận giá trị từ tham số truyền từ headerHome
    const informationUser = route.params.information

    // hàm gọi api
    const callApiSearchUser = async (text) => {
        if (String(text).trim().length > 0) {
            const resultApi = await api.searchUser_Debounce(String(text).trim(), informationUser.iduser)
            if (resultApi) {
                setArrSuggestedResult(resultApi)
                setIsloading(false)
            }
            else {
                setArrSuggestedResult([])
                setIsloading(false)
            }
        }
        else {
            setArrSuggestedResult([])
            setIsloading(false)
        }

    }

    // sử dụng debounce 
    const debounceSearchUser = useCallback(
        debounce((text) => {
            callApiSearchUser(text)
        }, 500), []
    )


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>

            <View style={{ flex: 1 }}>
                {/* view search */}
                <View style={{
                    flexDirection: 'row',
                    height: 70,
                    borderBottomWidth: 0.5,
                    marginHorizontal: 10,
                    alignItems: 'center',
                    marginBottom: 20
                }}>

                    {/* button return */}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Image
                            source={require("../../assets/iconreturn.png")}
                            style={{
                                height: 40,
                                width: 40
                            }}
                        />
                    </TouchableOpacity>

                    {/* input value search */}
                    <View style={styles.vInputValueSearch}>
                        <TextInput
                            placeholder='Từ khoá tìm kiếm'
                            value={valueSearch}
                            placeholderTextColor={'gray'}
                            style={{
                                width: '87%',
                                fontSize: 18
                            }}
                            onChangeText={(text) => {
                                setIsloading(true)
                                setValueSearch(text);
                                debounceSearchUser(text)

                            }}
                        />
                        {
                            valueSearch && (
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        setValueSearch("")
                                        setArrSuggestedResult([])
                                    }}

                                >
                                    <Image source={require("../../assets/animation_icontrash.gif")} style={{ height: 30, width: 30 }} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>

                {
                    arrSuggestedResult.length > 0 && (
                        <FlatList
                            data={arrSuggestedResult}
                            keyExtractor={(item) => item.iduser}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                // view item
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
                                        marginVertical: 5
                                    }}
                                    onPress={() => {
                                        navigation.navigate("ScreenDetailInfortionUser", { "information": item })
                                    }}
                                >
                                    <FontAwesome name='search' size={20} />
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: '600',
                                        marginLeft: 10
                                    }}>{item.fullName}</Text>
                                </TouchableOpacity>
                            )}

                        />
                    )
                }
                {/* hiển thị loading */}
                {
                    isLoading && (
                        <ActivityIndicator size={"large"} style={{ position: 'absolute', alignItems: 'center', alignSelf: 'center', marginTop: '20%' }} />
                    )
                }

                {/* Thông báo không hiển thị kết  */}
                {
                    (arrSuggestedResult.length < 1 && String(valueSearch).trim().length > 0 && !isLoading) && (
                        <View style={{
                            alignItems: 'center',
                            marginVertical: 10,
                            marginHorizontal: 10
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'gray'
                            }}>Không có kết quả</Text>
                        </View>
                    )
                }
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    vInputValueSearch: {
        backgroundColor: 'white',
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
        flex: 1,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})