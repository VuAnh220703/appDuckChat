import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'

// import fontawesome
import { FontAwesome } from '@expo/vector-icons'

// import linearGradient
import { LinearGradient } from 'expo-linear-gradient'

// import medialibrary
import * as MeadiaLibrary from 'expo-media-library'

export default function Screen_Postnews({ navigation: { navigate } }) {

  const [mediaLibrary, setMeadiLibrary] = useState([])
  useEffect(() => {
    getFileImagesInLibrary()
  }, [])

  const getFileImagesInLibrary = async () => {
    // xin cấp quyền truy cập thư viện thiết bị
    const { status } = await MeadiaLibrary.requestPermissionsAsync();
    if (status == "granted") {
      const media = await MeadiaLibrary.getAssetsAsync({
        mediaType: 'photo'
      });
      setMeadiLibrary(media.assets)
      console.log(mediaLibrary)
    }
    else {
      Alert.alert("Thông báo", "Vui lòng cấp quyền truy cập thư viện")
    }
  }
  return (

    <FlatList
      data={mediaLibrary}
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
        marginTop: 1
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{
              height: 100,
              width: "33%",
            }}
          >
            <Image
              key={item.id}
              source={{ uri: item.uri }}
              style={{
                flex: 1
              }}
            />
          </TouchableOpacity>
        )
      }}
      ListHeaderComponent={() => {
        return (
          <View
            style={{
              marginBottom: 10
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginTop: 5,
                justifyContent: 'space-around'
              }}
            >
              {/* nut them tin van ban */}
              <TouchableOpacity
                onPress={() => {
                  navigate("Screen_Postanews_Document")
                }}
              >
                <LinearGradient
                  style={{
                    width: 100,
                    height: 150,
                    backgroundColor: '#660099',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  colors={['#660099', '#FF66FF', '#FF33CC']}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 60,
                      paddingHorizontal: 10,
                      paddingVertical: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >Aa</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: 'white'
                    }}
                  >Văn bản</Text>
                </LinearGradient>

              </TouchableOpacity>

              {/* nut them nhac */}
              <TouchableOpacity
              >
                <LinearGradient
                  style={{
                    width: 100,
                    height: 150,
                    backgroundColor: '#660099',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  colors={['#33CC66', '#FF99FF', '#3399FF']}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 60,
                      paddingHorizontal: 10,
                      paddingVertical: 10
                    }}
                  >
                    <FontAwesome name='music' size={26} />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: 'white'
                    }}
                  >Âm nhạc</Text>
                </LinearGradient>

              </TouchableOpacity>

              {/* nut them  */}
              <TouchableOpacity
              >
                <LinearGradient
                  style={{
                    width: 100,
                    height: 150,
                    backgroundColor: '#660099',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  colors={['#B0E2FF', '#1E90FF']}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 60,
                      paddingHorizontal: 10,
                      paddingVertical: 10
                    }}
                  >
                    <Image
                      style={{
                        height: 25,
                        width: 25
                      }}
                      source={require("../../assets/icon_infinite.png")} />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: 'white'
                    }}
                  >Boomerang</Text>
                </LinearGradient>

              </TouchableOpacity>
            </View>

            {/* View library  */}
            <View
              style={{
                marginTop: 10,
                alignItems: 'flex-end'
              }}>
              <TouchableOpacity
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 140,
                    justifyContent: 'space-around',
                    paddingVertical: 5,
                    borderRadius: 20,
                    borderWidth: 2,
                    marginRight: 20
                  }}
                >
                  <FontAwesome name='file-picture-o' size={20} />
                  <Text>Chọn nhiều file</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({})