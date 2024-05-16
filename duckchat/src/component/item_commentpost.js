import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import React from 'react'

export default function Item_CommentPost({ itemComment }) {
    return (
        <View
            style={styles.container}
        >
            {/* {
                itemComment.avatar && (
                    <Image
                     source={{uri: }}
                    />
                )
            } */}
            {/* View thông tin người comment */}
            {/* avatar người dùng */}
            <Image
                source={require("../../assets/iconuser.png")}
                style={styles.imgAvatar}
            />

            {/* view information user comment and value comment */}
            <View
                style={{
                    width: '85%',
                }}
            >
                {/* Tên người dùng */}
                <Text
                    style={styles.txtUserName}
                >{itemComment.fullName}</Text>

                {/* value comment */}
                <Text
                    style={styles.txtValueComment}
                >{itemComment.valueCmt}</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}
                >
                    <TouchableOpacity
                        style={styles.stOptionComment}
                    >
                        <Text>Trả lời</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.stOptionComment}
                    >
                        <Text>Thích</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        flexDirection: 'row',
        marginHorizontal: 5
    },

    // style hình ảnh avatar người dùng  
    imgAvatar: {
        borderRadius: 50,
        height: 40,
        width: 40,
        padding: 4,
        marginRight: 6,
    },

    // style user name 
    txtUserName: {
        color: "#707070",
        fontWeight: '600'
    },

    // style text value comment
    txtValueComment: {
        marginLeft: 5,
        fontSize: 15
    },

    // style option comment user
    stOptionComment: {
        marginHorizontal: 20
    }
})