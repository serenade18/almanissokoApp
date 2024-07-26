// 

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAllOrders } from '../../../lib/actions';
import AllOrders from '../../../components/AllOrders';
import { StatusBar } from 'expo-status-bar';
import Header from '../../../components/Header';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  useEffect(() => {
    fetchData(1); // Initial fetch
  }, []);

  useEffect(() => {
    console.log('Fetching data with search query:', searchQuery);
    fetchData(1); // Fetch data when search query changes, reset to page 1
  }, [searchQuery]);

  const fetchData = async (pageNumber = 1) => {
    if (loadingMore) return; // Prevent multiple fetches

    setLoading(pageNumber === 1);
    setLoadingMore(pageNumber > 1);

    try {
      const response = await fetchAllOrders(pageNumber, searchQuery); // Fetch orders with pagination
      if (response.error === false) {
        const newOrders = response.data.results || [];
        consorle.log('New orders:', newOrders); // Log the fetched orders
        setOrders(prevOrders => 
          pageNumber === 1 ? newOrders : [...prevOrders, ...newOrders]
        );
        setHasMore(newOrders.length > 0);
      } else {
        console.error('Failed to fetch orders:', response.message);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }
  };

  if (error) {
    return <Text>Error loading orders</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Header title="All Orders" search="Search Orders" onSearch={setSearchQuery} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          onRefresh={() => fetchData(1)} // Function to call on refresh
          refreshing={loading} // Boolean to show refresh indicator
          ListFooterComponent={() =>
            loadingMore ? <ActivityIndicator size="large" color="#ffffff" /> : null
          }
          onEndReached={handleLoadMore} // Load more data when the end is reached
          onEndReachedThreshold={0.5} 
          data={orders}
          renderItem={({ item }) => (
            <AllOrders order={item} />
          )}
          keyExtractor={(item) => item.id.toString()} // Ensure unique keys
          contentContainerStyle={{ paddingBottom: 16 }}
          pagingEnabled={true}
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Orders;
