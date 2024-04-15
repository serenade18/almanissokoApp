
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Start from './app/screens/authscreens/startscreen/start';
import Login from './app/screens/authscreens/loginscreen/login';
import ResetPassword from './app/screens/authscreens/resetpasswordScreen/resetPassword';
import 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './app/services/authProvider'; // Make sure this import path is correct
import DrawerNavigator from './app/navigations/drawerNavigator'; 


const Stack = createStackNavigator();

function AppContent() {
  const { user } = useAuth(); // Use the useAuth hook inside a component wrapped by AuthProvider

  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Reset" component={ResetPassword} />
          </>
        )}
      </Stack.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider> 
      <NavigationContainer>
        <AppContent />
        <StatusBar style="auto" />
        <Toast forwardRef={(ref) => Toast.setRef(ref)} position="top" />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bac9a9',
    paddingTop: 40,
  },
});
