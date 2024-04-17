import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../../services/authProvider';
import Header from '../../components/header';

export default function PaymentsScreen() {
  const { user } = useAuth(); 

  return (
    <View>
      <Header pageTitle="Payments" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}