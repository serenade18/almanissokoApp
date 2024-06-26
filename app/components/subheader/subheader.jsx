import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePic from '../../../assets/images/icons/user2.png';
import Hamburger from '../../../assets/images/icons/hamburger1.png';
import Colors from '../../utils/Colors';

// Get the screen's height
const screenHeight = Dimensions.get('window').height;

export default function SubHeader({ pageTitle, lastName }) {
  const navigation = useNavigation();

  // Determine the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 16) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Hamburger} style={styles.profileIcon} />
        </TouchableOpacity>
          <Text style={styles.pageTitle}>{pageTitle}</Text>
      </View>
      <TouchableOpacity style={styles.rightContainer} onPress={() => console.log('Profile pressed')}>
        <View style={styles.profileContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{`${lastName}`}</Text>
          </View>
          <Image source={ProfilePic} style={styles.profileIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items at the top
    padding: 10,
    backgroundColor: Colors.GREEN,
    height: screenHeight * 0.325, // Set height to 25% of the screen height
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align text and icons at the top
    paddingTop: 8,
    color: Colors.PRIMARY
  },
  pageTitle: {
    marginLeft: 10,
    marginTop: 10,
    color: Colors.PRIMARY,
    fontSize: 18,
    fontWeight: 'bold'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Ensure this also aligns at the top
    paddingTop: 8
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align greeting and profile icon at the top
  },
  textContainer: {
    marginRight: 10,
  },
  greeting: {
    marginBottom: 0,
    color: Colors.PRIMARY
  },
  userName: {
    textAlign: 'right',
    fontWeight: '900',
    color: Colors.PRIMARY,
    fontSize: 18
  },
  profileIcon: {
    width: 45,
    height: 45,
  }
});
