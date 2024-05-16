import { FlatList, Text, TextInput, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

// import Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// import RestFulApi
import { RestFulApi } from '../service/RestFulApi'

export default function Screen_Postnews_Document({ navigation }) {
    const [arrBackground, setArrBackground] = useState([])
    const [dataDocument, setDataDocument] = useState({ valueNewDocument: null, status: true, idBackgroundNews: 1 })
    const [informationUser, setInformationUser] = useState(null)
    useEffect(() => {
        // gọi hàm lấy danh sách hình nền bản tin
        getBackgroundNews()
        // gọi hàm lấy thông tin người dùng
        functionGetInformation()
    }, [])

    // hàm lấy thông tin người dùng ở trong Async
    const functionGetInformation = async () => {
        try {
            const informationString = await AsyncStorage.getItem("@informationUser")
            if (informationString) {
                setInformationUser(JSON.parse(informationString))
                console.log(informationString)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // hàm lấy danh sách hình nền bản tin
    const getBackgroundNews = async () => {
        await fetch(RestFulApi.host + "/news/backgroundNews", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                setArrBackground(data.data)
            })
            .catch(error => console.log("Lỗi lấy danh sách background tin tức: " + error))
    }

    // hàm thêm tin tức văn bản
    const addNew_Document = async () => {
        // Thông tin tin tức
        let dataNews = { time: Date.now(), status: true, idUser: informationUser[0].iduser, idTypeNews: 1 }
        // Gọi api thêm tin tức văn bản
        await fetch(RestFulApi.host + RestFulApi.url_AddNews_Document, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dataNews, dataDocument })
        }).then(reponse => reponse.json())
            .then(data => {
                if (data.sucess) navigation.pop(2)
            })
            .catch(err => console.log(err))


    }

    return (

        arrBackground.length > 0 && (
            <ImageBackground
                source={dataDocument.idBackgroundNews == 1 ? { uri: RestFulApi.host + "/news/imagebackground?namebackground=" + arrBackground[0].valueBackgroundNews } : { uri: RestFulApi.host + "/news/imagebackground?namebackground=" + arrBackground[dataDocument.idBackgroundNews - 1].valueBackgroundNews }}
                style={{ flex: 1 }}>
                {/* header */}
                <View style={{
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 5
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }} source={require("../../assets/iconcancel.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={addNew_Document}
                    >
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500',
                            backgroundColor: '#009ACD',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 10,
                            color: 'white'
                        }}>Xong</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TextInput
                        value={dataDocument.valueNewDocument}
                        placeholder='Bắt đầu'
                        style={{
                            fontSize: 30,
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginTop: 10,
                            height: 300,
                            color: '#B5B5B5'
                        }}
                        placeholderTextColor={'#B5B5B5'}
                        multiline
                        numberOfLines={5}
                        maxLength={100}
                        autoFocus={true}
                        onChangeText={(value) => {
                            setDataDocument(dataDocument => ({
                                ...dataDocument, valueNewDocument: value
                            }))
                        }}
                    />

                    <FlatList
                        data={arrBackground}
                        horizontal={true}
                        style={{ marginVertical: 0 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item.idBackgroundNews}
                                onPress={
                                    () => {
                                        setDataDocument(dataDocument => ({
                                            ...dataDocument, idBackgroundNews: item.idBackgroundNews
                                        }))
                                    }
                                }
                            >
                                <Image
                                    style={{ height: 30, width: 30, borderRadius: 10, marginHorizontal: 5 }}
                                    source={{ uri: RestFulApi.host + "/news/imagebackground?namebackground=" + item.valueBackgroundNews }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </ImageBackground>
        )
    )
}
