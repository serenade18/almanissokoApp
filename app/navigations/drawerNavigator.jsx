import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/homescreen/home';
import CustomersScreen from '../screens/customerscreen/customersScreen';
import PaymentsScreen from '../screens/paymentscreen/paymentScreen';
import FarmersScreen from '../screens/farmerscreen/farmersScreen';
import Dashboard from '../screens/adminscreen/dashboard';
import { useAuth } from '../services/authProvider'; // Ensure this is correctly imported
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { user } = useAuth(); // Use the auth context to get user details

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false}}>
      {/* Admin only screen */}
      {user && user.user_type === 'admin' && (
        <Drawer.Screen name="Dashboard" component={Dashboard} />
      )}
      
      {/* Common screen for all users */}
      <Drawer.Screen name="Home" component={Home} />

      {/* Screens available to all users */}
      <Drawer.Screen name="Customers" component={CustomersScreen} />
      <Drawer.Screen name="Payments" component={PaymentsScreen} />
      <Drawer.Screen name="Farmers" component={FarmersScreen} />
      
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({})