import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from 'react-native'
import React, { useState, useEffect } from 'react'

// import item friend request
import Item_FriendRequest from '../component/item_friendrequest'

// import RestfullApi
import { RestFulApi } from '../service/RestFulApi'

// import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Screen_Friend({ navigation: { navigate } }) {
  // khởi tạo biến api
  const api = new RestFulApi()

  // loading 
  const [isLoading, setIsLoading] = useState(false)

  // thông tin người dùng
  const [informationUser, setInformationUser] = useState(null)

  // danh sach yeu cau ket ban
  const [arr_FriendRequest, setArr_FriendRequest] = useState([])

  // offset
  const [valueParamLimit, setValueParamLimit] = useState({ offset: 0, limit: 8 })

  useEffect(() => {

    if (!informationUser) {
      // gọi hàm lấy thông tin người dùng trong AsyncStorage
      getInformationUser_AsyncStorage()
    }
    else {
      if (isLoading) {
        getFriendRequestList()
      }
    }
    // hàm lấy thông tin người dùng thông qua AsyncStorage
    async function getInformationUser_AsyncStorage() {
      try {
        const informationString = await AsyncStorage.getItem("@informationUser")
        if (informationString) {
          setInformationUser(JSON.parse(informationString))
          console.log(informationString)
        }
      } catch (error) {
        console.log("Lỗi lấy thông tin người dùng thông qua AsyncStorage tại Tab_Home: " + error)
      }
    }

  }, [informationUser, isLoading])

  // hàm lấy danh sách yêu cầu kết bạn
  const getFriendRequestList = async () => {
    // goi api yeu cau lay danh sach ket ban
    if (isLoading) {
      console.log("gọi api lấy danh sách khi isLoading là true")
      const result = await api.getFriendRequestList(informationUser[0].iduser, valueParamLimit.offset, valueParamLimit.limit)
      // neu danh sach khong bi rong
      if (result.length > 0) {
        setIsLoading(false)
        setArr_FriendRequest(prev => [...prev, ...result])
        setValueParamLimit(prev => ({
          ...prev, offset: valueParamLimit.offset + valueParamLimit.limit
        }))
      }
      else {
        setIsLoading(false)
        setValueParamLimit(prev => ({
          ...prev, offset: -1
        }))
      }
    }
    else {
      setIsLoading(false)
    }
  }

  // hàm chấp nhận yêu cầu kết bạn
  const btnAcceptFriendRequest = async (id_request) => {
    const resultCallApi = api.setAcceptFriendRequest(id_request)
    if (resultCallApi) {
      let arr = [...arr_FriendRequest]
      arr = arr.filter(item => item.id_request !== id_request)
      setArr_FriendRequest(arr)
      console.log(arr)
    }

  }

  return (
    // danh sách kết bạn
    <FlatList
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}
      data={arr_FriendRequest}
      keyExtractor={(item) => item.id_request}
      showsVerticalScrollIndicator={false}

      onEndReached={() => {
        //  kiểm tra nếu offset >= 0 thì thực hiện truy vấn lấy danh sách
        if (valueParamLimit.offset >= 0) {
          setIsLoading(true)
        }
      }}

      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => {
        setArr_FriendRequest([])
        setValueParamLimit(prev => ({
          ...prev, offset: 0
        }))

        setIsLoading(true)
      }} />}
      renderItem={({ item }) => (

        // layout item friend request and suggestion
        <Item_FriendRequest

          // thông tin item
          item={item}

          // bắt sự kiện chấp nhận lời mời kết bạn
          eventAccept_FriendRequest={() => {

            // gọi hàm bắt sự kiện chấp nhận kết bạn
            btnAcceptFriendRequest(item.id_request)
          }}

          // bắt sự kiện từ chối lời yêu cầu kết bạn

          eventRefuse_FriendRequest={async () => {
            const result = await api.setRefuseFriendRequest(item.id_request)
            if (result) {
              let arr = [...arr_FriendRequest]
              arr = arr.filter(it => it.id_request !== item.id_request)
              setArr_FriendRequest(arr)
            }
          }}

          // bắt sự kiện xoá yêu cầu 
          eventDeleteItemFriendRequest={async () => {
            const result = await api.deleteFriendRequest(informationUser[0].iduser, item.sender_id)
            if (result) {
              let arr = [...arr_FriendRequest]
              arr = arr.filter(it => it.id_request !== item.id_request)
              setArr_FriendRequest(arr)
            }
          }}
        />
      )}

      ListHeaderComponent={
        <View>
          {/* // button xem thêm danh sách bạn bè */}
          <TouchableOpacity
            onPress={() => {
              navigate("Screen_Myfriends", { "inforUser": JSON.stringify(informationUser[0]) })
            }}

          >
            <Text
              style={{
                color: '#000080',
                textDecorationLine: 'underline',
                fontStyle: 'italic',
                alignSelf: 'flex-end',
                marginRight: 20,
                fontSize: 17,
                fontWeight: '400',
                marginTop: 20
              }}>Xem danh sách bạn bè</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginVertical: 10,
              marginHorizontal: 10
            }}
          >Lời mời kết bạn</Text>
          {
            (arr_FriendRequest.length < 1) && (
              <Text
                style={{
                  fontSize: 16,
                  color: '#9C9C9C',
                  fontWeight: '600',
                  textAlign: 'center'
                }}
              >Không có yêu cầu kết bạn</Text>
            )
          }
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({})