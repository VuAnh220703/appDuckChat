import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useState } from 'react'

// import restfulapi
import { RestFulApi } from '../service/RestFulApi';

// import crytojs
import CryptoJS from 'crypto-js';

export default function Screen_Establishpassword({ route, navigation }) {
    // thông tin người đăng ký
    const informationUser = JSON.parse(route.params.informationUser);

    // nhập mật khẩu
    const [inputPassword, setInputPassword] = useState({ "password": null, "confirmPassword": null })

    // hàm bắt sự kiện đăng ký tài khoản
    const functRegisterUser = async () => {
        if (inputPassword.password !== inputPassword.confirmPassword) {
            Alert.alert("Thông báo", "Vui lòng kiểm tra lại mật khẩu và xác nhận mật khẩu")
        }
        else {
            const hashPassword = CryptoJS.SHA256(inputPassword.password).toString();
            informationUser["password"] = hashPassword
            // gọi api yêu cầu thêm người dùng
            await fetch(RestFulApi.host + RestFulApi.urlRegisterUser, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(informationUser)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        navigation.popToTop()
                    }
                    else {
                        Alert.alert("Thông báo", "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau")
                        navigation.popToTop()
                    }
                }).catch(error => console.log(error))
        }
    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#F8F8FF' }}
        >
            <KeyboardAvoidingView
                style={styles.container}
            >

                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: 30
                    }}
                >
                    {/* input password */}
                    <Text
                        style={styles.titleInput}
                    >Mật khẩu</Text>
                    <View
                        style={styles.vAreaInput}
                    >
                        <Image
                            source={require('../../assets/iconpasswordkey.png')}
                            style={{
                                height: 24,
                                width: 24
                            }}
                        />
                        <TextInput
                            secureTextEntry={true}
                            style={{
                                width: "85%",
                                height: 40,
                                paddingHorizontal: 10
                            }}
                            value={inputPassword.password}
                            placeholder='Mật khẩu'
                            onChangeText={(value) => {
                                setInputPassword(inputPassword => ({
                                    ...inputPassword, password: value
                                }))
                            }}
                        />
                    </View>
                    {/* input confirm password */}
                    <Text
                        style={styles.titleInput}
                    >Xác nhận mật khẩu</Text>
                    <View
                        style={styles.vAreaInput}
                    >
                        <Image
                            source={require('../../assets/iconpasswordkey.png')}
                            style={{
                                height: 24,
                                width: 24
                            }}
                        />
                        <TextInput
                            secureTextEntry={true}
                            value={inputPassword.confirmPassword}
                            placeholder='Xác nhận mật khẩu'
                            onChangeText={(value) => {
                                setInputPassword(inputPassword => ({
                                    ...inputPassword, confirmPassword: value
                                }))
                            }}
                            style={{
                                width: "85%",
                                height: 40,
                                paddingHorizontal: 10
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            marginTop: 30
                        }}
                        onPress={functRegisterUser}
                    >
                        <Text
                            style={styles.btnConfirm}
                        >Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
    , vAreaInput: {
        backgroundColor: '#EEEEEE',
        width: 280,
        height: 42,
        paddingHorizontal: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    // style btn confirm
    btnConfirm: {
        fontSize: 20,
        fontWeight: '600',
        backgroundColor: '#336699',
        color: 'white',
        paddingHorizontal: 50,
        paddingVertical: 7,
        borderRadius: 5
    },
    // style title input
    titleInput: {
        fontSize: 15,
        fontWeight: '600'
    }
})