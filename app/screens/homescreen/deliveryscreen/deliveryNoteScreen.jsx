import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../../components/header'
import { useAuth } from '../../../services/authProvider';

export default function DeliveryNoteScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header pageTitle="Delivery Note" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
