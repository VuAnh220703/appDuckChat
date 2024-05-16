import { StyleSheet, View, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// import modal
import Modal from 'react-native-modal'

export default function Modal_chooseiconpost({ isShowModalIco, onClose, iconSelected }) {
    const arrIcon = [
        { id: 0, value: "heart", iconName: require("../../assets/animation_iconheart.gif") },
        { id: 1, value: "sad", iconName: require("../../assets/animation_iconsad.gif") },
        { id: 2, value: "laugh", iconName: require("../../assets/animation_iconlaugh.gif") },
        { id: 3, value: "cry", iconName: require("../../assets/animation_iconcry.gif") },
    ]
    return (
        <Modal
            visible={isShowModalIco.isVisible}
            backdropColor='rgba(220,220,220,1)'
            style={{
                flex: 1,
            }}
        >
            <TouchableWithoutFeedback
                onPress={onClose}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            width: "90%",
                            backgroundColor: 'white',
                            top: isShowModalIco.pageY - 60,
                            borderRadius: 20,
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            flexDirection: 'row',
                            paddingHorizontal: 5
                        }}
                    >
                        {
                            arrIcon.map((value, index) => (

                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        iconSelected(value)
                                        onClose()
                                    }}
                                >
                                    <Image
                                        source={value.iconName}
                                        style={{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                </TouchableOpacity>

                            ))
                        }

                    </View>

                </View>

            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({})