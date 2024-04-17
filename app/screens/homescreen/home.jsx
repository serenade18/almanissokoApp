import React from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, Linking, TextInput } from 'react-native';
import Header from '../../components/header';
import { useAuth } from '../../services/authProvider';

export default function Home() {
  const { user } = useAuth();

  return (
    <View>
      <Header pageTitle="New Orders" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}
