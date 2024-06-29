import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Entypo, FontAwesome5, FontAwesome } from '@expo/vector-icons';

const AllPayments = ({ payment }) => {

    // Region ID to name mapping
    const paymentModes = {
        1: "Cash",
        2: "Mpesa",
        3: "Bank",
        4: "Barter Trade",
        5: "Promotion",
        6: "Compensation",
        7: "Top Up"
    };
    
    return (
        
        <View style={styles.tableRow}>
            <Text style={styles.tableCellNarrow}>{payment.id}</Text>
            <Text style={styles.tableCellNarrow}>{payment.orders_id}</Text>
            <Text style={styles.tableCellName}>{payment.customer.name}</Text>
            <Text style={styles.tableCellPhone}>{payment.amount}</Text>
            <Text style={styles.tableCellNarrow}>{paymentModes[payment.payment_mode] || "Unknown"}</Text>
            <Text style={styles.tableCellPayment}>{payment.payment}</Text>
            <Text style={styles.tableCellDate}>
                {new Date(payment.added_on).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })} at {new Date(payment.added_on).toLocaleTimeString()}
            </Text>
        
        </View>
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
    tableCellPayment: {
      width: 120, // Minimum width for narrower cells
      textAlign: 'center',
      fontSize: 16,
      padding: 6,
      marginLeft: 2,
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
      textAlign: 'left',
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

export default AllPayments;
