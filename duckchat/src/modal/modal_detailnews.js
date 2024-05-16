import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

// import modal
import Modal from 'react-native-modal'

// import restfulapi
import { RestFulApi } from '../service/RestFulApi'

// import item news
import Item_news from '../component/item_news'
export default function Modal_DetailNews({ arrNews, indexSelected, isVisible, onCloseModal }) {
  const [index, setIndex] = useState(indexSelected)

  const flatListRef = useRef();

  const { width } = Dimensions.get('window');
  const ITEM_SIZE = width * 0.8;
  const ITEM_HEIGHT = 500;
  const SPACING = 10;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      flatListRef.current.scrollToIndex({ index: index, animated: false });
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      style={styles.container}
    >

      <View style={styles.container}>

        {/* view header */}
        <TouchableOpacity
          onPress={() => {
            onCloseModal()
          }}
          style={{
            height: 40,
            width: 40,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 40,
            marginBottom: 10
          }}
        >
          <Image
            source={require("../../assets/iconcancel.png")}
            style={{
              height: 30,
              width: 30
            }}
          />
        </TouchableOpacity>

        <Animated.FlatList
          ref={flatListRef}
          data={arrNews}
          keyExtractor={(item) => item.idNews}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          snapToInterval={ITEM_SIZE + 2 * SPACING}
          decelerationRate={2}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index: itemIndex }) => {
            const inputRange = [
              (itemIndex - 1) * (ITEM_SIZE + 2 * SPACING),
              itemIndex * (ITEM_SIZE + 2 * SPACING),
              (itemIndex + 1) * (ITEM_SIZE + 2 * SPACING),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
            });

            return (
              <Animated.View
                key={item.idNews}
                style={{
                  transform: [{ scale }],
                  width: ITEM_SIZE,
                  height: ITEM_HEIGHT,
                  margin: SPACING,
                  backgroundColor: 'white',
                  borderRadius: 20
                }}
              >
                {/* view header */}
                <View style={{ flex: 1 }}>
                  <Item_news item={item} styleMockup={"DetailNews"} />
                </View>
              </Animated.View>
            );
          }}
          getItemLayout={() => (
            { length: ITEM_HEIGHT, offset: 305 * index, index }
          )}
        />

      </View>

    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // view header
  vHeader: {
    flexDirection: 'row'
  }
})