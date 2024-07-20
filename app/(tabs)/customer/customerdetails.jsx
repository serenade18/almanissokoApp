import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { fetchCustomerDetails } from '../../../lib/actions';
import { icons, images } from '../../../constants';
import CustomerOrders from '../../../components/CustomerOrders';
import CustomerPayments from '../../../components/CustomerPayments'; // Assuming you have a component for payments
import { Feather } from '@expo/vector-icons';
import NewOdersModal from '../../../components/NewOdersModal';
import EditCustomerModal from '../../../components/EditCustomerModal';

const Customerdetails = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { id } = params;
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false); 
  const [showCustomerModal, setShowCustomerModal] = useState(false); 
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('orders'); // 'orders' or 'payments'

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const fetchService = fetchCustomerDetails(id);
      const response = await fetchService();

      if (response.data) {
        setCustomer(response);
        setOrders(response.data.orders);
        setPayments(response.data.payments);
      } else {
        throw new Error('Invalid response format: Missing customer data');
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching customer:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error loading customer details</Text>
      </SafeAreaView>
    );
  }

  const customerData = customer.data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="light" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={icons.leftArrow} style={styles.backIcon} resizeMode="contain" />
            <Text style={styles.headerText}>Customer Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Image source={images.profile} style={styles.profileImage} resizeMode="contain" />
          <Text style={styles.profileName}>{customerData?.name}</Text>
          <Text style={styles.profileTown}>
            {customerData?.town} <TouchableOpacity onPress={()=> setShowCustomerModal(true)}>
              <Feather name="edit-3" size={24} color="white" />
            </TouchableOpacity>
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Orders:</Text>
            <Text style={styles.detailValue}>{customer?.orders_count}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kilos:</Text>
            <Text style={styles.detailValue}>{customer?.kgs} kgs</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Discount:</Text>
            <Text style={styles.detailValue}>{formatCurrency(customer?.discount)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment:</Text>
            <Text style={styles.detailValue}>{formatCurrency(customer?.payed_total)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Balance:</Text>
            <Text style={styles.detailValue}>{formatCurrency(customer?.balance)}</Text>
          </View>
        </View>

        <View style={styles.editButtonContainer}>
          <TouchableOpacity onPress={()=> setShowOrderModal(true)} style={styles.editButton}>
            <Text style={styles.editButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              selectedTab === 'orders' && styles.selectedActionButton,
            ]}
            onPress={() => setSelectedTab('orders')}
          >
            <Text
              style={[
                styles.actionButtonText,
                selectedTab === 'orders' && styles.selectedActionButtonText,
              ]}
            >
              Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              selectedTab === 'payments' && styles.selectedActionButton,
            ]}
            onPress={() => setSelectedTab('payments')}
          >
            <Text
              style={[
                styles.actionButtonText,
                selectedTab === 'payments' && styles.selectedActionButtonText,
              ]}
            >
              Payments
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {selectedTab === 'orders' ? (
            <FlatList
              data={orders}
              renderItem={({ item }) => <CustomerOrders order={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          ) : (
            <FlatList
              data={payments}
              renderItem={({ item }) => <CustomerPayments payment={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          )}
        </ScrollView>
      </ScrollView>
      
      <Modal
        visible={showCustomerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomerModal(false)}
      >
        <EditCustomerModal hideModal={() => setShowCustomerModal(false)} customer={customerData} id={id} />
      </Modal>
      <Modal
        visible={showOrderModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOrderModal(false)}
      >
        <NewOdersModal hideModal={() => setShowOrderModal(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
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

export default Customerdetails;
