import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Entypo, FontAwesome5, FontAwesome } from '@expo/vector-icons';

const AllFarmers = ({ farmer }) => {
    
    return (
        
        <View style={styles.tableRow}>
            <Text style={styles.tableCellNarrow}>{farmer.id}</Text>
            <Text style={styles.tableCellName}>{farmer.name}</Text>
            <Text style={styles.tableCellName}>{farmer.phone}</Text>
            <Text style={styles.tableCellDate}>
            {new Date(farmer.added_on).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })} at {new Date(farmer.added_on).toLocaleTimeString()}
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
    tableCellTown: {
      width: 120, // Minimum width for narrower cells
      textAlign: 'left',
      fontSize: 16,
      padding: 6,
      fontWeight: 'bold', 
      color: 'white'
    },
    tableCellDate: {
      minWidth: 160, // Ensure minimum width for readability
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
    }
  });

export default AllFarmers;
