import React from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Linking, TextInput } from 'react-native';
import { useAuth } from '../../services/authProvider';
import Adminheader from '../../components/adminheader/adminheader';
import Sales from './cards/sales';
import MonthlySales from './graphs/monthlySales';
import Colors from '../../utils/Colors';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Adminheader firstName={user.first_name} lastName={user.last_name}/>
      <ScrollView>
        <Sales/>
        <MonthlySales/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREY,
  }
});