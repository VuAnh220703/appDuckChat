import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'

// import restfulapi
import { RestFulApi } from '../service/RestFulApi'

export default function Item_news({ item, styleMockup }) {
  const [detailNews, setDetailNews] = useState(null);
  const [valueCmt, setValueCmt] = useState(null)

  useEffect(() => {
    getDetailNews()
    // hàm lấy chi tiết thông tin tin tức
    async function getDetailNews() {
      let rApi = new RestFulApi()
      // Nếu là tin tức danh văn bản
      if (item.idTypeNews == 1) {
        let resultCallApi = await rApi.getNews_Document(item.idNews)
        if (resultCallApi) {
          // console.log("TT: " + JSON.stringify(resultCallApi))
          setDetailNews(resultCallApi)
        }
      }
    }
  }, [])
  const mockup_ItemNews_Document = (data) => {

    if (styleMockup === "ItemNews") {
      return (
        <View
          style={styles.vMockupItemNews_Document_NotDetail}
        >
          <ImageBackground
            source={{ uri: RestFulApi.host + "/news/imagebackground?namebackground=" + data.valueBackgroundNews }}
            style={{
              flex: 1,
              paddingVertical: 5,
              paddingHorizontal: 10,

            }}
            imageStyle={{
              borderRadius: 20,
            }}

          >
            <View
              style={{ flex: 1, justifyContent: 'flex-end' }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  paddingVertical: 5,
                  color: '#B0E0E6',
                  fontWeight: '600'
                }}
              >{data.valueNewDocument}</Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 13,
                  bottom: 10,
                  color: 'white',
                }}
              >{item.fullName}</Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5,
                position: 'absolute',
                marginTop: 5
              }}
              onPress={() => {
                console.log("Chuyển sang trang thông tin cá nhân người đăng tin tức")
              }}
            >
              {/* Avatar người đăng */}
              <Image
                resizeMode='stretch'
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                }}
                source={require("../../assets/iconuser.png")} />
            </TouchableOpacity>
          </ImageBackground>

        </View>
      )
    }

    else if (styleMockup === "DetailNews") {
      return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

          <View
            style={styles.vMockupItemNews_Document_Detail}
          >
            <ImageBackground
              source={{ uri: RestFulApi.host + "/news/imagebackground?namebackground=" + data.valueBackgroundNews }}
              style={{
                flex: 1,
                paddingVertical: 5,
                paddingHorizontal: 10,

              }}
              imageStyle={{
                borderRadius: 20,
              }}

            >
              <View
                style={{ flex: 1, justifyContent: 'flex-end' }}
              >
                <Text
                  style={{
                    flex: 1,
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    paddingVertical: 5,
                    color: '#B0E0E6',
                    fontWeight: '600',
                    fontSize: 30
                  }}
                >{data.valueNewDocument}</Text>
              </View>


              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                  position: 'absolute',
                  marginTop: 5,
                  flexDirection: 'row'
                }}
                onPress={() => {
                  console.log("Chuyển sang trang thông tin cá nhân người đăng tin tức")
                }}
              >
                {/* Avatar người đăng */}
                <Image
                  resizeMode='stretch'
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                  }}
                  source={require("../../assets/iconuser.png")} />
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 18,
                    bottom: 10,
                    color: 'white',
                    marginLeft: 10

                  }}
                >{item.fullName}</Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  bottom: '8%',
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 10

                }}
              >
                <TextInput
                  placeholder='Thêm bình luận ...'
                  value={valueCmt}
                  style={styles.sInput}
                  onChangeText={(text) => {
                    setValueCmt(text)
                  }}
                />

                <Image
                  source={require("../../assets/iconsend.png")}
                  style={{
                    height: 30, width: 30
                  }}
                />
              </View>
            </ImageBackground>
          </View>


        </KeyboardAvoidingView>
      )
    }
  }

  return (
    <View
      style={styles.container}
    >
      {
        (detailNews !== null && item.idTypeNews == 1) && (
          mockup_ItemNews_Document(detailNews)
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  // style mockup item news document ===> not detail
  vMockupItemNews_Document_NotDetail: {
    height: 200,
    width: 120,
    marginHorizontal: 5,
  },

  // style mockup item news document ===>  detail
  vMockupItemNews_Document_Detail: {
    flex: 1
  },

  sInput: {
    backgroundColor: '#80F8F8FF',
    height: 40,
    width: '95%',
    borderRadius: 20,
    paddingHorizontal: 5,
    marginRight: 10
  }
})