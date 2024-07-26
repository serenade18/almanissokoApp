import React, { useState, useEffect } from 'react';
import { Text, FlatList, ActivityIndicator, ScrollView, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllFarmers from '../../../components/AllFarmers';
import { fetchAllFarmer } from '../../../lib/actions';
import { StatusBar } from 'expo-status-bar';
import { icons, images } from '../../../constants';
import { useAuth } from '../../../lib/authProvider';

const Farmers = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterFarmers(searchQuery);
  }, [searchQuery, farmers]);

  const fetchData = async () => {
    try {
      const response = await fetchAllFarmer();
      if (response && response.data.results) {
        setFarmers(response.data.results);
        setFilteredFarmers(response.data.results); // Initially show all farmers
      } else {
        console.error('No results found:', response);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching farmer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFarmers = (query) => {
    if (query === '') {
      setFilteredFarmers(farmers);
    } else {
      const filtered = farmers.filter((farmer) =>
        farmer.name.toLowerCase().includes(query.toLowerCase()) ||
        farmer.phone.includes(query)
      );
      setFilteredFarmers(filtered);
    }
  };

  if (error) {
    return <Text>Error loading farmers</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      
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

        <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
          <TextInput
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={searchQuery}
            placeholder="Search Farmer"
            placeholderTextColor="#CDCDE0"
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            onPress={() => {
              if (searchQuery === "") {
                return Alert.alert(
                  "Missing Query",
                  "Please input something to search results across the database"
                );
              }
              console.log('Search button pressed, query:', searchQuery);
            }}
          >
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View className="w-full flex-1 pt-5 pb-2">
          <Text className="text-lg font-pregular text-gray-100 mb-2">
            All Farmers
          </Text>
        </View>
        </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          onRefresh={fetchData} // Function to call on refresh
          refreshing={loading}
          ListEmptyComponent={() => (
            loading ? <ActivityIndicator size="large" color="#ffffff" /> : <Text>No farmers found</Text>
          )}
          data={filteredFarmers}
          renderItem={({ item }) => <AllFarmers farmer={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
          pagingEnabled={true}
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Farmers;