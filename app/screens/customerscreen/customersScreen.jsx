import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Header from '../../components/mainheader/header';
import { useAuth } from '../../services/authProvider';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Colors';
import { fetchAllCustomer } from '../../services/api';

export default function CustomersScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleNewCustomer = () => {
    navigation.navigate('AddCustomer'); // Navigate to the login screen
  }

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers when the component mounts
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const customerData = await fetchAllCustomer();
      console.log('Customers', customerData)
      setCustomers(customerData);
    } catch (error) {
      console.error('Error fetching customer data:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header pageTitle="Customers" firstName={user.first_name} lastName={user.last_name} />
        <View style={styles.customer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleNewCustomer}
          >
            <Entypo name="add-user" size={38} color={Colors.PRIMARY} />
            <Text style={styles.text}>New Customer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Customers List</Text>
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  customer: {
    marginTop: -200,
    marginBottom: 20,
    paddingLeft: 5,
  },
  clearButton: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.TRANSPARENT,
    borderRadius: 99,
    marginTop: 10,
    borderColor: Colors.WHITE,
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    padding: 15
  },
  listContainer: {
    width: '91%',
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 20,
    marginTop: -8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  listTitle: {
    fontSize: 27,
    color: Colors.BLACK,
    paddingBottom: 20,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 18,
  },
});
