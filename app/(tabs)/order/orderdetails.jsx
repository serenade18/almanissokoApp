import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Alert, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../../../constants';;
import { KeyboardAvoidingView } from 'react-native';
import { bookNow, fetchOrderDetails, fetchFarmerOnly } from '../../../lib/actions';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Orderdetails = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { id } = params;  

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
  const [details, setDetails] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log("id",id)

  const fetchData = async () => {
    try {
        const fetchDetails = fetchOrderDetails(id);
        const response = await fetchDetails();

        console.log('Details', response)

        if (response.data) {
          const data = response.data;
          setDetails(data);
          setName(data.name || '');
          setPhone(data.phone || '');
          setCustomerId(data.customer_id || '');
          setTown(data.town || '');
          setKgs(data.kgs || '');
          setPackaging(data.packaging || '');
          setDiscount(data.discount || '');
          setTransport(data.transport || '');
          setTransporters(data.transporters.toString() || '');
          setRider(data.rider || '');
          setComment(data.comment || '');
          setFarmerId(data.farmer_id.toString() || '');
          setRiceType(data.rice_type.toString() || '');
          setVat(data.vat.toString() || '');
          setFarmerPrice(data.farmer_price || '');
          setPrice(data.price || '');
          setAmount(data.amount || '');
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
      return <Text>Error loading <details></details></Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <KeyboardAvoidingView>
          <View className="flex justify-between items-start p-4 flex-row">
            <View className="flex-row items-center mt-1">
              <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="flex-row items-center mt-1"
              >
                  <Image
                  source={icons.leftArrow}
                  className="w-6 h-6 mr-2 mt-4"
                  resizeMode="contain"
                  />
                  <Text className="font-pmedium text-2xl text-white mt-4">
                  Edit Order
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
                  onChangeText={setPhone}
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
                        // onPress={handleBooking}
                        className="w-full bg-secondary rounded-2xl border-1 border-white p-4 items-center"
                    >
                        <Text className=" text-white font-pmedium">Edit Order</Text>
                    </TouchableOpacity>
                </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Orderdetails