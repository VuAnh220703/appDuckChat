import {ImageBackground, } from 'react-native'
import React, { useEffect } from 'react'

// import Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Screen_Start({ navigation }) {

    useEffect(() => {
        checkLogin()

        async function checkLogin() {
            try {
                if (await AsyncStorage.getItem("@informationUser") !== null) {
                    navigation.replace("navigation_TabsTop")
                }
                else {
                    navigation.replace("Screen_Login")
                }
            } catch (error) {
                console.log("Loi screen login: " + error)
            }
        }
    }, [])
    return (
        <ImageBackground
            style={{
                flex: 1
            }}
            source={require("../../assets/backgroundapp.jpg")}
        >
            {/* <Image /> */}
        </ImageBackground>
    )
}
