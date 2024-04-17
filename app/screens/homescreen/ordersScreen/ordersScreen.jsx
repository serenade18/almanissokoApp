import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react'
import Header from '../../../components/header'
import { useAuth } from '../../../services/authProvider';


export default function OrdersScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header pageTitle="Orders" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});