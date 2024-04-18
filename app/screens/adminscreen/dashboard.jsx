import React from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, Linking, TextInput } from 'react-native';
import Header from '../../components/mainheader/header';
import { useAuth } from '../../services/authProvider';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Header pageTitle="Dashboard" firstName={user.first_name} lastName={user.last_name} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});