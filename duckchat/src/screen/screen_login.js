import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import React,{useState} from 'react'

// import validate
import { Validate } from '../../Validate'

// import restfulapi
import { RestFulApi } from '../service/RestFulApi'

// import Validator
import { isEmpty } from 'validator'

// import storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Screen_Login({ navigation: { navigate } }) {
  const [inputInformationLogin, setInputInformationLogin] = useState({ "numberphone": null, "password": null })
  const [isValidateInput, setIsValidateInput] = useState({ "numberphone": true, "password": true });
  const cValidate = new Validate()

  const functionLogin = async () => {
    if (isEmpty(inputInformationLogin.numberphone) || isEmpty(inputInformationLogin.password)) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin đăng nhập")
    }
    else {
      await fetch(RestFulApi.host + RestFulApi.urlLoginUser, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputInformationLogin)
      })
        .then(response => response.json())
        .then(async data => {
          if (!data.success) {
            Alert.alert("Thông báo", "Đăng nhập không thành công. Vui lòng kiểm tra lại số điện thoại và mật khẩu")
          }
          else {
            try {
              await AsyncStorage.setItem("@informationUser", JSON.stringify(data.result));
              navigate("navigation_TabsTop")

            } catch (error) {
              Alert.alert("Thông báo", "Đã xảy ra lỗi trong quá trình đăng nhập vui lòng thử lại sau")
            }
          }
        })
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <ImageBackground
          style={
            {
              flex: 1,
              justifyContent: 'center',
            }
          }
          source={require('../../assets/backgroundapp.jpg')}
          resizeMode='stretch'
        >
          {/* View content */}
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
          >
            <View
              style={styles.vContentLogin}
            >
              {/* title screen */}
              <Text
                style={styles.titleScreen}
              >Login</Text>

              {/* View numberphone */}
              <View
                style={{
                  height: 60,
                  marginBottom: 10,
                }}
              >
                <View
                  style={styles.vAreaInputInformationLogin}
                >
                  {/* icon */}
                  <Image
                    source={require('../../assets/iconphone.png')}
                    style={styles.sizeIcon} />

                  {/* input numberphone login */}
                  <TextInput
                    placeholder='Số điện thoại ...'
                    style={styles.sizeInputNumberphone}
                    keyboardType='phone-pad'
                    value={inputInformationLogin.numberphone}
                    onChangeText={(value) => {
                      setInputInformationLogin(inputInformationLogin => ({
                        ...inputInformationLogin, numberphone: value
                      }))
                    }}
                    onBlur={() => {
                      setIsValidateInput(isValidateInput => ({
                        ...isValidateInput, numberphone: cValidate.isValidateNumberphone(inputInformationLogin.numberphone)
                      }))
                    }}
                    onFocus={() => {
                      setIsValidateInput(isValidateInput => ({
                        ...isValidateInput, numberphone: true
                      }))
                    }}
                  />
                </View>
                {
                  (isValidateInput.numberphone == false && inputInformationLogin.numberphone !== "") && <Text
                    style={{
                      color: 'red',
                      fontStyle: 'italic',
                      fontWeight: '500',
                      fontSize: 15,
                      marginLeft: 30
                    }}
                  >Số điện thoại không hợp lệ</Text>
                }
              </View>

              {/* View password */}
              <View
                style={{
                  height: 60,
                  marginBottom: 10,
                }}
              >
                <View
                  style={styles.vAreaInputInformationLogin}
                >
                  {/* icon */}
                  <Image
                    source={require('../../assets/iconpasswordkey.png')}
                    style={styles.sizeIcon} />

                  {/* input password login */}
                  <TextInput
                    placeholder='Mật khẩu ...'
                    style={styles.sizeInputNumberphone}
                    secureTextEntry={true}
                    value={inputInformationLogin.password}
                    onChangeText={(value) => {
                      setInputInformationLogin(inputInformationLogin => ({
                        ...inputInformationLogin, password: value
                      }))
                    }}
                    onBlur={() => {
                      setIsValidateInput(isValidateInput => ({
                        ...isValidateInput, password: (inputInformationLogin.password !== null && inputInformationLogin.password !== "")
                      }))
                    }}
                    onFocus={() => {
                      setIsValidateInput(isValidateInput => ({
                        ...isValidateInput, password: true
                      }))
                    }}
                  />
                </View>
                {
                  isValidateInput.password || <Text
                    style={{
                      color: 'red',
                      fontStyle: 'italic',
                      fontWeight: '500',
                      fontSize: 15,
                      marginLeft: 30
                    }}
                  >Vui lòng nhập mật khẩu</Text>
                }
              </View>

              {/* View option other */}
              <View
                style={styles.vOptionOther}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigate('Screen_RegisterAccount')
                  }}
                >
                  <Text
                    style={styles.txtOptionOther}
                  >Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={styles.txtOptionOther}
                  >Quên mật khẩu</Text>
                </TouchableOpacity>
              </View>

              {/* button login */}
              <TouchableOpacity
                style={{ alignSelf: 'center', marginTop: 50 }}
                onPress={functionLogin}
              >
                <Text
                  style={styles.titleBtnLogin}
                >Đăng nhập</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleScreen: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  //style view content login
  vContentLogin: {
    marginTop: 80,
    height: 350,
    width: 300,
    backgroundColor: 'rgba(204, 255, 255, 0.6)',
    alignSelf: 'center',
    borderRadius: 10,

  },
  // view area input information user login
  vAreaInputInformationLogin: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    marginHorizontal: 15,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF'
  },
  // style icon
  sizeIcon: {
    height: 20,
    width: 20
  },
  //size input information login
  sizeInputNumberphone: {
    width: 230,
    height: 40,
  },
  // view option other
  vOptionOther: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  // style text option other
  txtOptionOther: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: '#000055'
  },
  // style login
  titleBtnLogin: {
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: '#336699',
    color: 'white',
    paddingHorizontal: 50,
    paddingVertical: 7,
    borderRadius: 5
  }
})