import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'

export default function Modal_optionaddpost({ isVisible, onClose, navigate }) {
  // danh sách tuỳ chọn đăng bài
  const dataOption = [
    { id: 0, icon: require('../../assets/iconpost.png'), title: 'Bài viết' },
    { id: 1, icon: require('../../assets/iconnews.png'), title: 'Tin tức' },
    { id: 2, icon: require('../../assets/iconreels.png'), title: 'Thước phim' },
    { id: 3, icon: require('../../assets/iconlivestream.png'), title: 'Phát trực tiếp' },
  ]
  const funcTouchItems = (id) => {
    onClose()
    if (id == 0) {
      navigate('Screen_Postanarticle')
    }
    else if (id == 1) {
      navigate('Screen_Postnews')
    }
  }
  return (
    <Modal
      style={{ flex: 1 }}
      isVisible={isVisible}
      backdropColor='rgba(220,220,220,0.5)'
    >
      <TouchableWithoutFeedback
        onPress={onClose}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end'
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: '60%',
              marginTop: '15%',
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 5
            }}
          >
            {dataOption.map((value, index) => {
              return (
                <TouchableOpacity
                  style={styles.vItemOption}
                  key={value.id}
                  onPress={() => {
                    funcTouchItems(value.id)
                  }}
                >
                  <Image
                    style={styles.sizeIcon}
                    source={value.icon} />
                  <Text
                    style={styles.titleItemOption}
                  >{value.title}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  vItemOption: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    marginVertical: 7,
    paddingVertical: 3
  },
  sizeIcon: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  titleItemOption: {
    fontSize: 18,
    color: '#4F4F4F',

  }
})