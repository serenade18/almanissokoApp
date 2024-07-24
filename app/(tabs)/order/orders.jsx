import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAllOrders } from '../../../lib/actions';
import AllOrders from '../../../components/AllOrders';
import { StatusBar } from 'expo-status-bar';
import Header from '../../../components/Header';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchAllOrders();
      if (response.error === false) {
        setOrders(response.data.results);
      } else {
        console.error('Failed to fetch orders:', response.message);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <Text>Error loading orders</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Header title="All Orders" search="Search Orders" />

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          onRefresh={fetchData} // Function to call on refresh
          refreshing={loading} // Boolean to show refresh indicator
          ListEmptyComponent={() => (
            loading ? <ActivityIndicator size="large" color="#ffffff" /> : <Text>No orders found</Text>
          )}
          data={orders}
          renderItem={({ item }) => (
            <AllOrders order={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
          pagingEnabled={true}
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Orders;
