import React, { useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, Linking, TextInput } from 'react-native';
import LoginImage from '../../../../assets/images/login/login-bg.jpg';
import Colors from '../../../utils/Colors';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { login } from '../../../services/api';

export default function Login() {
   // State variables for email, password, and error messages
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [showPassword, setShowPassword] = useState(false); 
   const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Get current year
  const currentYear = new Date().getFullYear();

  // Function to handle onPress event for the Tarase Technologies link
  const handleTaraseTechnologiesLink = () => {
    Linking.openURL('https://tarase.com');
  };

  // Function to handle form submission
  const handleLogin = async () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');
  
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }
  
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
  
    // Log the payload being sent
    console.log('Payload:', { email, password });
  
    // Set button text to "Logging In..."
    setIsLoggingIn(true);
  
    try {
      // Make HTTP POST request to login endpoint
      const response = await login(email, password);;
  
      // Reset email and password fields
      setEmail('');
      setPassword('');

      showSuccessAlert()
  
      // Set button text back to "Login"
      setIsLoggingIn(false);
  
      // Handle successful login response
      console.log('Login successful:', response);
  
      // Navigate to the next screen or perform other actions as needed
    } catch (error) {
  
      // Set button text back to "Login"
      setIsLoggingIn(false);

      showErrorAlert('Password or email address is incorrect');
    }    
  
    // Simulate login delay
    setTimeout(() => {
      // Your login logic goes here
      console.log('Email:', email);
      console.log('Password:', password);
  
      // Set button text back to "Login"
      setIsLoggingIn(false);
    }, 2000); // Simulating a 2-second login process
  };

  const showSuccessAlert = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Login successful',
      visibilityTime: 8000,  // 4000ms = 4s
    });
  }; 

  const showErrorAlert = (errorMessage) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: errorMessage,
      visibilityTime: 8000, // 4000ms = 4s
    });
  };
  
  return (
    <ImageBackground
      source={LoginImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={{ fontSize: 27, color: Colors.BLACK, textAlign: 'center', paddingTop: 15, paddingBottom: 20 }}>
            Sign In
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.GRAY}
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor={Colors.GRAY}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={24} color={Colors.GRAY} />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.WHITE }}>
                {isLoggingIn ? "Logging In..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={{ fontSize: 14, textAlign: 'center', color: Colors.WHITE, marginBottom: 5 }}>
            © copywright, Almanissoko {currentYear}
          </Text>
          <TouchableOpacity onPress={handleTaraseTechnologiesLink}>
            <Text style={{ fontSize: 10, textAlign: 'center', color: Colors.WHITE }}>
              Developed by - Tarase Technologies
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '80%',
      backgroundColor: Colors.WHITE,
      borderRadius: 15,
      padding: 25,
      alignItems: 'center',
    },
    input: {
      width: '100%',
      backgroundColor: Colors.GREY,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 10,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: Colors.GREY,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 10,
    },
    passwordInput: {
      flex: 1,
      color: Colors.BLACK,
    },
    button: {
      width: '100%',
      backgroundColor: Colors.PRIMARY,
      borderRadius: 10,
      padding: 15,
      marginTop: 20,
    },
    footer: {
      position: 'absolute',
      bottom: 20,
    },
    error: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
    },
  });
