import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ProfilePic from '../../../assets/images/icons/hamburger1.png'
import Profile from '../../../assets/images/icons/user2.png'
import Colors from '../../utils/Colors'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-elements/dist/helpers';

// Get the screen's height

export default function Adminheader({ firstName, lastName }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.profile}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image source={ProfilePic} style={styles.profilePic}/>
                </TouchableOpacity>
                <View>
                    <Text style={{color:Colors.BLACK, fontSize: 24,}}>{`${firstName}`} {`${lastName}`}</Text>
                    <Text style={{color:Colors.BLACK, fontSize: 48, fontWeight: '900', fontFamily: 'Aleo-bold'}}>Dashboard</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <Ionicons name="notifications" size={24} color="black" />
                <Image source={Profile} style={styles.profileIcon} />
            </View>
        </View>
        <View style={styles.searchBarContainer}>
            <TextInput placeholder='Search' style={styles.textInput}/>
            <FontAwesome style={styles.search} name="search" size={24} color={Colors.PRIMARY}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 20,
        backgroundColor: Colors.GREEN,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    profilePic: {
        width: 55,
        height: 55,
    },
    profileIcon: {
        width: 28,
        height: 28,
    },
    profile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'top',
        justifyContent: 'space-between'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 10
    },
    iconContainer: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'top',
        gap: 10
    },
    textInput: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%'
    },
    searchBarContainer: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    search: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
    },
})