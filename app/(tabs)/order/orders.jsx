import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../lib/authProvider';
import { useRouter } from 'expo-router';
import { images } from '../../../constants';
import SearchInput from '../../../components/SearchInput';
import { fetchAllOrders } from '../../../lib/actions';
import AllOrders from '../../../components/AllOrders';
import { StatusBar } from 'expo-status-bar';

const Orders = () => {
  const { user } = useAuth(); // Access user from the authentication context
  const router = useRouter();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(() => {
      fetchData(); // Fetch every 15 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchAllOrders();
      // console.log("Orders", response.data.results)
      if (response.error === false) {
        setOrders(response.data.results);
      } else {
        console.error('Failed to fetch orders:', response.message);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {user?.last_name || 'Guest'}
                  </Text>
                </View>

                <View className="mt-1">
                  <Image source={images.logoSmall} className="w-15 h-15" resizeMode="contain" />
                </View>
              </View>

              <SearchInput />

              <View className="w-full flex-1 pt-5 pb-2">
                <Text className="text-lg font-pregular text-gray-100 mb-2">
                  All Orders
                </Text>
              </View>
            </View>
          )}
        />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          
          data={orders}
          renderItem={({ item }) => <AllOrders order={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
          pagingEnabled={true}
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default Orders