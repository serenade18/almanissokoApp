import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../../../constants';
import { fetchPaymentDetails } from '../../../lib/actions';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Paymentdetails = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { id } = params;  

  const [paying_number, setPayingNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [payment_mode, setPaymentMode] = useState('');
  const [payment, setPayment] = useState('');
  const [customer_id, setCustomerId] = useState('');
  const [orderNo, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log("id", orderNo);

  const fetchData = async () => {
    try {
        const fetchDetails = await fetchPaymentDetails(id);
        const response = await fetchDetails();

        console.log('Details', response);

        if (response.data) {
          const data = response.data;
          setOrderId(data.orders.id || '');
          setAmount(data.amount || '');
          setPayingNumber(data.paying_number || '');
          setPaymentMode(data.payment_mode || '');
          setPayment(data.payment || '');
          setCustomerId(data.customer_id || '');
          setOrders(data.orders || []);
        } else {
          throw new Error('Invalid response format: Missing orders data');
        }
    } catch (error) {
        setError(error);
        console.error('Error fetching service:', error);
    } finally {
        setLoading(false);
    }
  }; 

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
      return <Text>Error loading details</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <KeyboardAvoidingView>
          <View className="flex justify-between items-start p-4 flex-row">
            <View className="flex-row items-center mt-1">
              <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mt-1">
                <Image source={icons.leftArrow} className="w-6 h-6 mr-2 mt-4" resizeMode="contain" />
                <Text className="font-pmedium text-2xl text-white mt-4">Edit Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text className="font-pmedium text-xl mt-2 text-white p-4">Order Number:</Text>
          </View>
          <View className="pl-4 pr-4">
            <TextInput
              className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
              placeholder='Order No'
              placeholderTextColor="#888"
              value={orderNo}
              onChangeText={setOrderId}
              style={{ padding: 10 }}
            />
          </View>
          <View>
            <Text className="font-pmedium text-xl mt-0 text-white p-4">Amount:</Text>
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
            <Text className="font-pmedium text-xl mt-0 text-white p-4">Payment Source:</Text>
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
            <Text className="font-pmedium text-xl mt-0 text-white p-4">Payment Mode:</Text>
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
            <Text className="font-pmedium text-xl mt-0 text-white p-4">Payment Amount:</Text>
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
            <TouchableOpacity className="bg-secondary-200 rounded-2xl" style={{ padding: 15 }}>
              <Text className="text-white font-pmedium text-xl text-center">Edit Payment</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Paymentdetails;
