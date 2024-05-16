import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// import provider
import { Provider } from 'react-redux';

// import store
import store from './src/redux/store';

// import Screen
import Screen_Start from './src/screen/screen_start';
import Screen_Login from './src/screen/screen_login';
import Screen_RegisterAccount from './src/screen/screen_registeraccount';
import Screen_AccuraryOtp from './src/screen/screen_accuraryotp';
import Navigation_TabTop from './src/navigation/navigation_TabTop';
import Screen_Postanarticle from './src/screen/screen_postanarticle';
import Screen_Myfriends from './src/screen/screen_myfriends';
import Screen_DetailUser from './src/screen/screen_detailuser';
import Screen_Postnews from './src/screen/screen_postnews';
import Screen_Postnews_Document from './src/screen/screen_postnews_document';
import Screen_Search from './src/screen/screen_search';
import Screen_Establishpassword from './src/screen/screen_establishpassword';


export default function App() {
  // import stack navigation
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* đăng ký màn hình đầu tiền */}
          <Stack.Screen
            name='Screen_Start'
            component={Screen_Start}
            options={{
              headerShown: false
            }}
          />

          {/* đăng ký màn hình đăng nhập */}
          <Stack.Screen
            name='Screen_Login'
            component={Screen_Login}
            options={{ headerShown: false }}
          />

          {/* đăng ký màn hình đăng ký tài khoản */}
          <Stack.Screen
            name='Screen_RegisterAccount'
            component={Screen_RegisterAccount}
            options={{
              title: 'Tạo tài khoản',
              headerTitleStyle: {
                fontWeight: '600'
              },
              headerTitleAlign: 'center'
            }}
          />

          {/* đăng ký màn hình xác thực mã otp */}
          <Stack.Screen
            name='Screen_AccuraryOtp'
            component={Screen_AccuraryOtp}
          />

          {/* đăng ký màn hình thiết lập mật khẩu */}
          <Stack.Screen
            name='Screen_EstablishPassword'
            component={Screen_Establishpassword}
            options={{
              title: 'Thiết lập mật khẩu',
              headerTitleStyle: {
                fontWeight: '600'
              },
              headerTitleAlign: 'center'
            }}
          />

          {/* đăng ký navigation tab top */}
          <Stack.Screen
            name="navigation_TabsTop"
            component={Navigation_TabTop}
            options={{ headerShown: false }}
          />

          {/* đăng ký màn hình đăng bài viết */}
          <Stack.Screen
            name="Screen_Postanarticle"
            component={Screen_Postanarticle}
            options={{
              title: 'Tạo bài viết',
              headerTitleStyle: {
                fontWeight: '600'
              },
            }}
          />

          {/* đăng ký màn hình đăng tin tức */}
          <Stack.Screen
            name="Screen_Postnews"
            component={Screen_Postnews}
            options={{
              title: 'Tạo tin',
              headerTitleStyle: {
                fontWeight: '600'
              },
            }}
          />

          {/* đăng ký màn hình đăng tin tức dưới dạng văn bản */}
          <Stack.Screen
            name="Screen_Postanews_Document"
            component={Screen_Postnews_Document}
            options={{
              headerShown: false
            }}
          />

          {/* đăng ký màn hình tìm kiếm */}
          <Stack.Screen
            name='Screen_Search'
            component={Screen_Search}
            options={{
              headerShown: false
            }}
          />

          {/* đăng ký màn hình xem danh sách bạn bè */}
          <Stack.Screen
            name='Screen_Myfriends'
            component={Screen_Myfriends}
            options={{
              headerTitle: "Bạn bè",
              headerTitleAlign: 'center'
            }}
          />

          {/*đăng ký màn hình chi tiết thông tin người dùng  */}
          <Stack.Screen
            name='ScreenDetailUser'
            component={Screen_DetailUser}
            options={{
              headerTitle: "",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontSize: 18,
              }
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
