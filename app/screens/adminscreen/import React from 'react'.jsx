import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Start from './screens/authscreens/startscreen/start';
import Login from './screens/authscreens/loginscreen/login';
import ResetPassword from './screens/authscreens/resetpasswordScreen/resetPassword';
import { AuthProvider, useAuth } from './services/authProvider';
import DrawerNavigator from './navigation/DrawerNavigator'; // Ensure this is the correct path

const Stack = createStackNavigator();

function AppContent() {
  const { user } = useAuth(); // Use the useAuth hook inside a component wrapped by AuthProvider

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        {user ? (
          // Drawer Navigator for all authenticated users
          <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        ) : (
          // Public screens for authentication
          <>
            <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Reset" component={ResetPassword} options={{ headerShown: false }} />
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
