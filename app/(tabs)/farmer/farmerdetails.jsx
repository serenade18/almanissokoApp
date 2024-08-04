import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { fetchFarmerDetails } from '../../../lib/actions';
import { icons, images } from '../../../constants';
import FarmerOrders from '../../../components/FarmerOrders';
import { Feather } from '@expo/vector-icons';

const Farmerdetails = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { id } = params;
  const [farmer, setFarmer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFarmerModal, setShowFarmerModal] = useState(false); 

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const fetchService = fetchFarmerDetails(id);
      const response = await fetchService();

      console.log('Details', response);

      if (response.data) {
        setFarmer(response);
        setOrders(response.data.orders)
      } else {
        throw new Error('Invalid response format: Missing farmer data');
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching farmer:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }
 
  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  const farmerData = farmer.data;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="light" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={icons.leftArrow} style={styles.backIcon} resizeMode="contain" />
            <Text style={styles.headerText}>Farmer Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Image source={images.profile} style={styles.profileImage} resizeMode="contain" />
          <Text style={styles.profileName}>{farmerData?.name}</Text>
          
        </View>

        

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Orders:</Text>
            <Text style={styles.detailValue}>{farmer?.orders_count}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kilos:</Text>
            <Text style={styles.detailValue}>{farmer?.kgs} kgs</Text>
          </View>
        </View>

        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Farmer <Feather name="edit-3" size={24} color="white" /></Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              data={orders}
              renderItem={({ item }) => <FarmerOrders order={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#161622',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  profileName: {
    fontSize: 24,
    color: 'white',
    marginTop: 8,
  },
  profileTown: {
    fontSize: 20,
    color: 'white',
  },
  detailsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 20,
    color: 'white',
  },
  detailValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  editButtonContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  editButton: {
    width: '100%',
    backgroundColor: '#FF9C01',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FF9C01',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedActionButton: {
    backgroundColor: '#FFD700',
  },
  selectedActionButtonText: {
    color: '#000',
  },
});

export default Farmerdetails