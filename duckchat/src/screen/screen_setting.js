import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import React from 'react'

// import icon fontawesome
import { FontAwesome } from '@expo/vector-icons'

// import redux and react - redux
import { useDispatch } from 'react-redux'

// import action clear danh sách bài viết
import {
  clearData,
} from '../redux/actions/postAction_Redux'

// import action xoá danh sách bài viết đã thích
import { clearDataMylikepost } from '../redux/actions/likePostAction_Redux'

export default function Screen_Setting({ navigation }) {
  const dispath = useDispatch()

  // hàm đăng xuất
  const eventLogout = () => {

    dispath(clearData())
    dispath(clearDataMylikepost())
    navigation.reset({
      index: 0,
      routes: [{ name: "Screen_Login" }]
    })
  }
  return (
    <ScrollView
      style={styles.container}>

      {/* view establish information and password */}
      <View style={styles.vEstablishAndPass}>

        {/* logo ứng dụng */}
        <View
          style={styles.vLogo}
        >
          {/* img logo */}
          <Image
            source={require("../../assets/iconduck.png")}
            style={styles.imgLogo}
          />

          {/* title app */}
          <Text style={styles.txtTitle}>DuckChat</Text>
        </View>

        {/* title view establish and password */}
        <Text style={styles.txtTitle_EstablishAndPassword}>Trung tâm tài khoản</Text>

        <Text
          style={{
            fontWeight: '300',
            marginBottom: 10
          }}
        >Quản lý phần cài đặt tài khoản và trải nghiệm kết nối các dịch vụ của DuckChat</Text>

        {/* view establish information */}
        <TouchableOpacity
          style={styles.vItemEstablish}
        >
          <FontAwesome name='address-card-o' size={20} color={'gray'} />
          <Text style={styles.itemTitleEstablish}>Thông tin cá nhân</Text>

        </TouchableOpacity>

        {/* view establish password */}
        <TouchableOpacity
          style={styles.vItemEstablish}
        >
          <FontAwesome name='lock' size={20} color={'gray'} />
          <Text style={styles.itemTitleEstablish}>Mật khẩu và bảo mật</Text>

        </TouchableOpacity>
      </View>

      {/* objects and services */}
      <View style={styles.vObjectAndServices}>
        <Text>Đối tượng và các dịch vụ</Text>

        {/* post */}
        <TouchableOpacity
          style={styles.vItemObjectAndServices}
        >
          <FontAwesome name='plus-square-o' size={20} style={{ flex: 0.1 }} />
          <Text style={styles.itemTitleObjectAndServices}>Bài viết</Text>
        </TouchableOpacity>

        {/* news */}
        <TouchableOpacity
          style={styles.vItemObjectAndServices}
        >
          <FontAwesome name='newspaper-o' size={20} style={{ flex: 0.1 }} />
          <Text style={styles.itemTitleObjectAndServices}>Tin tức</Text>
        </TouchableOpacity>

        {/* reels */}
        <TouchableOpacity
          style={styles.vItemObjectAndServices}
        >
          <FontAwesome name='film' size={20} style={{ flex: 0.1 }} />
          <Text style={styles.itemTitleObjectAndServices}>Reels</Text>
        </TouchableOpacity>

        {/* news */}
        <TouchableOpacity
          style={styles.vItemObjectAndServices}
        >
          <FontAwesome name='heart-o' size={20} style={{ flex: 0.13 }} />
          <Text style={styles.itemTitleObjectAndServices}>Bài viết đã thích</Text>
        </TouchableOpacity>

        {/* block user */}
        <TouchableOpacity
          style={styles.vItemObjectAndServices}
        >
          <Image source={require("../../assets/iconblockuser.png")} style={{ height: 23, width: 23 }} />
          <Text style={styles.itemTitleObjectAndServices}>Danh sách chặn</Text>
        </TouchableOpacity>

        {/* shop ---> my shop */}
        <TouchableOpacity
          style={styles.vItemObjectAndServices}
        >
          <FontAwesome name='shopping-bag' size={20} style={{ flex: 0.1 }} />
          <Text style={styles.itemTitleObjectAndServices}>Mua sắm</Text>
        </TouchableOpacity>

        {/* news */}
        <TouchableOpacity
          style={[styles.vItemObjectAndServices, { justifyContent: 'space-between' }]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image source={require("../../assets/iconstore.png")} style={{ height: 23, width: 23 }} />
            <Text style={styles.itemTitleObjectAndServices}>Shop của tôi</Text>
          </View>
          <Text style={{
            textDecorationLine: 'underline',
            fontStyle: 'italic',
            fontWeight: '300',
            color: "#27408B"
          }}>Đăng ký bán hàng</Text>
        </TouchableOpacity>
      </View>



      {/* button log out */}
      <TouchableOpacity
        onPress={() => {
          eventLogout()
        }}

      >
        <Text style={styles.txtLogout}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  // style view establish account and password
  vEstablishAndPass: {
    height: 200,
    width: "90%",
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  // view logo
  vLogo: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  // img logo
  imgLogo: {
    height: 40,
    width: 40
  },

  // style text tên ứng dụng  title view logo
  txtTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 18
  },

  // style title view establish and password
  txtTitle_EstablishAndPassword: {
    fontSize: 16,
    fontWeight: '600'
  },

  // style view item establish
  vItemEstablish: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center'
  },

  // style text item establish: 
  itemTitleEstablish: {
    color: 'gray',
    marginLeft: 10,
    fontWeight: '300',
    fontSize: 16,
    fontStyle: 'italic'
  },

  // style view objects and services
  vObjectAndServices: {
    marginVertical: 20,
    marginHorizontal: 20
  },

  // style text logout
  txtLogout: {
    alignSelf: 'center',
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#191970',
    fontWeight: 'bold',

  },

  // style view item object and services
  vItemObjectAndServices: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  // style item title object and services
  itemTitleObjectAndServices: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10
  }


})