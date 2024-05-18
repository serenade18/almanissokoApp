import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '../../../utils/Colors';
import { useAuth } from '../../../services/authProvider';
import { fetchDashboard } from '../../../services/api';

export default function Sales() {
    const [grossSales, setGrossSales] = useState(0);
    const [grossProfit, setGrossProfits] = useState(0);
    const [piadFarmers, setPaidFarmers] = useState(0);
    const [totalOverhead, setTotalOverhead] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const response = await fetchDashboard();
          if (response.error === false) {  // Assuming the API sends this in response
            console.log('Customers fetched:', response); // Log to check the structure
            setGrossSales(response.buy_total);
            setGrossProfits(response.profit);
            setPaidFarmers(response.rice);
            setTotalOverhead(response.overhead)
          } else {
            console.error('Failed to fetch customers:', response.message);
          }
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
    };
    console.log("Gross Sales",grossSales)  
    console.log("Gross Profit",grossProfit)
    console.log("Gross Farmers",piadFarmers)
    console.log("Gross Overheads",totalOverhead)

  const salesData = [
    { title: 'Gross Sales', value: `${grossSales}`, change: '+12.33%' },
    { title: 'Gross Profit', value: `${grossProfit}`, change: '+10.6%' },
    { title: 'Paid To Farmers', value: `${piadFarmers}`, change: '+3%' },
    { title: 'Total Overheads', value: `${totalOverhead}`, change: '+8%' },
    { title: 'Total Discount', value: 'Ksh 1,639,446.10', change: '+8%' },
    { title: 'Total Paid', value: 'Ksh 92,639,446.10', change: '+8%' },
    { title: 'Total Kilos', value: 'Ksh 1,639,446.10', change: '+8%' },
    { title: 'Balance', value: 'Ksh 1,863,616', change: '-8%' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.metricContainer}>
      <Text style={styles.metricTitle}>{item.title}</Text>
      <Text style={styles.metricValue}>{item.value}</Text>
      <Text style={[styles.metricChange, item.change.startsWith('+') ? styles.positive : styles.negative]}>
        {item.change}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.dateContainer}>
        <Text style={styles.headerText}></Text>
        <Text style={styles.dateButton}>{currentDate}</Text>
      </View> */}
      <FlatList data={salesData} renderItem={renderItem} numColumns={2} keyExtractor={(item, index) => `${index}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 9,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
    paddingLeft: 9,
  },
  dateButton: {
    padding: 8,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  metricContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  metricTitle: {
    fontSize: 43,
    fontWeight: 'bold',
    fontFamily: 'Aleo-bold',
  },
  metricValue: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 4,
    fontFamily: 'Aleo-bold',
  },
  metricChange: {
    fontSize: 18,
    marginTop: 4,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  orderInfoContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  progressCircle: {
    height: 200,
  },
  orderCount: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderLabel: {
    fontSize: 16,
    textAlign: 'center',
  },
});