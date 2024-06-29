import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { KeyboardAvoidingView } from 'react-native';
import { savePayment, fetchOrderById } from '../lib/actions';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';

const NewPaymentModal = ({ hideModal }) => {

    const [paying_number, setPayingNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [payment_mode, setPaymentMode] = useState('');
    const [payment, setPayment] = useState('');
    const [customer_id, setCustomerId] = useState('');
    const [orders_id, setOrderId] = useState('');
    const [orders, setOrders] = useState([]);

    const handleOrderChange = async (newOrder) => {
        setOrderId(newOrder);

        try {
            const orderList = await fetchOrderById(newOrder);
            setOrders(orderList);
            console.log("Orders", orderList)
        } catch (error) {
            console.error('Error fetching orders:', error);
            Alert.alert('Error', 'Failed to fetch order details.');
        }
        
    };

    const handleOrderSelect = (order) => {
        setAmount(order.amount);
        setCustomerId(order.customer.id);
        setOrders([]); // Clear the dropdown after selection
    };
    console.log("customer id", customer_id)

    const handleBooking = async () => {
        if (
            !amount || !customer_id || !paying_number || !payment_mode || !payment || !orders_id 
        ) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        try {
            const response = await savePayment( amount, customer_id, paying_number, payment_mode, payment, orders_id);
            console.log("response", response)
            Alert.alert('Success', 'Payment confirmed');
            hideModal();
        } catch (error) {
            Alert.alert('Error', 'Failed to book the Order.');
            console.error('Booking error:', error.message);
        }
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView className="bg-primary h-full">
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
                                Add Payment
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text className="font-pmedium text-xl mt-2 text-white p-4">
                        Order Number:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Order No'
                        placeholderTextColor="#888"
                        value={orders_id}
                        onChangeText={handleOrderChange}
                        style={{ padding: 10 }}
                    />
                    {orders.length > 0 && (
                        <View className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl mt-2">
                            {orders.map((order, index) => (
                                <TouchableOpacity key={index} onPress={() => handleOrderSelect(order)}>
                                    <Text className="text-white p-2">{order.id}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Amount:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Amount'
                        placeholderTextColor="#888"
                        value={amount}
                        onChangeText={setAmount}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Payment Source:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Paying number'
                        placeholderTextColor="#888"
                        value={paying_number}
                        onChangeText={setPayingNumber}
                        style={{ padding: 10 }}
                    />
                </View>   
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Payment Mode:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <View className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl">
                        <Picker
                            selectedValue={payment_mode}
                            onValueChange={(itemValue) => setPaymentMode(itemValue)}
                            style={{ color: 'white' }}
                        >
                            <Picker.Item label="Select Payment Mode" value="" />
                            <Picker.Item label="Cash" value="1" />
                            <Picker.Item label="Mpesa" value="2" />
                            <Picker.Item label="Bank" value="3" />
                            <Picker.Item label="Barter Trade" value="4" />
                            <Picker.Item label="Promotion" value="5" />
                            <Picker.Item label="Compensation" value="6" />
                            <Picker.Item label="Top Up" value="7" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Payment Amount:
                    </Text>
                </View>
                <View className="pl-4 pb-3 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Payment'
                        placeholderTextColor="#888"
                        value={payment}
                        onChangeText={setPayment}
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
                            Add Payment
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <StatusBar backgroundColor="#161622" style="light" />
        </ScrollView>
    );
};

export default NewPaymentModal;
