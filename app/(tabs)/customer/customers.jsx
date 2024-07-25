import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAllCustomer } from '../../../lib/actions';
import AllCustomers from '../../../components/AllCustomers';
import { StatusBar } from 'expo-status-bar';
import Header from '../../../components/Header';

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  const fetchData = async (pageNumber) => {
    if (loadingMore) return; // Prevent multiple fetches

    setLoading(pageNumber === 1);
    setLoadingMore(pageNumber > 1);

    try {
      const response = await fetchAllCustomer(pageNumber);
      // console.log("CUstomers", response.data.results)
      if (response.error === false) {
        const newCustomer = response.data.results;
        setCustomers(prevCustomer =>
          pageNumber === 1 ? newCustomer : [...prevCustomer, ...newCustomer]
        );
        setHasMore(newCustomer.length > 0)
      } else {
        console.error('Failed to fetch customers:', response.message);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching customer data:', error);
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
    <Header title="All Customers" search="Search Customer" />
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FlatList
        onRefresh={fetchData} // Function to call on refresh
        refreshing={loading}
        ListEmptyComponent={() => (
          loadingMore ? <ActivityIndicator size="large" color="#ffffff" /> : <Text>No customer found</Text>
        )}
        onEndReached={handleLoadMore} // Load more data when the end is reached
        onEndReachedThreshold={0.5} 
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
