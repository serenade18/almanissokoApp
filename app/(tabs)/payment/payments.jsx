import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../lib/authProvider';
import { useRouter } from 'expo-router';
import { images } from '../../../constants';
import SearchInput from '../../../components/SearchInput';
import { fetchAllPayment } from '../../../lib/actions';
import { StatusBar } from 'expo-status-bar';
import AllPayments from '../../../components/AllPayments';
import Header from '../../../components/Header';

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
    <Header title="All Payments" search="Search Payment" />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          data={payments}
          renderItem={({ item }) => <AllPayments payment={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
          pagingEnabled={true}
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default Payments