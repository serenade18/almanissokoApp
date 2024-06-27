import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { KeyboardAvoidingView } from 'react-native';
import { bookNow, fetchCustomerByName } from '../lib/actions';
import { Picker } from '@react-native-picker/picker';

const NewPaymentModal = ({ hideModal }) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [customer_id, setCustomerId] = useState('');
    const [town, setTown] = useState('');
    const [kgs, setKgs] = useState('');
    const [packaging, setPackaging] = useState('');
    const [discount, setDiscount] = useState('');
    const [transport, setTransport] = useState('');
    const [transporters, setTransporters] = useState('');
    const [rider, setRider] = useState('');
    const [comment, setComment] = useState('');
    const [farmer_id, setFarmerId] = useState('');
    const [rice_type, setRiceType] = useState('');
    const [vat, setVat] = useState('');
    const [farmer_price, setFarmerPrice] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const numberOfKilosFloat = parseFloat(kgs);
        const trayPriceFloat = parseFloat(price);
        const discountFloat = parseFloat(discount);
        const packagingFloat = parseFloat(packaging);
        const riderFloat = parseFloat(rider);
        const transportFloat = parseFloat(transport);

        if (!isNaN(numberOfKilosFloat) && !isNaN(trayPriceFloat) && !isNaN(discountFloat)) {
            const subTotal = (numberOfKilosFloat * trayPriceFloat) + packagingFloat + riderFloat + transportFloat - discountFloat;
            const vatAmount = (subTotal * vat) / 100;
            const calculatedAmount = subTotal + vatAmount;
            setAmount(isNaN(calculatedAmount) ? '' : calculatedAmount.toFixed(2));
        } else {
            setAmount('');
        }
    }, [kgs, price, discount, vat, rider, packaging, transport]);

    const handlePhoneChange = async (newPhone) => {
        setPhone(newPhone);

        if (newPhone.length > 0) {
            console.log(`Fetching customer details for phone: ${newPhone}`);
            try {
                const customer = await fetchCustomerByName(newPhone);
                console.log('Customer fetched:', customer);
                if (customer) {
                    setName(customer.name);
                    setCustomerId(customer.customer_id);
                } else {
                    console.log('No customer found for this phone number.');
                    setName('');
                    setCustomerId('');
                }
            } catch (error) {
                console.error('Error fetching customer:', error);
                Alert.alert('Error', 'Failed to fetch customer details.');
            }
        }
    };

    const handleBooking = async () => {
        if (
            !name || !phone || !customer_id || !town || !kgs || !packaging || !discount || !transport || 
            !transporters || !rider || !comment || !farmer_id || !rice_type || !vat || !farmer_price || 
            !price || !amount
        ) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        try {
            const response = await bookNow(name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount);
            console.log("response", response)
            Alert.alert('Success', 'Booking confirmed');
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
                        Phone:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Phone'
                        placeholderTextColor="#888"
                        value={phone}
                        onChangeText={handlePhoneChange}
                        style={{ padding: 10 }}
                    />
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
                        Customer No:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Customer No'
                        placeholderTextColor="#888"
                        value={customer_id}
                        onChangeText={setCustomerId}
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
                        Kilos:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Kilos'
                        placeholderTextColor="#888"
                        value={kgs}
                        onChangeText={setKgs}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Packaging:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Packaging'
                        placeholderTextColor="#888"
                        value={packaging}
                        onChangeText={setPackaging}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Discount:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Discount'
                        placeholderTextColor="#888"
                        value={discount}
                        onChangeText={setDiscount}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Transport:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Transport'
                        placeholderTextColor="#888"
                        value={transport}
                        onChangeText={setTransport}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Transporters:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <View className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl">
                        <Picker
                            selectedValue={transporters}
                            onValueChange={(itemValue) => setTransporters(itemValue)}
                            style={{ color: 'white' }}
                        >
                            <Picker.Item label="Transporter 1" value="transporter1" />
                            <Picker.Item label="Transporter 2" value="transporter2" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Rider:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Rider'
                        placeholderTextColor="#888"
                        value={rider}
                        onChangeText={setRider}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Comment:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Comment'
                        placeholderTextColor="#888"
                        value={comment}
                        onChangeText={setComment}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Farmer Id:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Farmer Id'
                        placeholderTextColor="#888"
                        value={farmer_id}
                        onChangeText={setFarmerId}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Rice Type:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Rice Type'
                        placeholderTextColor="#888"
                        value={rice_type}
                        onChangeText={setRiceType}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Vat:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Vat'
                        placeholderTextColor="#888"
                        value={vat}
                        onChangeText={setVat}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Farmer Price:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Farmer Price'
                        placeholderTextColor="#888"
                        value={farmer_price}
                        onChangeText={setFarmerPrice}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Price:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Price'
                        placeholderTextColor="#888"
                        value={price}
                        onChangeText={setPrice}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Amount:
                    </Text>
                </View>
                <View className="pl-4 pr-4 mb-10">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Amount'
                        placeholderTextColor="#888"
                        value={amount}
                        editable={false}
                        style={{ padding: 10 }}
                    />
                </View>
                <View className="pl-4 pr-4 mb-10">
                    <TouchableOpacity
                        className="bg-secondary-200 rounded-2xl"
                        onPress={handleBooking}
                        style={{ padding: 15 }}
                    >
                        <Text className="text-white font-pmedium text-xl text-center">
                            Book Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default NewPaymentModal;
