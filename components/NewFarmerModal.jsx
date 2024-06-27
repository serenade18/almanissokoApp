import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { useNavigation } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import { saveFarmer } from '../lib/actions';
import moment from 'moment';

const NewFarmerModal = ({ hideModal,  }) => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const handleBooking = async () => {
        if (
            !name || !phone 
        ) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        try {
            const response = await saveFarmer(name, phone);
            console.log("response", response)
            Alert.alert('Success', 'Farmer Added');
            hideModal();
        } catch (error) {
            Alert.alert('Error', 'Failed to book the Order.');
            console.error('Booking error:', error.message);
        }
    };

  return (
    <ScrollView>
        <KeyboardAvoidingView  className="bg-primary h-full">
            <View className="flex justify-between items-start p-4 flex-row">
                <View className="flex-row items-center mt-1">
                <TouchableOpacity
                    onPress={() => hideModal()}
                    className="flex-row items-center mt-1"
                >
                    <Image
                    source={icons.leftArrow}
                    className="w-6 h-6 mr-2"
                    resizeMode="contain"
                    />
                    <Text className="font-pmedium text-2xl text-white">
                    New Farmer
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text className="font-pmedium text-xl mt-0 text-white p-4">
                Name:
                </Text>
            </View>
            <View className="pl-4 pr-4">
                <TextInput
                    className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                    placeholder='Name'
                    placeholderTextColor="#888"
                    value={name}
                    onChangeText={setName}
                    style={{ padding: 10 }}
                />
            </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                    Phone:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Phone'
                        placeholderTextColor="#888"
                        value={phone}
                        onChangeText={setPhone}
                        style={{ padding: 10 }}
                    />
                </View>
            <View className="pl-4 pt-4 pr-4 mb-10">
                <TouchableOpacity
                    className="bg-secondary-200 rounded-2xl"
                    onPress={handleBooking}
                    style={{ padding: 15 }}
                >
                    <Text className="text-white font-pmedium text-xl text-center">
                        Add Farmer
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default NewFarmerModal