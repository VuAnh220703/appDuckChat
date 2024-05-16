import { StyleSheet, View, Image, StatusBar } from 'react-native'
import React, { useState } from 'react'

// import navigation top tabs
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import headerhome
import HeaderHome from '../component/headerhome';

// import all screen tabs
import Screen_Home from '../screen/screen_home';
import Screen_Friend from '../screen/screen_friend';
import Screen_Personal from '../screen/screen_personal';
import Screen_Notificational from '../screen/screen_notificational';
import Screen_Setting from '../screen/screen_setting';

export default function Navigation_TabTop({navigation: {navigate}}) {
    const Tab = createMaterialTopTabNavigator();
    const [isSwipeoutEnable, setSwipeoutEnable] = useState(false)
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            {/* header home  */}
            <HeaderHome navigate={navigate} />

            {/* tab layout header */}
            <Tab.Navigator
                swipeEnabled={isSwipeoutEnable}
                screenOptions={({ navigation, route }) => {
                    if (route.name === 'Friend' && navigation.isFocused()) {
                        setSwipeoutEnable(false);
                    } else if (route.name !== 'Friend' && navigation.isFocused()) {
                        setSwipeoutEnable(true);
                    }
                }}>

                <Tab.Screen
                    name="Screen_Home"
                    component={Screen_Home}
                    options={() => ({
                        tabBarIcon: ({ color, size }) => (
                            <Image
                                style={[styles.sizeIconTabbar, { tintColor: color }]}
                                source={require("../../assets/iconhome.png")} />
                        ),
                        tabBarShowLabel: false,
                    })}

                />
                <Tab.Screen
                    name="Screen_Friend"
                    component={Screen_Friend}
                    options={{
                        tabBarIcon: () => (
                            <Image
                                style={styles.sizeIconTabbar}
                                source={require("../../assets/iconfriend.png")} />
                        ),
                        tabBarShowLabel: false
                    }}

                />
                <Tab.Screen
                    name="Screen_Personal"
                    component={Screen_Personal}
                    options={{
                        tabBarIcon: () => (
                            <Image
                                style={styles.sizeIconTabbar}
                                source={require("../../assets/iconuser.png")} />
                        ),
                        tabBarShowLabel: false
                    }}

                />
                <Tab.Screen
                    name="Screen_Notificational"
                    component={Screen_Notificational}
                    options={{
                        tabBarIcon: () => (
                            <Image
                                style={styles.sizeIconTabbar}
                                source={require("../../assets/iconnotification.png")} />
                        ),
                        tabBarShowLabel: false
                    }}

                />
                <Tab.Screen
                    name="Screen_Setting"
                    component={Screen_Setting}
                    options={{
                        tabBarIcon: () => (
                            <Image
                                style={styles.sizeIconTabbar}
                                source={require("../../assets/iconoption.png")} />
                        ),
                        tabBarShowLabel: false
                    }}

                />

            </Tab.Navigator>
            <StatusBar />
        </View>
    )
}
const styles = StyleSheet.create({
    sizeIconTabbar: {
        height: 30,
        width: 30,
        alignSelf: 'center'
    }
})