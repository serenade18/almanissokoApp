import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/mainheader/header'
import { useAuth } from '../../services/authProvider';

export default function CustomersScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header pageTitle="Customers" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
