import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { useNavigation } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import { KeyboardAvoidingView } from 'react-native';
import { bookNow } from '../lib/actions';
import moment from 'moment';

const NewCustomerModal = ({ hideModal,  }) => {
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
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default NewCustomerModal