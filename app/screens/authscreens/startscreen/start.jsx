import React, { useRef, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Linking, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import LoginImage from '../../../../assets/images/login/login-bg.jpg';
import Colors from '../../../utils/Colors';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Start() {
  const navigation = useNavigation(); // Get navigation object using useNavigation hook

  // Animation values
  const slideInAnimation = useRef(new Animated.Value(0)).current;
  const fadeInAnimation = useRef(new Animated.Value(0)).current;

  // Slide in animation for subcontainer
  useEffect(() => {
    Animated.timing(slideInAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Fade in animation for image
  useEffect(() => {
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

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
      <Animated.Image
        source={LoginImage}
        style={[styles.loginImage, { opacity: fadeInAnimation }]}
        resizeMode="cover"
      />
      <Animated.View style={[styles.subContainer, { transform: [{ translateY: slideInAnimation.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }] }]}>
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
            Continue to Login  <AntDesign name="rightcircle" size={16} color="#344767" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleResetPassword} // Call handleGetStarted function when button is pressed
        >
          <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.WHITE }}>
            Reset Password <AntDesign name="questioncircle" size={15} color="white" />
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, textAlign: 'center', color: Colors.GRAY, marginTop: 15 }}>
          © copywright, Almanissoko {currentYear}
        </Text>
        <TouchableOpacity onPress={handleTaraseTechnologiesLink}>
          <Text style={{ fontSize: 10, textAlign: 'center', color: Colors.GRAY, marginTop: 5 }}>
            Developed by - Tarase Technologies
          </Text>
        </TouchableOpacity>
      </Animated.View>
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
    borderRadius: 15,
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.GREY,
    borderRadius: 99,
    marginTop: 40,
  },
  clearButton: {
    padding: 15,
    backgroundColor: Colors.TRANSPARENT,
    borderRadius: 99,
    marginTop: 10,
  },
});
