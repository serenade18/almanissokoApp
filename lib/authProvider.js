// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loadUser } from './actions';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         if (storedToken) {
//           setToken(storedToken);
//           const userDetails = await loadUser(storedToken);
//           setUser(userDetails);
//         }
//       } catch (error) {
//         console.error('Authentication initialization failed', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, token, setToken, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser } from './actions';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you are using React Navigation

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const userDetails = await loadUser(storedToken);
          setUser(userDetails);
        }
      } catch (error) {
        console.error('Authentication initialization failed', error);
        Alert.alert(
          'Session Expired',
          'Please login',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('index'), // Change 'IndexScreen' to your actual index screen name
              style: 'Ok',
            },
          ],
          { cancelable: false }
        );
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [navigation]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
