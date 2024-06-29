import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';;
import { KeyboardAvoidingView } from 'react-native';
import { bookNow, fetchCustomerByName, fetchFarmerOnly } from '../lib/actions';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';

const NewOdersModal = ({ hideModal }) => {

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
    const [customers, setCustomers] = useState([]);
    const [farmers, setFarmers] = useState([]);

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

        try {
            const customersList = await fetchCustomerByName(newPhone);
            setCustomers(customersList);
        } catch (error) {
            console.error('Error fetching customers:', error);
            Alert.alert('Error', 'Failed to fetch customer details.');
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const farmersList = await fetchFarmerOnly(); // Implement fetchFarmers function to get list of farmers
                setFarmers(farmersList);
            } catch (error) {
                console.error('Error fetching farmers:', error);
                Alert.alert('Error', 'Failed to fetch farmer details.');
            }
        };

        fetchInitialData();
    }, []);

    const handleCustomerSelect = (customer) => {
        setName(customer.name);
        setCustomerId(customer.id);
        setCustomers([]); // Clear the dropdown after selection
    };
    console.log("id", customer_id)

    const handleBooking = async () => {
        if (
            !name || !phone || !town || !kgs || !packaging || !discount || !transport || 
            !transporters || !rider || !comment || !farmer_id || !rice_type || !vat || !farmer_price || 
            !price || !amount
        ) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }
       
        try {
            const response = await bookNow(name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount);
            console.log("response", response)
            Alert.alert('Success', 'Order Placed Succesfully');
            hideModal();
        } catch (error) {
            Alert.alert('Error', 'Failed to book the Order.');
            console.error('Booking error:', error.message);
        }
    };

    console.log('Transporters:', transporters);

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
                        New Order
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
                    {customers.length > 0 && (
                        <View className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl mt-2">
                            {customers.map((customer, index) => (
                                <TouchableOpacity key={index} onPress={() => handleCustomerSelect(customer)}>
                                    <Text className="text-white p-2">{customer.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    
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
                    <View  className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl">
                        <Picker
                            selectedValue={transporters}
                            onValueChange={(itemValue) => setTransporters(itemValue)}
                            style={{ color: '#fff' }}
                        >
                            <Picker.Item label="Select Tranporter" value="" />
                            <Picker.Item label="Others" value="1" />
                            <Picker.Item label="Inhouse" value="2" />
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
                        Farmer:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <View className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl">
                        <Picker
                            selectedValue={farmer_id}
                            onValueChange={(itemValue) => setFarmerId(itemValue)}
                            style={{ color: '#fff' }}
                        >
                            <Picker.Item label="Select Farmer" value="" />
                            {farmers.map((farmer) => (
                                <Picker.Item key={farmer.id} label={farmer.name} value={farmer.id.toString()} />
                            ))}
                        </Picker>
                    </View>
                </View>
                
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">Rice Type:</Text>
                </View>
                <View className="pl-4 pr-4">
                    <View  className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl">
                        <Picker
                            selectedValue={rice_type}
                            onValueChange={(itemValue) => setRiceType(itemValue)}
                            style={{ color: '#fff' }}
                        >
                            <Picker.Item label="Select Rice Type" value="" />
                            <Picker.Item label="Pishori" value="1" />
                            <Picker.Item label="Komboka" value="2" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        V.A.T:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                <View  className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl">
                        <Picker
                            selectedValue={vat}
                            onValueChange={(itemValue) => setVat(itemValue)}
                            style={{ color: '#fff' }}
                        >
                            <Picker.Item label="Select V.A.T" value="" />
                            <Picker.Item label="0%" value="0" />
                            <Picker.Item label="14%" value="14" />
                            <Picker.Item label="16%" value="16" />
                        </Picker>
                    </View>
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
                        Almanis Price:
                    </Text>
                </View>
                <View className="pl-4 pr-4">
                    <TextInput
                        className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                        placeholder='Almanis Price'
                        placeholderTextColor="#888"
                        value={price}
                        onChangeText={setPrice}
                        style={{ padding: 10 }}
                    />
                </View>
                <View>
                    <Text className="font-pmedium text-xl mt-0 text-white p-4">
                        Total Amount:
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
                <View className="p-4">
                    <TouchableOpacity 
                        onPress={handleBooking}
                        className="w-full bg-secondary rounded-2xl border-1 border-white p-4 items-center"
                    >
                        <Text className=" text-white font-pmedium">Confirm & Book</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
    
}

export default NewOdersModal


