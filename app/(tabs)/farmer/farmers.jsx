import React, { useState, useEffect } from 'react';
import { Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllFarmers from '../../../components/AllFarmers';
import { fetchAllFarmer } from '../../../lib/actions';
import { StatusBar } from 'expo-status-bar';
import Header from '../../../components/Header';

const Farmers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [farmers, setFarmer] = useState([]);
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
      const response = await fetchAllFarmer(pageNumber);
      // console.log("CUstomers", response.data.results)
      if (response.error === false) {
        const newFarmers = response.data.results;
        setFarmer(prevFarmers =>
          pageNumber === 1 ? newFarmers : [...prevFarmers, ...newFarmers]
        );
        setHasMore(newFarmers.length > 0)
      } else {
        console.error('Failed to fetch farmer:', response.message);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching farmer data:', error);
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
    <Header title="All Farmers" search="Search Farmer" />
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FlatList
        onRefresh={fetchData} // Function to call on refresh
        refreshing={loading}
        ListEmptyComponent={() => (
          loading ? <ActivityIndicator size="large" color="#ffffff" /> : <Text>No customer found</Text>
        )}
        onEndReached={handleLoadMore} // Load more data when the end is reached
        onEndReachedThreshold={0.5} 
        data={farmers}
        renderItem={({ item }) => <AllFarmers farmer={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        pagingEnabled={true}
      />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default Farmers