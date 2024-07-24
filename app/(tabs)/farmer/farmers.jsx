import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../lib/authProvider';
import { useRouter } from 'expo-router';
import { images } from '../../../constants';
import SearchInput from '../../../components/SearchInput';
import AllFarmers from '../../../components/AllFarmers';
import { fetchAllFarmer } from '../../../lib/actions';
import { StatusBar } from 'expo-status-bar';
import Header from '../../../components/Header';

const Farmers = () => {
  const { user } = useAuth(); // Access user from the authentication context
  const router = useRouter();

  const [farmers, setFarmer] = useState([]);

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(() => {
      fetchData(); // Fetch every 15 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchAllFarmer();
      // console.log("CUstomers", response.data.results)
      if (response.error === false) {
        setFarmer(response.data.results);
      } else {
        console.error('Failed to fetch farmer:', response.message);
      }
    } catch (error) {
      console.error('Error fetching farmer data:', error);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
    <Header title="All Farmers" search="Search Farmer" />
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FlatList
        data={farmers}
        renderItem={({ item }) => <AllFarmers farmer={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        pagingEnabled={true}
      />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Farmers