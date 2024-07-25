import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../lib/authProvider';
import { useRouter } from 'expo-router';
import { fetchAllPayment } from '../../../lib/actions';
import { StatusBar } from 'expo-status-bar';
import AllPayments from '../../../components/AllPayments';
import Header from '../../../components/Header';

const Payments = () => {
  const { user } = useAuth(); // Access user from the authentication context
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [payments, setPayment] = useState([]);

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchAllPayment();
      // console.log("Orders", response.data.results)
      if (response.error === false) {
        setPayment(response.data.results);
      } else {
        console.error('Failed to fetch payment:', response.message);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching payments data:', error);
    } finally {
      setLoading(false);
    }
  };
  if (error) {
    return <Text>Error loading orders</Text>;
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
    <Header title="All Payments" search="Search Payment" />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList // Boolean to show refresh indicator
          ListEmptyComponent={() => (
            loading ? <ActivityIndicator size="large" color="#ffffff" /> : <Text>No orders found</Text>
          )}
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