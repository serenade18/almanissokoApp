import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Start from './app/screens/authscreens/startscreen/start';
import Login from './app/screens/authscreens/loginscreen/login';
import ResetPassword from './app/screens/authscreens/resetpasswordScreen/resetPassword';
import Dashboard from './app/screens/adminscreen/dashboard';
import Home from './app/screens/homescreen/home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Reset" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="AdminScreen" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </View>
      <StatusBar style="auto" />
      <Toast forwardRef={(ref) => Toast.setRef(ref)} position="bottom" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bac9a9',
    paddingTop: 40,
  },
});