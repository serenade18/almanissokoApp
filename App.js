import React, { Suspense, lazy } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Skeleton from './Skeleton';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer

// Lazy load the Login component
const Start = lazy(() => import('./app/screens/authscreens/startscreen/start'));
const Login = lazy(() => import('./app/screens/authscreens/loginscreen/login'))

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* Use Suspense to handle the loading state while the Start component is being loaded */}
        <Suspense fallback={<Skeleton />}>
          <Start />
          <Login />
        </Suspense>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50
  },
});