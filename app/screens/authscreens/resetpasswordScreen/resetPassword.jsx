import React, { useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, Linking, TextInput } from 'react-native';
import LoginImage from '../../../../assets/images/login/login-bg.jpg';
import Colors from '../../../utils/Colors';

export default function ResetPassword() {
  // State variables for email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Get current year
  const currentYear = new Date().getFullYear();

  // Function to handle onPress event for the Tarase Technologies link
  const handleTaraseTechnologiesLink = () => {
    // Replace 'https://tarasetechnologies.com' with the actual URL
    Linking.openURL('https://tarase.com');
  };

  // Function to handle form submission
  const handleLogin = () => {
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

    // Your login logic goes here
    console.log('Email:', email);
    console.log('Password:', password);
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
            Reset Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.GRAY}
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.WHITE }}>
              Submit
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
  
