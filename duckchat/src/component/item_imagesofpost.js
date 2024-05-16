import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

// import restfulapi
import { RestFulApi } from '../service/RestFulApi'

// import modal hiển thị hình ảnh to
import Modal_showbigimage from '../modal/modal_showbigimage'

export default function Item_imagesofpost({ idPost }) {
    const [arrImages, setArrImages] = useState([])
    const [isShowBigImages, setIsShowBigImages] = useState({ isShow: false, valueShow: null })

    useEffect(() => {
        getImagePostList()
    }, [])

    // hàm lấy danh sách hình ảnh bài đăng
    const getImagePostList = async () => {
        await fetch(RestFulApi.host + RestFulApi.urlGet_imagesPost + "?idPost=" + idPost)
            .then(response => response.json())
            .then(data => {
                setArrImages(data.data)
            })
            .catch(err => console.log(err))
    }
    if (arrImages.length > 0) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}
            >
                <TouchableOpacity
                    key={0}
                    style={{
                        height: 200,
                        flex: arrImages.length === 1 ? 1 : 0.49
                    }}
                    onPress={() => {
                        setIsShowBigImages({ isShow: true, valueShow: arrImages[0].urlMediaPodt })
                    }}
                >
                    <Image
                        style={{
                            flex: 1
                        }}
                        source={{ uri: RestFulApi.host + RestFulApi.url_imagespost_image + "?image=" + arrImages[0].urlMediaPodt }}
                    />
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: 'column',
                        flex: arrImages.length < 2 ? 0 : 0.49,
                        justifyContent: 'space-evenly'
                    }}
                >
                    {
                        arrImages.map((value, index) => {
                            if (index > 0) {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            height: arrImages.length === 2 ? 200 : 98,
                                            width: "100%"
                                        }}

                                        onPress={() => {
                                            setIsShowBigImages({ isShow: true, valueShow: value.urlMediaPodt })
                                        }}
                                    >
                                        <Image
                                            style={{
                                                flex: 1
                                            }}
                                            source={{ uri: RestFulApi.host + RestFulApi.url_imagespost_image + "?image=" + value.urlMediaPodt }} />
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>
                <Modal_showbigimage
                    valueImage={isShowBigImages.valueShow}
                    isVisible={isShowBigImages.isShow}
                    onCloseModal={() => {
                        setIsShowBigImages(isShowBigImages => ({
                            ...isShowBigImages, isShow: false
                        }))
                    }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({})