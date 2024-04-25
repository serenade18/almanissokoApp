import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../services/authProvider'
import SubHeader from '../../components/subheader/subheader'

export default function addPaymentScreen() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <SubHeader pageTitle="Add Payment" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
})