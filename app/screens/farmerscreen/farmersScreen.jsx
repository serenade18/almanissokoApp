import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import { useAuth } from '../../services/authProvider';

export default function FarmersScreen() {
  const { user } = useAuth();

  return (
    <View>
      <Header pageTitle="Farmers" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}