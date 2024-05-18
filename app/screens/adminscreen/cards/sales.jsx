import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '../../../utils/Colors';

export default function Sales() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();
    const formattedDate = `${month} ${day}`;
    setCurrentDate(formattedDate);
  }, []);

  const salesData = [
    { title: 'Gross Sales', value: 'Ksh 94,818,581.60', change: '+12.33%' },
    { title: 'Gross Profit', value: 'Ksh 1,639,446.10', change: '+10.6%' },
    { title: 'Paid To Farmers', value: 'Ksh 92,818,581.50', change: '+3%' },
    { title: 'Total Overheads', value: 'Ksh 1,639,446.10', change: '+8%' },
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
      <View style={styles.dateContainer}>
        <Text style={styles.headerText}>System Overview</Text>
        <Text style={styles.dateButton}>{currentDate}</Text>
      </View>
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