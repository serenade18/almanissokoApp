import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import LoginImage from '../../../../assets/images/login/login-bg.jpg';
import Colors from '../../../utils/Colors';
import { Feather } from '@expo/vector-icons';

export default function Start() {
  const navigation = useNavigation(); // Get navigation object using useNavigation hook

  // Get current year
  const currentYear = new Date().getFullYear();

  // Function to handle onPress event for the "Let's Get Started" button
  const handleGetStarted = () => {
    navigation.navigate('Login'); // Navigate to the login screen
  };

  const handleResetPassword = () => {
    navigation.navigate('Reset'); // Navigate to the login screen
  };

  // Function to handle onPress event for the Tarase Technologies link
  const handleTaraseTechnologiesLink = () => {
    // Replace 'https://tarasetechnologies.com' with the actual URL
    Linking.openURL('https://tarase.com');
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={LoginImage}
        style={styles.loginImage}
        resizeMode="cover"
      />
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 27, color: Colors.WHITE, textAlign: 'center', paddingTop: 15 }}>
          Welcome 
        </Text>
        <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.WHITE, marginTop: 15 }}>
          Login to manage your daily tasks or reset your password
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted} // Call handleGetStarted function when button is pressed
        >
          <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.PRIMARY }}>
            Continue to Login  <Feather name="arrow-right" size={14} color={Colors.PRIMARY} style={{ marginLeft: 10 }} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleResetPassword} // Call handleGetStarted function when button is pressed
        >
          <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.WHITE }}>
            Reset Password ?
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, textAlign: 'center', color: Colors.BLACK, marginTop: 15 }}>
          © copywright, Almanissoko {currentYear}
        </Text>
        <TouchableOpacity onPress={handleTaraseTechnologiesLink}>
          <Text style={{ fontSize: 10, textAlign: 'center', color: Colors.BLACK, marginTop: 5 }}>
            Developed by - Tarase Technologies
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: '100%',
    height: 670,
    marginTop: -100,
    borderWidth: 0,
    borderColor: Colors.BLACK,
    borderRadius: 15
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 40
  },
  clearButton: {
    padding: 15,
    backgroundColor: Colors.TRANSAPARENT,
    borderRadius: 99,
    marginTop: 10
  }
});
