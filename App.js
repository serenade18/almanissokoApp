import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Start from './app/screens/authscreens/startscreen/start';
import Login from './app/screens/authscreens/loginscreen/login';
import ResetPassword from './app/screens/authscreens/resetpasswordScreen/resetPassword';
import 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './app/services/authProvider'; // Make sure this import path is correct
import DrawerNavigator from './app/navigations/drawerNavigator'; 
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

function AuthStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Reset" component={ResetPassword} />
      </Stack.Navigator>
  );
}

function AppContent() {
  const { user, loading  } = useAuth(); // Use the useAuth hook inside a component wrapped by AuthProvider

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text>Loading...</Text>
        </View>
    );
  }

  return user ? <DrawerNavigator /> : <AuthStack />;

}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Aleo': require('./assets/fonts/Aleo-Regular.ttf'),
    'Aleo-medium': require('./assets/fonts/Aleo-Medium.ttf'),
    'Aleo-bold': require('./assets/fonts/Aleo-Bold.ttf'),
  });

  return (
    <AuthProvider> 
      <NavigationContainer>
        <View style={styles.container}>
          <AppContent />
        </View>
        <StatusBar style="auto" />
        <Toast forwardRef={(ref) => Toast.setRef(ref)} position="bottom" />
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
