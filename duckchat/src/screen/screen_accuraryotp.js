import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

// firebase recapcha
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

// import firebase
import firebase from 'firebase/compat/app'

// import firebaseconfig
import { firebaseConfig } from '../firebaseconfig'


export default function Screen_AccuraryOtp({ route, navigation: { navigate } }) {
    // thông tin người dùng vừa cung cấp khi đăng ký
    const informationUser = JSON.parse(route.params.informationUser)
    // code  otp
    const [codeOtp, setCodeOtp] = useState("");
    // verticationID
    const [verticationId, setVerticationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [resultAuthencationPhone, setResultAuthencationPhone] = useState({ "numberTimes": 2, "resultAuthen": true })
    const SendCodeOtp = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider.verifyPhoneNumber("+84" + String(informationUser.numberphone).substring(1), recaptchaVerifier.current).then(setVerticationId).catch((error) => {
            console.log(error)
        })
    }
    const confirmOtp = async () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verticationId, codeOtp);
        firebase.auth().signInWithCredential(credential).then(async () => {
            setResultAuthencationPhone(resultAuthencationPhone => ({
                ...resultAuthencationPhone, resultAuthen: true
            }))
            navigate('Screen_EstablishPassword', { "informationUser": JSON.stringify(informationUser) })
        }).catch((error) => {
            setResultAuthencationPhone(resultAuthencationPhone => ({
                ...resultAuthencationPhone, resultAuthen: false
            }))
            Alert.alert("Thông báo", "Xác thực mã OTP bằng số điện thoại không thành công. Vui lòng kiểm tra lại mã OTP")
        })

    }
    useEffect(() => {
        SendCodeOtp()
    }, [])
    return (
        <View
            style={{ flex: 1 }}
        >
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />

            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <View
                    style={styles.container}
                >
                    {/*Image screen */}
                    <Image
                        source={require('../../assets/iconauthenotp.png')}
                        style={styles.imgScreen}
                        resizeMode='stretch'
                    />

                    {/* input code otp */}
                    <TextInput
                        placeholder='X X X X X X'
                        maxLength={6}
                        style={styles.iptOtp}
                        value={codeOtp}
                        keyboardType='number-pad'
                        onChangeText={(value) => {
                            if (!isNaN(value)) {
                                if (value.length >= 6) {
                                    Keyboard.dismiss()
                                }
                                setCodeOtp(value)
                            }

                        }}
                    />

                    {/* txt note */}
                    <Text
                        style={styles.txtNote}
                    >Bạn đang sử dụng phương thức xác thực số mã otp thông qua số điện thoại</Text>

                    {/* btn request send code otp again */}
                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            marginTop: 20,
                        }}
                        onPress={() => {
                            SendCodeOtp()
                            setResultAuthencationPhone(resultAuthencationPhone => ({
                                ...resultAuthencationPhone, numberTimes: resultAuthencationPhone.numberTimes - 1
                            }))
                        }}
                    >
                        <Text
                            style={styles.txtSendCodeOtpAgain}
                        >Yêu cầu gữi lại mã Otp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={confirmOtp}
                        style={{ marginTop: 20, alignSelf: 'center' }}
                    >
                        <Image
                            style={{
                                width: 50,
                                height: 50
                            }}
                            source={require('../../assets/iconcontinue.png')} />
                    </TouchableOpacity>
                    <StatusBar />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    // style image screen
    imgScreen: {
        width: 270,
        height: 170,
        alignSelf: 'center'
    },
    // style input code otp
    iptOtp: {
        fontSize: 30,
        height: 60,
        width: 250,
        alignSelf: 'center',
        textAlign: 'center',
        borderBottomWidth: 2
    },
    // style text note
    txtNote: {
        width: 300,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 50,
        color: '#000099',
        fontSize: 16,
    },
    // style text request send code otp again
    txtSendCodeOtpAgain: {
        fontStyle: 'italic',
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#000066',
        fontWeight: '600'
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
    }
})