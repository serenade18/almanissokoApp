import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const FarmerOrders = ({ order }) => {
  const router = useRouter();
    
    return (
    //   <TouchableOpacity
    //   onPress={() => router.push({ pathname: 'order/orderdetails', params: { id: order.id } })}
    //   >
        <View style={styles.tableRow}>
            <Text style={styles.tableCellNarrow}>{order.id}</Text>
            <Text style={styles.tableCellTown}>{order.town}</Text>
            <Text style={styles.tableCellNarrow}>{order.kgs}</Text>
            <Text style={styles.tableCellNarrow}>{order.discount}</Text>
            <Text style={styles.tableCellNarrow}>{order.packaging}</Text>
            <Text style={styles.tableCellNarrow}>{order.transport}</Text>
            <Text style={styles.tableCellPhone}>{order.customer.name}</Text>
            <Text style={styles.tableCellPhone}>{order.amount}</Text>
            <Text style={styles.tableCellDate}>
            {new Date(order.added_on).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })} at {new Date(order.added_on).toLocaleTimeString()}
            </Text>
        
        </View>
    //   </TouchableOpacity>  
    );
};

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
      borderRadius: 99,
      marginTop: 10,
      alignItems: 'center'
    },
    text: {
      fontSize: 24,
      fontWeight: '600',
      padding: 15
    },
    listContainer: {
      width: '91%',
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
      paddingBottom: 20,
      textAlign: 'left',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      paddingLeft: 8
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
      color: 'white'
    },
    tableCellPhone: {
      width: 120, // Ensure minimum width for readability
      textAlign: 'left',
      fontSize: 16,
      padding: 10,
      fontWeight: 'bold', 
      color: 'white'
    },
    tableCellTown: {
      width: 120, // Minimum width for narrower cells
      textAlign: 'left',
      fontSize: 16,
      padding: 6,
      fontWeight: 'bold', 
      color: 'white'
    },
    tableCellRegion: {
      width: 100, // Minimum width for narrower cells
      textAlign: 'left',
      fontSize: 16,
      padding: 10,
      fontWeight: 'bold', 
      color: 'white'
    },
    tableCellDate: {
      minWidth: 120, // Ensure minimum width for readability
      textAlign: 'center',
      fontSize: 16,
      padding: 6,
      fontWeight: 'bold', 
      color: 'white'
    },
    tableCellNarrow: {
      minWidth: 40, // Minimum width for narrower cells
      textAlign: 'left',
      fontSize: 16,
      fontWeight: 'bold', 
      padding: 6,
      color: 'white'
    },
    renderText: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 6,
      alignItems: 'center',
      marginTop: -2
    }
  });

export default FarmerOrders;
