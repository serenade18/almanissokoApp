import React from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, Linking, TextInput } from 'react-native';
import { useAuth } from '../../services/authProvider';
import Adminheader from '../../components/adminheader/adminheader';
import Sales from './cards/sales';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Adminheader firstName={user.first_name} lastName={user.last_name}/>
      <Sales/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  }
});