import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { Picker } from '@react-native-picker/picker'
import { KeyboardAvoidingView } from 'react-native';
import { saveCustomer } from '../lib/actions';

const NewCustomerModal = ({ hideModal,  }) => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [secondary_phone, setSecondaryPhone] = useState('');
    const [alternative_phone, setAlternativePhone] = useState('');
    const [region, setRegion] = useState('');
    const [town, setTown] = useState('');

    const handleBooking = async () => {
        if (
            !name || !phone || !secondary_phone || !alternative_phone || !town || !region 
        ) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        try {
            const response = await saveCustomer(name, phone, secondary_phone, alternative_phone, town, region);
            console.log("response", response)
            Alert.alert('Success', 'Customer Added');
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
                            New Customer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                    Customer Name:
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
                    Primary Contact:
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
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                    Secondary Contact:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Phone'
                        placeholderTextColor="#888"
                        value={secondary_phone}
                        onChangeText={setSecondaryPhone}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                    Alternative Contact:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Phone'
                        placeholderTextColor="#888"
                        value={alternative_phone}
                        onChangeText={setAlternativePhone}
                        style={{ padding: 10 }}
                    />
                </View>
                
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                    Town:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Town'
                        placeholderTextColor="#888"
                        value={town}
                        onChangeText={setTown}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Region:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <View className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl">
                        <Picker
                            selectedValue={region}
                            onValueChange={(itemValue) => setRegion(itemValue)}
                            style={{ color: 'white' }}
                        >
                            <Picker.Item label="Select Region" value="" />
                            <Picker.Item label="Nairobi" value="1" />
                            <Picker.Item label="Nyanza" value="2" />
                            <Picker.Item label="Central" value="3" />
                            <Picker.Item label="Coast" value="4" />
                            <Picker.Item label="Eastern" value="5" />
                            <Picker.Item label="North Eastern" value="6" />
                            <Picker.Item label="Western" value="7" />
                            <Picker.Item label="Rift Valley" value="8" />
                        </Picker>
                    </View>
                </View>
                <View className="pl-4 pt-4 pr-4 mb-10">
                    <TouchableOpacity
                        className="bg-secondary-200 rounded-2xl"
                        onPress={handleBooking}
                        style={{ padding: 15 }}
                    >
                        <Text className="text-white font-pmedium text-xl text-center">
                            Add Customer
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default NewCustomerModal