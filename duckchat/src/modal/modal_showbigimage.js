import { Modal, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// import restfulapi
import { RestFulApi } from '../service/RestFulApi'

export default function Modal_showbigimage({ valueImage, isVisible, onCloseModal }) {
    return (
        <Modal
            style={{
                flex: 1
            }}
            visible={isVisible}
            backdropColor='rgba(220,220,220,0.5)'
        >
            <View
                style={{
                    flex: 1
                }}
            >
                <TouchableOpacity
                    onPress={onCloseModal}
                    style={{
                        right: 20,
                        top: 10,
                        position: 'absolute'
                    }}
                >
                    <Image
                        style={{
                            height: 35,
                            width: 35
                        }}
                        source={require("../../assets/iconcancel.png")} />
                </TouchableOpacity>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        top: 50,
                    }}
                >
                    <Image
                        style={{
                            height: "90%",
                            width: "90%",
                        }}
                        resizeMode='contain'
                        source={{ uri: RestFulApi.host + RestFulApi.url_imagespost_image + "?image=" + valueImage }}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})