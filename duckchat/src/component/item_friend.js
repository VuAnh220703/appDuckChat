import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import React from 'react'

// import fontawesome
import { FontAwesome } from '@expo/vector-icons'

export default function Item_Friend({ item }) {
    return (
        <View style={styles.container}>
            {/* avatar */}
            <Image
                source={require("../../assets/iconuser.png")}
                style={styles.imgAvatar}
            />

            <View style={{ flex: 0.9, marginHorizontal: 10 }}>
                {/* fullName */}
                <Text
                    style={styles.txtFullName}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >{item.fullName} </Text>
            </View>

            <TouchableOpacity style={{ flex: 0.1 }}>
                <FontAwesome name='ellipsis-h' color={'gray'} size={20} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10
    },

    // style avatar bạn bè
    imgAvatar: {
        height: 40,
        width: 40,
        borderRadius: 50,
    },

    // style fullName friend
    txtFullName: {
        fontWeight: '600',
        fontSize: 18,
        flex: 1
    }
})