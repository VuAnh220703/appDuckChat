import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import React, { useState } from 'react'
// import datetimePicker
import DateTimePicker from '@react-native-community/datetimepicker'

// import memont
import moment from 'moment'

// import element-dropdown
import { Dropdown } from 'react-native-element-dropdown'

// import location
import * as Location from 'expo-location'

// import validation
import { Validate } from '../../Validate'


export default function Screen_RegisterAccount({ navigation: { navigate } }) {
    // biến giữ vị trí nhập
    const [indexVisibleTitleInput, setIndexVisibleTitleInput] = useState("");
    // Biến show datetimePicker
    const [isShowDatetimePicker, setIsShowDateTimePicker] = useState(false);
    // Biến thông tin cá nhân
    const [informatonRegister, setInformationRegister] = useState({ "fullName": null, "numberphone": null, "birthDate": null, "gender": null, "address": null })
    // bien loading
    const [loading, setLoading] = useState({ "loadingAddress": false, "loadingScreen": false })
    const [isValidateInput, setIsvalidateInput] = useState({ "fullname": true, "numberphone": true, "address": true })
    // Giới tính
    const dataGender = [
        { value: 'Nam' },
        { value: 'Nu' }
    ]
    const cValidate = new Validate();

    // ham lay vi tri hien tai
    const getLocation = async () => {
        try {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                if (status === 'denied') {
                    // Xử lý khi người dùng từ chối cấp quyền
                    Alert.alert(
                        'Quyền từ chối',
                        'Bạn đã từ chối quyền truy cập vị trí. Vui lòng vào cài đặt và cấp quyền truy cập vị trí cho ứng dụng'
                    );
                }
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            const demo = await fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + location.coords.latitude + "&lon=" + location.coords.longitude)
                .then(reponse => reponse.json()).then(data => {
                    setInformationRegister(inforamtonRegister => ({ ...inforamtonRegister, address: data.address.suburb + ", " + data.address.city + "," + data.address.state + ", " + data.address.country }))
                    setLoading(loading => ({ ...loading, loadingAddress: false }))
                }).catch(error =>
                    Alert.alert("Thông báo", "Đã xảy ra lỗi lấy vị trí tự động. Vui lòng thử lại sau"))
            setLoading(loading => ({ ...loading, loadingAddress: false }))

        } catch (error) {
            console.log(error)
            setLoading(loading => ({ ...loading, loadingAddress: false }))
        }
    };

    // ham Event btn continue
    const btnContinue = () => {
        let resultEmpty = Object.values(informatonRegister).some(value => value === null || value == '');
        if (resultEmpty) {
            Alert.alert("Thông báo", "vui lòng cung cấp đầy đủ thông tin, không bỏ trống")
        }
        else {
            resultEmpty = Object.values(isValidateInput).some(value => value = false)
            if (resultEmpty) {
                Alert.alert("Thông báo", "Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại thông tin đăng ký")
            }
            else {
                let jsonStringInformation = JSON.stringify(informatonRegister);
                navigate("Screen_AccuraryOtp", { informationUser: jsonStringInformation })
            }
        }
    }

    return (
        <ScrollView
            style={{
                backgroundColor: '#F5F5F5',
                flex: 1
            }}
        >
            <KeyboardAvoidingView
                style={styles.container}
                enabled={true}
            >
                {/* View content input information */}
                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 30,
                    }}
                >
                    {/* images register */}
                    <Image
                        source={require('../../assets/iconregister.png')}
                        style={{
                            height: 150,
                            width: 150
                        }}
                    />
                    {/* view input full name */}
                    <View
                        style={{
                            height: 60,
                            marginBottom: 15
                        }}
                    >
                        <TextInput
                            placeholder='Họ & Tên ...'
                            style={indexVisibleTitleInput == "fullName" ? styles.iptInformationFocus : styles.iptInformationNotFocus}
                            value={informatonRegister.fullName}
                            onFocus={() => {
                                setIndexVisibleTitleInput("fullName")
                            }}
                            onBlur={() => {
                                setIndexVisibleTitleInput("")
                                setIsvalidateInput(validate => ({
                                    ...validate, fullname: cValidate.isValidateFullName(informatonRegister.fullName)
                                }))
                            }}
                            onChangeText={(value) => {
                                setInformationRegister(inforamtonRegister => ({
                                    ...inforamtonRegister, fullName: value
                                }))
                                setIsvalidateInput(validate => ({
                                    ...validate, fullname: true
                                }))

                            }}
                        />
                        {(isValidateInput.fullname == false && informatonRegister.fullName !== "") && <Text
                            style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontWeight: '400',
                                fontSize: 12,
                            }}
                        >Họ và tên không hợp lệ (Không chứa ký tự đặt biệt)</Text>}
                    </View>

                    {/* view numberphone */}
                    <View
                        style={{
                            height: 60,
                            marginBottom: 15
                        }}
                    >
                        <TextInput
                            placeholder='Số điện thoại ...'
                            maxLength={10}
                            style={indexVisibleTitleInput == "numberphone" ? styles.iptInformationFocus : styles.iptInformationNotFocus}
                            keyboardType='phone-pad'
                            value={informatonRegister.numberphone}
                            onFocus={() => {
                                setIndexVisibleTitleInput("numberphone")
                            }}
                            onBlur={() => {
                                setIndexVisibleTitleInput("")
                                setIsvalidateInput(validate => ({
                                    ...validate, numberphone: cValidate.isValidateNumberphone(informatonRegister.numberphone)
                                }))
                            }}
                            onChangeText={(value) => {
                                setInformationRegister(inforamtonRegister => ({
                                    ...inforamtonRegister, numberphone: value
                                }))
                                setIsvalidateInput(validate => ({
                                    ...validate, numberphone: true
                                }))
                            }}
                        />
                        {(isValidateInput.numberphone == false && informatonRegister.numberphone !== "") && <Text
                            style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontWeight: '400',
                                fontSize: 12,
                            }}
                        >Số điện thoại không hợp lệ</Text>}

                    </View>
                    {/* View birthDate */}
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss()
                            setIndexVisibleTitleInput("")
                            setIsShowDateTimePicker(true)
                        }}
                        style={{
                            backgroundColor: '#EEEEEE',
                            width: 280,
                            height: 42,
                            paddingHorizontal: 5,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 32
                        }}

                    >
                        <Text
                            style={{
                                color: '#777777',

                            }}
                        >Ngày sinh:</Text>
                        <Text
                            style={{
                                color: 'black',
                                fontWeight: '600',
                                fontStyle: 'italic',
                                marginLeft: 25

                            }}
                        >{!informatonRegister.birthDate ? "DD/MM/YYYY" : moment(informatonRegister.birthDate).format("DD") + "/" + moment(informatonRegister.birthDate).format("MM") + "/" + moment(informatonRegister.birthDate).format("YYYY")}</Text>
                    </TouchableOpacity>
                    {isShowDatetimePicker && <DateTimePicker
                        value={!informatonRegister.birthDate ? new Date() : informatonRegister.birthDate}
                        mode='date'
                        display='default'
                        onChange={(event, selectDate) => {
                            if (event.type == "dismissed") {
                                setIsShowDateTimePicker(false)
                            }
                            else {
                                setInformationRegister(inforamtonRegister => ({
                                    ...inforamtonRegister, birthDate: selectDate
                                }))
                                setIsShowDateTimePicker(false)
                            }
                        }}

                    />}

                    {/* view gender */}
                    <View
                        style={{
                            backgroundColor: '#EEEEEE',
                            width: 280,
                            height: 42,
                            paddingHorizontal: 5,
                            borderRadius: 10,
                            marginBottom: 32,
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}
                    >
                        <Text
                            style={{
                                color: '#777777',

                            }}
                        >Giới tính</Text>
                        <Dropdown
                            data={dataGender}
                            style={{ width: 180, height: 40, marginLeft: 40 }}
                            placeholderStyle={{
                                color: '#777777',
                                fontSize: 15,
                                fontStyle: 'italic',
                                fontWeight: '600'

                            }}
                            value={informatonRegister.gender}
                            valueField={"value"}
                            labelField={"value"}
                            placeholder='Chọn giới tính'
                            onChange={(valueSelected) => {
                                setInformationRegister(inforamtonRegister => ({
                                    ...inforamtonRegister, gender: valueSelected.value
                                }))
                            }}
                        />
                    </View>

                    {/* view address */}
                    <View
                        style={{
                            height: 60,
                            marginBottom: 15
                        }}
                    >
                        <TextInput
                            editable={!loading.loadingAddress}
                            placeholder='Địa chỉ'
                            value={informatonRegister.address}
                            style={indexVisibleTitleInput == "address" ? styles.iptInformationFocus : styles.iptInformationNotFocus}
                            numberOfLines={1}
                            onChangeText={(value) => {
                                setInformationRegister(inforamtonRegister => ({
                                    ...inforamtonRegister, address: value
                                }))
                                setIsvalidateInput(validate => ({
                                    ...validate, address: true
                                }))
                            }}
                            onFocus={() => {
                                setIndexVisibleTitleInput("address")
                            }}
                            onBlur={() => {
                                setIndexVisibleTitleInput("")
                                setIsvalidateInput(validate => ({
                                    ...validate, address: cValidate.isValidateAddress(informatonRegister.address)
                                }))

                            }}
                        />
                        {(isValidateInput.address == false && informatonRegister.address !== "") && <Text
                            style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontWeight: '400',
                                fontSize: 12,
                            }}
                        >Địa chỉ không hợp lệ</Text>}
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                marginTop: 4
                            }}
                            onPress={
                                () => {
                                    setLoading(loading => ({ ...loading, loadingAddress: true }))
                                    getLocation()

                                }}
                        >
                            {loading.loadingAddress || <Image
                                style={{
                                    height: 20,
                                    width: 20
                                }}
                                source={require('../../assets/iconaddress.png')} />}
                            {loading.loadingAddress && <ActivityIndicator size={'small'} color={"black"} />}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={btnContinue}
                        style={{ marginTop: 10 }}
                    >
                        <Image
                            style={{
                                width: 50,
                                height: 50
                            }}
                            source={require('../../assets/iconcontinue.png')} />
                    </TouchableOpacity>
                </View>
                <StatusBar />
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    // style input information
    iptInformationNotFocus: {
        backgroundColor: '#EEEEEE',
        width: 280,
        height: 42,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    iptInformationFocus: {
        backgroundColor: '#CCFFFF',
        width: 280,
        height: 40,
        paddingHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green'
    }

})