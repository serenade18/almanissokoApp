import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import LoginImage from '../../../../assets/images/login/login-bg.jpg';
import Colors from '../../../utils/Colors';

export default function Login() {
  // Get current year
  const currentYear = new Date().getFullYear();

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
          Welcome Back
        </Text>
        <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.WHITE, marginTop: 15 }}>
          Login to manage your daily tasks
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Button Click")}
        >
          <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.PRIMARY }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, textAlign: 'center', color: Colors.BLACK, marginTop: 45 }}>
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
    width: 230,
    height: 450,
    marginTop: 50,
    borderWidth: 4,
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
  }
});
