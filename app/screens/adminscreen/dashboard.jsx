import React from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, Linking, TextInput } from 'react-native';
import Header from '../../components/header';
import { useAuth } from '../../services/authProvider';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <View>
      <Header pageTitle="Dashboard" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}
