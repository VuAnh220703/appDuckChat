import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'

// import item images of post
import Item_imagesofpost from './item_imagesofpost'

// import fontawesome
import { FontAwesome } from '@expo/vector-icons'

// import modal hiển thị các icon khác sẻ được chọn trong bài viết
import Modal_chooseiconpost from '../modal/modal_chooseiconpost'

// import modal hiển thị danh sách commnet bài viết
import Modal_DetailCommentPost from '../modal/modal_detailcommentpost'

// import react-redux
import { useSelector, } from 'react-redux'

export default function Item_viewpost({ item, isIconFeel, eventFeelIcon, eventDisIconFeel, isEventComment }) {
    
  // hiển thị danh sách các icon cảm xúc bài viết ---> modal
  const [isShowModalIco, setIsShowModalIcon] = useState({ isVisible: false, pageX: 0, pageY: 0 })

  // hiển thị modal comment
  const [isPropsModalCommentPost, setIsPropModalCommentPost] = useState({ isVisible: false, idPost: 0 })

  // lưu giá trị icon vừa được chọn
  const [iconSelec, setIconselec] = useState(null);


  // danh sách icon cảm xúc
  const arr_IconLike = useSelector(state => state.likePost.dataIcon)

  useEffect(() => {
      if (isIconFeel) {

          setIconselec(arr_IconLike.find(it => {
              return it.id === isIconFeel
          }))
      }
  }, [])

  // hàm sự kiện hiển thị nhiều sự lựa chọn icon
  const isShowMulIconSelected = (event) => {
      setIsShowModalIcon(isShowModalIco => ({
          ...isShowModalIco, isVisible: true, pageX: event.nativeEvent.pageX, pageY: event.nativeEvent.pageY
      }))
  }

  return (
      <View
          style={{
              borderTopWidth: 10,
              borderColor: '#E8E8E8',
              paddingVertical: 10,
              paddingHorizontal: 3
          }}
      >

          {/* view thôn tin người đăng bài viết */}
          <View
              style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5
              }}
          >
              {/* avatar */}
              <Image
                  style={{
                      height: 28,
                      width: 28
                  }}
                  source={(item.avatar == null ? require("../../assets/iconuser.png") : require("../../assets/iconusercolor.png"))}
              />

              {/*  Tên người đăng */}
              <Text
                  style={{
                      fontSize: 16,
                      fontWeight: '600',
                      marginLeft: 8
                  }}
              >{item.fullName}</Text>
          </View>

          {/* view nôi dung bài đăng */}
          <View>
              {/* Nôi dùng bài đăng khi có background */}
              {
                  item.backgroundColorPost !== "#FFFFFF" && (
                      <Text
                          style={{
                              backgroundColor: item.backgroundColorPost,
                              minHeight: 200,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              fontSize: 20,
                              fontWeight: '600',
                              color: '#FFFFFF',
                              paddingVertical: 20
                          }}
                      >{item.valuePost}</Text>
                  )
              }

              {/* Nội dùng bài đăng khi không có background */}
              {
                  item.backgroundColorPost == "#FFFFFF" && (
                      <View>
                          <Text style={{ marginLeft: 10, fontSize: 16 }}>{item.valuePost}</Text>

                          {/*hình ảnh đính kèm với bài đăng  */}
                          <Item_imagesofpost idPost={item.idPost} />
                      </View>
                  )
              }

          </View>

          {/* view sum like cmt */}
          <View
              style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  borderBottomWidth: 0.5,
                  paddingVertical: 10,
                  borderColor: '#CFCFCF'
              }}
          >

              {/* view tổng like */}
              <TouchableOpacity
                  style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                  }}
              >
                  <FontAwesome name="heart-o" size={16} color="black" />
                  <Text
                      style={{
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: '600'
                      }}
                  >{item.quantityLike}</Text>
              </TouchableOpacity>

              {/* view tổng cmt */}
              <TouchableOpacity
                  style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                  }}
              >

                  <FontAwesome name="commenting-o" size={16} color="black" />
                  <Text
                      style={{
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: '600'
                      }}
                  >{item.quantityComment}</Text>
              </TouchableOpacity>
          </View>

          {/* view thả icon và view bình luận */}
          <View
              style={{
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5
              }}
          >
              {/* like post */}
              <TouchableOpacity
                  // tuỳ chọn nhiều icon 
                  onLongPress={(event) => {
                      // gọi hàm hiển thị nhiều sự lựa chọn icon
                      isShowMulIconSelected(event)
                  }}
                  // thả cảm xúc nhanh OR thu hồi cảm xúc
                  onPress={() => {
                      // Nếu bài viết chưa thả cảm xúc
                      if (!iconSelec) {
                          setIconselec(arr_IconLike.find(item => item.id === "heart"))

                          //gọi hàm thả cảm xúc icon bài viết ==> thông qua props
                          eventFeelIcon(item.idPost, "heart")
                      }
                      // Ngược lại ===> bài viết đã thả cảm xúc Gọi hàm huỷ bỏ cảm xúc --> từ Props
                      else {
                          const resultDelete = eventDisIconFeel();
                          console.log("result delete icon post: " + resultDelete)
                          if (resultDelete === true) {
                              setIconselec(null)
                          }
                      }
                  }}

              >
                  {
                      iconSelec == null && (
                          <View
                              style={{
                                  flexDirection: 'row',
                                  alignItems: 'center'
                              }}
                          >
                              <FontAwesome name='heart-o' size={25} color={'black'} />
                              <Text>Thích</Text>
                          </View>
                      )
                  }
                  {
                      iconSelec != null && (
                          <View
                              style={{
                                  flexDirection: 'row',
                                  alignItems: 'center'
                              }}
                          >
                              <Image
                                  source={iconSelec.value}
                                  style={{
                                      height: 35, width: 35
                                  }}
                              />
                              <Text>
                                  {iconSelec.id === "heart" ? "Thích" :
                                      (iconSelec.id === "sad" ? "Buồn" :
                                          (iconSelec.id === "cry" ? "Khóc" : "haha"))
                                  }
                              </Text>
                          </View>
                      )
                  }
              </TouchableOpacity>

              {/* cmt post */}
              <TouchableOpacity
                  style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                  }}
                  onPress={() => {
                      setIsPropModalCommentPost(isPropsModalCommentPost => ({
                          ...isPropsModalCommentPost, isVisible: true, idPost: item.idPost
                      }))
                  }}
              >
                  <FontAwesome name='comments-o' size={25} color={'black'} />
                  <Text >Bình luận</Text>
              </TouchableOpacity>

          </View>

          {/* modal  chọn icon cho bài viết */}
          {
              isShowModalIco && (
                  <Modal_chooseiconpost
                      // sự kiện chọn icon trong danh sách icon bài viết
                      iconSelected={(valueIconSelected) => {
                          // thay đổi icon vừa chọn
                          setIconselec(arr_IconLike.find(it => it.id === valueIconSelected.value))
                          //  likePost(item.idPost, valueIconSelected.value)
                          //   viết code thả icon bài viết
                          eventFeelIcon(item.idPost, valueIconSelected.value)
                      }}

                      //thuộc tính ẩn hiện danh sách icon cảm xúc 
                      isShowModalIco={isShowModalIco}

                      // sự kiện đóng danh sách icon cảm xúc
                      onClose={() => {
                          setIsShowModalIcon(isShowModalIco => ({
                              ...isShowModalIco, isVisible: false, pageX: 0, pageY: 0
                          }))
                      }} />
              )
          }

          {/* Modal commnent bài viết */}
          {
              isPropsModalCommentPost.isVisible && (
                  <Modal_DetailCommentPost
                      isVisibleModal={isPropsModalCommentPost.isVisible}
                      eventCloseModal={() => {
                          setIsPropModalCommentPost(isPropsModalCommentPost => ({
                              ...isPropsModalCommentPost, isVisible: false
                          }))
                      }}
                      idPost={isPropsModalCommentPost.idPost}
                      isEventComment={(result) => {
                          isEventComment(result)
                      }}
                  />
              )
          }
      </View>
  )
}

const styles = StyleSheet.create({})