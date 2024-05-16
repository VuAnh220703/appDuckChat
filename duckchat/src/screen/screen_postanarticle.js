import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'

// import storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// import dropdown
import { Dropdown } from 'react-native-element-dropdown';

// import restful api
import { RestFulApi } from '../service/RestFulApi';

// import imagespicker
import * as ImagesPicker from 'expo-image-picker'

export default function Screen_Postanarticle({ navigation }) {
    // arr backgeround color
    const arrBackgroundColor = [
        { id: 0, color: "#FFFFFF" },
        { id: 1, color: "#00ffff" },
        { id: 2, color: "#5f9ea0" },
        { id: 3, color: "#f4a460" },
        { id: 4, color: "#ffff00" },
        { id: 5, color: "#dda0dd" },
        { id: 6, color: "#808000" },
        { id: 7, color: "#9acd32" },
        { id: 8, color: "#40e0d0" },
        { id: 9, color: "#fff5ee" },
        { id: 10, color: "#ffc0cb" },
        { id: 11, color: "#98fb98" },

    ]
    // biến lưu trữ danh sách hình ảnh
    const [arrImages, setArrImages] = useState([])
    // biến lưu trữ thông tin người dùng
    const [information, setInformation] = useState(null);
    // biến chứa thông tin trạng thái của bài đăng
    const [dataStatusPost, setDataStatusPost] = useState([]);
    // biến bài đăng
    const [valuePost, setValuePost] = useState({ "backgroundColorPost": "#FFFFFF", "valuePost": null, "address": null, "datetime": null, "status": true, "idStatusPost": 0, "idUser": 0, "idTypePost": 1 })
    // hàm lấy dữ liệu trạng thái bài đăng
    const getDataStatusPost = async () => {
        await fetch(RestFulApi.host + RestFulApi.urlGetStatusPost, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setDataStatusPost(data.data)
            })
            .catch(error => console.log(error))
    }

    // hàm lấy thông tin người dùng ở trong Async
    const functionGetInformation = async () => {
        try {
            const informationString = await AsyncStorage.getItem("@informationUser")
            if (informationString) {
                setInformation(JSON.parse(informationString))
            }
        } catch (error) {
            console.log("Lỗi lấy thông tin người dùng trong AsyncStorage tại màng hình đăng bài viết: " + error)
        }
    }

    // hàm mở thư viện máy ảnh
    const openLibraryImages = async () => {
        try {
            if (arrImages.length > 5) {
                Alert.alert("Thông báo", "Tránh gặp sự cố khi tải nhiều hình ảnh, hệ thống chỉ cho đăng tải 5 tấm hình")
            }
            else {
                let result = await ImagesPicker.launchImageLibraryAsync({
                    mediaTypes: ImagesPicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [10, 10],
                    quality: 1,
                });
                if (result) {
                    if (String(result.assets[0].type) !== "image") {
                        Alert.alert("Thông báo", "File bạn chọn không phải là file hình ảnh. Vui lòng chọn lại sau")
                        return;
                    }
                    if (!result.canceled) {
                        setArrImages([...arrImages, result]);
                        if (valuePost.backgroundColorPost !== "#FFFFFF") {
                            setValuePost(valuePost => ({
                                ...valuePost, backgroundColorPost: '#FFFFFF'
                            }))
                        }
                    }
                }
            }

        } catch (error) {

        }

    }
    // hàm thêm button đăng 
    const addButonPost = () => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    disabled={!valuePost.valuePost}
                    style={{
                        backgroundColor: valuePost.valuePost ? "#B0E2FF" : "#E0EEEE",
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        borderRadius: 10,
                        shadowColor: 'black',
                        shadowOffset: { width: 10, height: 10 },
                        shadowOpacity: 0,
                        shadowRadius: 3,
                        elevation: 4,
                    }}
                    onPress={post}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#CDC1C5',
                        }}
                    >Đăng</Text>
                </TouchableOpacity>
            )
        })
    }
    //hàm đăng bài viết
    const post = async () => {
        // form data
        const formData = new FormData();
        // biến lưu trử thông tin bài đăng
        let informationPost = JSON.stringify(valuePost);
        informationPost = JSON.parse(informationPost)
        // gán giá trị vào thông tin bài đăng
        informationPost.datetime = Date.now().toString()
        informationPost.idStatusPost = informationPost.idStatusPost == 0 ? dataStatusPost[0].idStatusPost : informationPost.idStatusPost.idStatusPost
        informationPost.idUser = information[0].iduser
        // Thêm hình ảnh vào form-data
        arrImages.forEach(element => {
            formData.append("fileImages", {
                uri: element.assets[0].uri,
                type: element.assets[0].mimeType,
                name: Date.now.toString().concat(".png")
            })
        })
        // Thêm thông tin bài đăng vào form-data
        formData.append("information", JSON.stringify(informationPost))

        // goi api
        await fetch(RestFulApi.host + RestFulApi.urlPost_anarticle, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    navigation.goBack();
                }
                else {
                    Alert.alert("Thông báo", "Đã xảy ra lỗi trong quá trình đăng bài viết. Vui lòng thử lại sau")
                }
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        functionGetInformation()
        getDataStatusPost()
        addButonPost()
    }, [valuePost, arrImages])
    return (
        <><ScrollView
            style={styles.container}
        >
            <KeyboardAvoidingView>
                <View
                    style={{ paddingBottom: 100 }}
                >
                    {/* information user */}
                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        {/* avatar */}
                        <View
                            style={{
                                borderRadius: 40,
                                borderWidth: 1,
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                marginTop: 5,
                                marginLeft: 5
                            }}
                        >
                            <Image
                                source={require('../../assets/iconusercolor.png')}
                                style={{
                                    height: 40,
                                    width: 40,
                                }} />
                        </View>

                        {/* view type post */}
                        <View
                            style={{
                                marginLeft: 20
                            }}
                        >
                            {/* Tên người dùng */}
                            {information && <Text
                                style={{
                                    fontWeight: 'bold',
                                    marginVertical: 5,
                                    fontSize: 18
                                }}
                            >{information[0].fullName}</Text>}
                            <Dropdown
                                mode='default'
                                value={valuePost.idStatusPost == 0 ? dataStatusPost[0] : valuePost.idStatusPost}
                                data={dataStatusPost}
                                labelField={'nameStatusPost'}
                                valueField={'idStatusPost'}
                                style={{
                                    width: 120,
                                    height: 25,
                                    borderRadius: 10,
                                    backgroundColor: '#99CCFF'
                                }}
                                selectedTextStyle={{
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    fontSize: 14,
                                    justifyContent: 'space-between',
                                    color: '#003366'
                                }}
                                renderLeftIcon={() => {
                                    if (valuePost.idStatusPost != 0) {
                                        return (<Image style={{ height: 20, width: 20, marginLeft: 5 }} source={{ uri: RestFulApi.host + "/statuspost/imagestatuspost?imagesName=" + valuePost.idStatusPost.image }} />);
                                    }
                                    else {
                                        return (<Image style={{ height: 20, width: 20, marginLeft: 5 }} source={{ uri: RestFulApi.host + "/statuspost/imagestatuspost?imagesName=iconglobal.png" }} />);
                                    }
                                }}
                                onChange={(value) => {
                                    setValuePost(valuePost => ({
                                        ...valuePost, idStatusPost: value
                                    }));
                                }} />
                        </View>
                    </View>

                    {/* input status */}
                    <View
                        style={{ flex: 1, marginVertical: 5 }}
                    >
                        <TextInput
                            placeholder='Bạn đang nghĩ gì ?'
                            multiline={true}
                            value={valuePost.valuePost}
                            numberOfLines={10}
                            style={{
                                textAlignVertical: valuePost.backgroundColorPost == "#FFFFFF" ? 'top' : 'center',
                                textAlign: valuePost.backgroundColorPost == "#FFFFFF" ? 'left' : 'center',
                                paddingHorizontal: 20,
                                fontSize: valuePost.backgroundColorPost == "#FFFFFF" ? 16 : 20,
                                fontWeight: valuePost.backgroundColorPost == "#FFFFFF" ? '400' : 'bold',
                                color: valuePost.backgroundColorPost == "#FFFFFF" ? 'black' : 'white',
                                backgroundColor: valuePost.backgroundColorPost,
                                height: 260
                            }}
                            onChangeText={(value) => {
                                setValuePost(valuePost => ({
                                    ...valuePost, valuePost: value
                                }))
                            }}
                        />
                        {/* show images */}
                        {arrImages.map((value, index) => (

                            <View
                                key={index}
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                {/* images selected */}
                                <Image key={index} source={{ uri: value.assets[0].uri }} style={{ width: 400, height: 400, marginTop: 25 }} />
                                {/* icon remove images */}
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: 5 }}
                                    onPress={() => {
                                        const arr = [...arrImages];
                                        arr.splice(index, 1);
                                        setArrImages(arr);
                                    }}
                                >
                                    <Image
                                        style={{ height: 23, width: 23, }}
                                        source={require('../../assets/iconcancel.png')} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView><View
            style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'white',
                // borderTopLeftRadius: 10,
                // borderTopRightRadius: 10,
                width: "100%",
                // borderWidth: 1,
                paddingVertical: 5,
            }}
        >
                {/* View color */}
                {
                    arrImages.length < 1 && (
                        <View
                        >
                            <FlatList
                                data={arrBackgroundColor}
                                keyExtractor={item => item.id}
                                contentContainerStyle={{ flexDirection: 'row' }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    marginBottom: 10,
                                    marginTop: 5
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            keyExtractor={index}
                                            style={{
                                                marginHorizontal: 10,
                                                paddingVertical: 5
                                            }}
                                            onPress={() => {
                                                setValuePost(valuePost => ({
                                                    ...valuePost, backgroundColorPost: item.color
                                                }));
                                            }}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor: item.color,
                                                    height: 30,
                                                    width: 30,
                                                    shadowColor: 'black',
                                                    shadowOffset: { width: 10, height: 10 },
                                                    shadowOpacity: 0,
                                                    shadowRadius: 3,
                                                    elevation: 4,
                                                    borderRadius: 10,
                                                }}
                                            />


                                        </TouchableOpacity>
                                    );
                                }} />
                        </View>
                    )
                }
                {/* View option */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                >
                    {/* library images  */}
                    <TouchableOpacity
                        onPress={openLibraryImages}
                    >
                        <Image style={styles.sizeIconOption} source={require('../../assets/iconimage.png')} />
                    </TouchableOpacity>

                    {/* tag friend */}
                    <TouchableOpacity>
                        <Image style={styles.sizeIconOption} source={require('../../assets/icontag.png')} />
                    </TouchableOpacity>

                    {/* address */}
                    <TouchableOpacity>
                        <Image style={styles.sizeIconOption} source={require('../../assets/iconlocation.png')} />
                    </TouchableOpacity>
                </View>
            </View></>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sizeIconOption: {
        height: 30,
        width: 30
    }
})