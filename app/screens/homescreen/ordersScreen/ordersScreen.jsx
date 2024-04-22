import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useAuth } from '../../../services/authProvider';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../utils/Colors';
import { fetchAllOrders } from '../../../services/api';
import Header from '../../../components/mainheader/header';

export default function OderssScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleNewOrder = () => {
    navigation.navigate('New Orders');
  }

  const [orders, setOrders] = useState([]);
  // console.log('orders', orders)

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetchAllOrders();
      if (response.error === false) {  // Assuming the API sends this in response
        console.log('orders fetched:', response.data); // Log to check the structure
        setOrders(response.data.results); // Make sure this matches the actual path to the data array
      } else {
        console.error('Failed to fetch orders:', response.message);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };  

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };
  
  const renderItem = ({ item }) => {
    // Create a new Date object from the added_on string
  
    return (
      <View style={styles.tableRow}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Text style={styles.tableCellNarrow}>#{item.id.toString()}</Text>
          <Text style={styles.tableCellName}>{item.name}</Text>
          <Text style={styles.tableCellTown}>{item.town}</Text>
          <Text style={styles.tableCellNarrow}>{item.kgs}</Text>
          <Text style={styles.tableCellNarrow}>{item.packaging}</Text>
          <Text style={styles.tableCellNarrow}>{item.Discount}</Text>
          <Text style={styles.tableCellNarrow}>{item.transport}</Text>
          <Text style={styles.tableCellTown}>{item.farmer.name}</Text>
          <Text style={styles.tableCellTown}>{item.amount}</Text>
          <Text style={styles.tableCellDate}>
            {new Date(item.added_on).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })}, at {new Date(item.added_on).toLocaleTimeString()}
          </Text>
          <Text style={styles.tableCellUser}>{item.user}</Text>
        </ScrollView>
      </View>
    );
  };
  
  
  return (
    <View style={styles.container}>
        <Header pageTitle="Orders" firstName={user.first_name} lastName={user.last_name} />
        <View style={styles.customer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleNewOrder}
          >
            <Entypo name="shopping-bag" size={36} color={Colors.PRIMARY} />
            <Text style={styles.text}>New Order</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Oders List</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <FlatList
              data={orders}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={<Text>No orders found</Text>}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[Colors.PRIMARY]}
                  tintColor={Colors.PRIMARY}
                />
              }
            />
          </ScrollView>
        </View>
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
    borderBottomColor: Colors.GREY,
    paddingVertical: 5,
  },
  scrollViewContainer: {
    flexGrow: 1, // Ensures that the container fills the space for smaller content
    alignItems: 'center', // Align items for better control in the horizontal layout
  },
  tableCellName: {
    width: 170, // Ensure minimum width for readability
    textAlign: 'left',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold', 
  },
  tableCellPhone: {
    width: 120, // Ensure minimum width for readability
    textAlign: 'left',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold', 
  },
  tableCellTown: {
    width: 120, // Minimum width for narrower cells
    textAlign: 'left',
    fontSize: 16,
    padding: 6,
    fontWeight: 'bold', 
  },
  tableCellRegion: {
    width: 100, // Minimum width for narrower cells
    textAlign: 'left',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold', 
  },
  tableCellDate: {
    minWidth: 160, // Ensure minimum width for readability
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 16,
    fontWeight: 'bold', 
  },
  tableCellUser: {
    minWidth: 40, // Minimum width for narrower cells
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold', 
    padding: 10,
  },
  tableCellNarrow: {
    minWidth: 40, // Minimum width for narrower cells
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold', 
    padding: 6,
  },
});
