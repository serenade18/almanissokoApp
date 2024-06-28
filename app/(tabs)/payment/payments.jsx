import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../lib/authProvider';
import { useRouter } from 'expo-router';
import { images } from '../../../constants';
import SearchInput from '../../../components/SearchInput';
import { fetchAllPayment } from '../../../lib/actions';
import AllPayments from '../../../components/AllPayments';

const Payments = () => {
  const { user } = useAuth(); // Access user from the authentication context
  const router = useRouter();

  const [payments, setPayment] = useState([]);

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(() => {
      fetchData(); // Fetch every 15 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchAllPayment();
      // console.log("Orders", response.data.results)
      if (response.error === false) {
        setPayment(response.data.results);
      } else {
        console.error('Failed to fetch payment:', response.message);
      }
    } catch (error) {
      console.error('Error fetching payments data:', error);
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
                All Payments
              </Text>
            </View>
          </View>
        )}
        stickyHeaderIndices={[0]}
        data={payments}
        renderItem={({ item }) => <AllPayments payment={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        pagingEnabled={true}
      />
    </SafeAreaView>
  )
}

export default Payments