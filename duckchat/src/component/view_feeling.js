import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function View_feeling({navigate}) {
    return (
        <View>
            {/*  View cam nghi */}
            <View
                style={{
                    // height: "10%",
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10
                }}
            >
                {/* avatar */}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 0.2,
                        marginHorizontal: 10
                    }}
                >
                    <Image
                        resizeMode='stretch'
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 50,
                        }}
                        source={require("../../assets/backgroundapp.jpg")} />
                </TouchableOpacity>

                {/* input cam nghi */}
                <TouchableOpacity
                    style={{
                        flex: 0.8,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        marginHorizontal: 10,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#B5B5B5'
                    }}
                    onPress={() => {
                        navigate("Screen_Postanarticle")
                    }}
                >
                    <Text>Bạn đang nghĩ gì</Text>
                </TouchableOpacity>
            </View>

            {/* View tin tuc */}
        </View>
    )
}

const styles = StyleSheet.create({})