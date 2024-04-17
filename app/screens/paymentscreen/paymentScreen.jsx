import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '../../services/authProvider';
import Header from '../../components/header';

export default function PaymentsScreen() {
  const { user } = useAuth(); 

  return (
    <View style={styles.container}>
      <Header pageTitle="Payments" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});