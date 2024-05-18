import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SubHeader from '../../../components/subheader/subheader'
import { useAuth } from '../../../services/authProvider'

export default function AddInvoice() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <SubHeader pageTitle="Create Delivery" firstName={user.first_name} lastName={user.last_name}/>
      <Text>addInvoice</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1'
  }
})