import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// import fontawesome
import { FontAwesome } from '@expo/vector-icons'

// import AsyncStorage chứa thông tin đăng nhập
import AsyncStorage from '@react-native-async-storage/async-storage'

// import hành động like bài viết ====> Thêm bài viết được like vào trong danh sách
import {
  Insert_Icon_Post,
  Delete_Icon_Post
} from '../redux/actions/likePostAction_Redux'

// import RestFulapi
import { RestFulApi } from '../service/RestFulApi'

// import react-redux
import { useSelector, useDispatch } from 'react-redux'

// import item view post
import Item_viewpost from '../component/item_viewpost'

// import item news
import Item_news from '../component/item_news'
export default function Screen_Personal() {
  // nút bắt sự kiện người dùng muốn hiển thị post hay news
  const [btnPresntPost_or_New, setBtnPresentPost_or_New] = useState({ valueButton: "Post" })

  // thông tin người dùng
  const [informationUser, setInformationUser] = useState(null)

  // danh sách bài viết
  const [arrPosts_IdUser, setArrPosts_IdUser] = useState([])

  // danh sách tin tức
  const [arrNews_IdUser, setArrNews_IdUSer] = useState([])

  // props offer post iduser
  const [propsApi_getAllPosts_idUser, setPropsApi_getAllPosts_idUser] = useState({ offerPosts: 0, offerNews: 0 })

  const [isRefetchData, setIsRefetchData] = useState(false)

  // danh sách bài viết đã được thích
  const arr_MyPostLike = useSelector(state => state.likePost.dataLikePost)

  // dispatch react - redux
  const disPatch = useDispatch();

  // khai báo đối tượng gọi api
  const api = new RestFulApi();

  // arr bạn bè demo
  const arrMyFriend = [
    { id: 1, avatar: require("../../assets/backgroundregister.jpg"), fullName: "Demo AAA" },
    { id: 2, avatar: require("../../assets/backgroundregister.jpg"), fullName: "Demo BBB" },
    { id: 3, avatar: require("../../assets/backgroundregister.jpg"), fullName: "Demo CCC" },
    { id: 4, avatar: require("../../assets/backgroundregister.jpg"), fullName: "Demo DDD" },
    { id: 5, avatar: require("../../assets/backgroundregister.jpg"), fullName: "Demo EEE" },
    //{ id: 6, avatar: require("../../assets/backgroundregister.jpg"), fullName: "Demo FFF" },
  ]

  useEffect(() => {

    // lấy thông tin người dùng
    if (!informationUser) {
      // gọi hàm lấy thông tin người dùng trong AsyncStorage
      getInformationUser_AsyncStorage()
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
        console.log("Lỗi lấy thông tin người dùng thông qua AsyncStorage tại Tab_Personal: " + error)
      }
    }


  }, [])

  // hàm lấy danh sách bài viết
  async function getAllPost_IdUser() {
    const resultApi = await api.getAllPosts_IdUser(informationUser[0].iduser, propsApi_getAllPosts_idUser.offerPosts)
    if (resultApi.length > 0) {
      setArrPosts_IdUser(prevData => [...prevData, ...resultApi])
      setPropsApi_getAllPosts_idUser(prevProp => ({
        ...prevProp, offerPosts: propsApi_getAllPosts_idUser.offerPosts + 4
      }))
    }
    setIsRefetchData(false)
  }

  // hàm lấy danh sách tin tức
  async function getAllNews_IdUser() {
    console.log("getnew: " + propsApi_getAllPosts_idUser.offerNews)
    // gọi api lấy danh sách tin tức (idUser)
    const resultApi = await api.getAllNews_IdUser(informationUser[0].iduser, propsApi_getAllPosts_idUser.offerNews)
    if (resultApi) {
      if (resultApi.length > 0) {
        setArrNews_IdUSer(prev => [...prev, ...resultApi])
        setPropsApi_getAllPosts_idUser(prev => ({
          ...prev, offerNews: prev.offerNews + 4
        }))
      }
    }
    setIsRefetchData(false)
  }

  // hàm kiểm tra item đã thả icon chưa
  const isMyIconFeel = (idPost) => {
    const result = arr_MyPostLike.find(item => item.idPost_LikePost === idPost);
    if (result) {
      return result.nameIcon
    }
    return null
  }

  // hàm cập nhật icon trên database
  const updateIcon_IdPost = (idPost, nameIcon) => {
    console.log("update icon post id user")

  }

  // hàm xoá icon cảm xúc
  const deleteIcon_IdPost = (idPost) => {
    const resultApi = api.deleteIconFeelToPost(informationUser[0].iduser, idPost)
    if (resultApi) {
      disPatch(Delete_Icon_Post(idPost))
      const arr = [...arrPosts_IdUser]
      let index = arr.findIndex(item => item.idPost === idPost)
      arr[index].quantityLike -= 1
      setArrPosts_IdUser(arr)
      return true
    }
    return false
  }

  // hàm thả icon bài viết
  const likePost = async (idPost, nameIcon) => {
    let resultFeelIcon = await api.insertIconFeelToPost(informationUser[0].iduser, idPost, nameIcon)
    if (resultFeelIcon) {
      disPatch(Insert_Icon_Post(idPost, nameIcon))
      const arr = [...arrPosts_IdUser];

      let index = arr.findIndex(item => item.idPost === idPost)
      arr[index].quantityLike += 1
      setArrPosts_IdUser(arr)
    }
  }

  // hàm refresh data người đăng
  const refetchData = useCallback(() => {
    setIsRefetchData(true)
    if (btnPresntPost_or_New.valueButton === "Post") {
      setArrPosts_IdUser([])
      setPropsApi_getAllPosts_idUser(prev => ({
        ...prev, offerPosts: 0
      }))
      getAllPost_IdUser()
    }
    else {
      setArrNews_IdUSer([])
      setPropsApi_getAllPosts_idUser(prev => ({
        ...prev, offerNews: 0
      }))
      getAllNews_IdUser()
    }
  })
  return (
    <FlatList
      data={btnPresntPost_or_New.valueButton === "Post" ? arrPosts_IdUser : arrNews_IdUser}
      keyExtractor={(item) => btnPresntPost_or_New.valueButton === "Post" ? item.idPost : item.idNews}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if (btnPresntPost_or_New.valueButton === "Post") {
          return (
            <Item_viewpost
              item={item}
              isIconFeel={isMyIconFeel(item.idPost)}
              eventFeelIcon={(idPost, nameIcon) => {
                // cập nhật icon trên database
                if (isMyIconFeel(item.idPost)) {
                  updateIcon_IdPost(idPost, nameIcon)
                }

                // ngược lại ==> Nếu bài viết chưa được thả icon
                else {
                  likePost(idPost, nameIcon)
                }
              }}
              eventDisIconFeel={() => {
                return deleteIcon_IdPost(item.idPost)
              }}
            />
          )
        }
        else {
          return (
            // view item news
            <View style={styles.vItemNews}>

              {/* item news */}
              <Item_news item={item} styleMockup={"ItemNews"} />

              {/* thông tin item news */}
              <View style={styles.vInformationItemNews}>
                <Text>Thông tin</Text>
                <Text>Dạng tin: Văn bản</Text>
                <Text>Thời gian đăng bài</Text>
                <Text>Số lượng thích</Text>
                <Text>Số lượng phản hồi</Text>
              </View>
            </View>
          )
        }
      }}
      onEndReached={btnPresntPost_or_New.valueButton === "Post" ? getAllPost_IdUser : getAllNews_IdUser}
      onEndReachedThreshold={0.3}
      refreshControl={<RefreshControl refreshing={isRefetchData} onRefresh={refetchData} />}
      ListHeaderComponent={
        <View>
          {/*view background and avatar  */}
          <View
            style={styles.vBackgroundAndAvatar}
          >
            {/* background */}
            <Image
              source={require("../../assets/backgroundregister.jpg")}
              style={styles.imgBackground}
              resizeMode='stretch'
            />

            {/* avatar */}
            <Image
              source={require("../../assets/iconduck.png")}
              style={styles.imgAvatar}
            />
          </View>

          {/* view information user */}
          <View
            style={styles.vInformation}
          >
            {/* tên người dùng */}
            {
              informationUser && (
                <Text
                  style={styles.txtFullName}
                >{informationUser[0].fullName}</Text>
              )
            }

            {/* quantity friend */}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16
              }}
            >1000 <Text
              style={{
                fontWeight: '400',
                fontSize: 16,
                fontStyle: 'italic'
              }}
            >Bạn bè</Text></Text>

            {/* button thêm bản tin */}
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  backgroundColor: '#836FFF',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  marginVertical: 10,
                  textAlign: 'center',
                  color: 'white'
                }}
              > + Thêm vào tin</Text>
            </TouchableOpacity>


            {/* View thiết lập và cài đặt trang cá nhân */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 5,
                paddingBottom: 20,
                borderColor: '#828282',

              }}
            >

              {/* button chỉnh sửa trang cá nhân */}
              <TouchableOpacity
                style={[styles.btnEstablishPersonal, {
                  flexDirection: 'row',
                  flex: 0.9,
                  marginRight: 5
                }]}
              >
                <FontAwesome name='pencil' size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600'
                  }}
                >Chỉnh sửa trang cá nhân</Text>
              </TouchableOpacity>

              {/* button cài đặt trang cá nhân*/}
              <TouchableOpacity
                style={[styles.btnEstablishPersonal, { flex: 0.1, marginLeft: 5 }]}
              >
                <FontAwesome name='ellipsis-h' size={20} />
              </TouchableOpacity>

            </View>

            {/* view hiển thị bài viết và tin tức */}
            <View
              style={styles.vPresentPost_News}
            >

              {/* button post */}
              <TouchableOpacity
                style={{
                  marginRight: 10
                }}
                onPress={() => {
                  setBtnPresentPost_or_New(prevBtnSelected => ({
                    ...prevBtnSelected, valueButton: "Post"
                  }))
                }}
              >
                <Text
                  style={btnPresntPost_or_New.valueButton === "Post" ? styles.btnPresent_Selected : styles.btnPresnt_NotSelected}
                >Bài viết</Text>
              </TouchableOpacity>


              {/* button new */}
              <TouchableOpacity
                onPress={() => {
                  setBtnPresentPost_or_New(prevBtnSelected => ({
                    ...prevBtnSelected, valueButton: "New"
                  }))
                }}
              >
                <Text
                  style={btnPresntPost_or_New.valueButton === "New" ? styles.btnPresent_Selected : styles.btnPresnt_NotSelected}
                >Bản tin</Text>
              </TouchableOpacity>
            </View>



            {/* view button present selected is post */}
            {
              btnPresntPost_or_New.valueButton === "Post" && (
                <View
                  style={{
                    paddingVertical: 20
                  }}
                >
                  {/*  --------------------- Chi tiết */}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginHorizontal: 10,
                    }}
                  >Chi tiết</Text>

                  {/* địa chỉ */}
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}>

                    {/* icon home */}
                    <FontAwesome name='home' size={30} color={'#696969'} />

                    {/*text địa chỉ  */}
                    <Text
                      style={{
                        fontSize: 17,
                        marginHorizontal: 10
                      }}
                    >Sống tại {
                        informationUser && (
                          <Text
                            style={{
                              fontWeight: '700'
                            }}
                          > {!informationUser[0].address}</Text>
                        )
                      } </Text>
                  </TouchableOpacity>

                  {/* thông tin giới thiệu */}
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}>

                    {/* icon home */}
                    <FontAwesome name='ellipsis-h' size={30} color={'#696969'} />

                    {/*text địa chỉ  */}
                    <Text
                      style={{
                        fontSize: 17,
                        marginHorizontal: 10
                      }}
                    >Xem thông tin giới thiệu của bạn</Text>
                  </TouchableOpacity>

                  {/*button chỉnh sửa ai mới được xem thông tin cá nhân */}
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        backgroundColor: '#CAE1FF',
                        color: '#27408B',
                        textAlign: 'center',
                        borderRadius: 10
                      }}
                    >Chỉnh sửa chi tiết thông tin</Text>
                  </TouchableOpacity>

                  {/*  ------------------- Bạn bè */}
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 5,
                      borderBottomWidth: 5,
                      paddingBottom: 20,
                      borderColor: '#828282',

                    }}
                  >
                    {/* view header */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* txt title header */}
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}
                      >Bạn bè</Text>

                      {/* button find friend */}
                      <TouchableOpacity>
                        <Text
                          style={{
                            color: "#6959CD"
                          }}
                        >Tìm bạn bè</Text>
                      </TouchableOpacity>
                    </View>

                    {/* số lượng bạn bè */}
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#4F4F4F",

                      }}
                    >1000 người bạn</Text>

                    {/* danh sách bạn bè */}
                    <FlatList
                      data={arrMyFriend}
                      numColumns={3}
                      keyExtractor={(item) => item.id}
                      columnWrapperStyle={{
                        marginVertical: 10
                      }}
                      scrollEnabled={false}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={{
                            width: "30%",
                            alignItems: 'center',
                            marginHorizontal: 5

                          }}
                        >
                          <Image
                            source={item.avatar}
                            resizeMode='stretch'
                            style={{
                              height: 100,
                              width: "100%",
                              borderRadius: 10
                            }}
                          />

                          <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                          >{item.fullName}</Text>
                        </TouchableOpacity>
                      )}
                    />

                    {/* button xem tất cả bạn bè */}
                    <TouchableOpacity

                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          backgroundColor: '#CFCFCF',
                          borderRadius: 10,
                          paddingVertical: 8,
                          textAlign: 'center'
                        }}
                      >Xem tất cả bạn bè</Text>
                    </TouchableOpacity>
                  </View>


                  {/* ---------------------- view bài viết */}
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 5,
                      borderBottomWidth: 5,
                      paddingBottom: 20,
                      borderColor: '#828282',
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}
                    >Bài viết</Text>

                    {/* view post status */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 10
                      }}
                    >
                      {informationUser && (
                        // avatar
                        <Image
                          source={require("../../assets/iconuser.png")}
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            marginRight: 10
                          }}
                        />
                      )}
                      <Text
                        style={{
                          fontSize: 18
                        }}
                      >Bạn đang nghĩ gì?</Text>
                    </TouchableOpacity>

                    {/* reel and livestream */}
                    <View
                      style={{
                        backgroundColor: '#E8E8E8',
                        paddingVertical: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        borderWidth: 0.5,
                        borderRadius: 5
                      }}
                    >
                      {/* Reels */}
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          width: 130,
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          paddingVertical: 5,
                          borderRadius: 20,
                          backgroundColor: 'white'

                        }}
                      >
                        <Image
                          source={require("../../assets/iconreels.png")}
                          style={{
                            height: 30,
                            width: 30
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '500'
                          }}
                        >Thước phim</Text>
                      </TouchableOpacity>

                      {/* liveStream */}
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          width: 130,
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          paddingVertical: 5,
                          borderRadius: 20,
                          backgroundColor: 'white'

                        }}
                      >
                        <Image
                          source={require("../../assets/iconlivestream.png")}
                          style={{
                            height: 30,
                            width: 30
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '500'
                          }}
                        >Phát trực tiếp</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              )
            }
          </View>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  // style view background and avatar
  vBackgroundAndAvatar: {
    height: 220,
  },

  // style image background 
  imgBackground: {
    height: 180,
    width: "100%"
  },

  // style image avatar user
  imgAvatar: {
    height: 90,
    width: 90,
    borderRadius: 50,
    position: 'absolute',
    bottom: 5,
    marginLeft: 10
  },

  // style view information user
  vInformation: {
    marginTop: 10,
    paddingHorizontal: 10
  },

  // style tên người dùng
  txtFullName: {
    fontSize: 25,
    fontWeight: '600'
  },

  // style button establish personal
  btnEstablishPersonal: {
    backgroundColor: "#CFCFCF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10
  },

  // style view present post and news
  vPresentPost_News: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderColor: '#CDC9C9'
  },

  // style button present not selected
  btnPresnt_NotSelected: {
    fontSize: 18,
    color: '#9C9C9C',
    fontWeight: '600'
  },

  // style button presnt selected
  btnPresent_Selected: {
    fontSize: 18,
    color: '#4876FF',
    fontWeight: '400',
    backgroundColor: '#87CEFA',
    borderRadius: 20,
    paddingHorizontal: 10
  },

  // style view item news
  vItemNews: {
    marginVertical: 10,
    height: 230,
    width: "90%",
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#79CDCD',
    paddingVertical: 5,
    paddingHorizontal: 5,
    shadowColor: '#000099',
    shadowOffset: { height: 4, width: -4 },
    elevation: 12
  },

  // style view information ==> item news
  vInformationItemNews: {
    backgroundColor: 'white',
    height: '100%',
    width: '58%',
    borderRadius: 10,
    paddingHorizontal: 10
  }
})