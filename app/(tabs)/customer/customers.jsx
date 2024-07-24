import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../lib/authProvider';
import { useRouter } from 'expo-router';
import { images } from '../../../constants';
import SearchInput from '../../../components/SearchInput';
import { fetchAllCustomer } from '../../../lib/actions';
import AllCustomers from '../../../components/AllCustomers';
import { StatusBar } from 'expo-status-bar';
import Header from '../../../components/Header';

const Customers = () => {
  const { user } = useAuth(); // Access user from the authentication context
  const router = useRouter();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(() => {
      fetchData(); // Fetch every 15 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchAllCustomer();
      // console.log("CUstomers", response.data.results)
      if (response.error === false) {
        setCustomers(response.data.results);
      } else {
        console.error('Failed to fetch customers:', response.message);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
    <Header title="All Customers" search="Search Customer" />
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FlatList
        data={customers}
        renderItem={({ item }) => <AllCustomers customer={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        pagingEnabled={true}
      />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Customers;
