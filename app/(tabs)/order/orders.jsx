import React, { useState, useEffect } from 'react';
import { ScrollView, Text, FlatList, ActivityIndicator, Alert, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAllOrders, deleteOrders } from '../../../lib/actions';
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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData(1); // Initial fetch 
  }, []);

  useEffect(() => {
    fetchData(1); // Fetch data when search query changes, reset to page 1
  }, [searchQuery]);

  const fetchData = async (pageNumber = 1) => {
    if (loadingMore) return; // Prevent multiple fetches

    setLoading(pageNumber === 1);
    setLoadingMore(pageNumber > 1);

    try {
      const response = await fetchAllOrders(pageNumber, searchQuery); // Fetch orders with pagination
      if (response) { // Ensure response is not null or undefined
        const newOrders = response.results || [];
        // console.log('New orders:', newOrders); // Log the fetched orders

        // If search query is present, replace the orders; otherwise, append the orders
        setOrders(pageNumber === 1 || searchQuery ? newOrders : [...orders, ...newOrders]);
        setHasMore(newOrders.length > 0);
      } else {
        console.error('Failed to fetch orders: No response or empty response');
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
    if (!loadingMore && hasMore && !searchQuery) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }
  };

  const handleDeleteOrder = (orderId) => {
    console.log(`Attempting to delete order with ID: ${orderId}`);
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const deleteResponse = await deleteOrders(orderId); // Call deleteOrders and get the response
              console.log("Delete response:", deleteResponse);
              await fetchData(1); // Refresh the data
            } catch (error) {
              console.error('Error deleting order:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
};


  if (error) {
    return <Text>Error loading orders: {error.message}</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Header title="All Orders" search="Search Orders" onSearch={setSearchQuery} />
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator size="large" color="#ffffff" />
        )}
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
            renderItem={({ item }) => {
              return <AllOrders order={item} onDelete={handleDeleteOrder} />;
            }}
            keyExtractor={(item) => item.id.toString()} // Ensure unique keys
            contentContainerStyle={{ paddingBottom: 16 }}
            pagingEnabled={true}
          />
        </ScrollView>
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
});

export default Orders;
